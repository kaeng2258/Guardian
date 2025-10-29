let stompClient;
let pc;
let localStream;

const roomIdEl = document.getElementById('roomId');
const nickEl = document.getElementById('nick');
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const chatBox = document.getElementById('chat');

const btnJoin = document.getElementById('btnJoin');
const btnCall = document.getElementById('btnCall');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

nickEl.value = (nickEl.value || 'user-') + Math.floor(Math.random() * 1000);

function ui(msg) {
  const p = document.createElement('p');
  p.textContent = msg;
  p.style.color = '#555';
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
  console.log('[UI]', msg);
}

async function initMedia() {
  if (localStream) return;
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = localStream;
    ui('로컬 미디어 준비 완료');
  } catch (e) {
    alert('카메라/마이크 권한 필요: ' + e.message);
    throw e;
  }
}

function connectStomp() {
  return new Promise((resolve, reject) => {
    // 필요하면 절대경로로 테스트: new SockJS('http://localhost:8081/ws')
    const sock = new SockJS('/ws');
    stompClient = Stomp.over(sock);
    // 디버깅 원하면 주석 해제: stompClient.debug = (s)=>console.log('[STOMP]', s);
    stompClient.debug = null;

    stompClient.connect(
      {},
      () => {
        ui('STOMP 연결 성공');
        resolve();
      },
      (err) => {
        console.error('STOMP 연결 실패:', err);
        ui('STOMP 연결 실패: 콘솔/네트워크 탭 확인');
        reject(err);
      }
    );
  });
}

function subscribeRoom(roomId) {
  if (!stompClient || !stompClient.connected) {
    ui('아직 STOMP 미연결 상태입니다.');
    return;
  }
  ui(`Room '${roomId}' 구독 시도`);
  stompClient.subscribe(`/topic/room/${roomId}`, async (frame) => {
    const msg = JSON.parse(frame.body || '{}');

    if (msg.type === 'chat') {
      ui(`${msg.from || '익명'}: ${msg.chat}`);
      return;
    }

    // 시그널 처리
    if (!pc) await createPeerConnection();

    if (msg.type === 'offer') {
      await pc.setRemoteDescription({ type: 'offer', sdp: msg.sdp });
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      sendSignal(roomId, { type: 'answer', sdp: answer.sdp });
      ui('offer 수신 → answer 전송');
    } else if (msg.type === 'answer') {
      if (!pc.currentRemoteDescription) {
        await pc.setRemoteDescription({ type: 'answer', sdp: msg.sdp });
        ui('answer 수신 → remoteDescription 설정');
      }
    } else if (msg.type === 'candidate') {
      try {
        await pc.addIceCandidate(JSON.parse(msg.candidate));
        // ui('ICE candidate 추가'); // 너무 자주 뜨면 주석
      } catch (e) {
        console.error('addIceCandidate error', e);
        ui('ICE candidate 추가 실패(콘솔 참조)');
      }
    }
  });
  ui(`Room '${roomId}' 구독 완료`);
}

async function createPeerConnection() {
  await initMedia();
  pc = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });

  localStream.getTracks().forEach((t) => pc.addTrack(t, localStream));

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      sendSignal(roomIdEl.value, { type: 'candidate', candidate: JSON.stringify(e.candidate) });
    }
  };

  pc.ontrack = (e) => {
    if (remoteVideo.srcObject !== e.streams[0]) {
      remoteVideo.srcObject = e.streams[0];
      ui('리모트 스트림 수신');
    }
  };
}

function sendSignal(roomId, payload) {
  if (!stompClient || !stompClient.connected) {
    ui('STOMP 미연결 상태: 시그널 전송 불가');
    return;
  }
  stompClient.send(`/app/signal/${roomId}`, {}, JSON.stringify(payload));
}

btnJoin.addEventListener('click', async () => {
  try {
    if (!stompClient || !stompClient.connected) {
      await connectStomp();
    }
    subscribeRoom(roomIdEl.value);
  } catch (e) {
    // 실패 시 이미 UI에 메시지 나감
  }
});

btnCall.addEventListener('click', async () => {
  try {
    if (!stompClient || !stompClient.connected) {
      await connectStomp();
      subscribeRoom(roomIdEl.value);
    }

    if (!pc) await createPeerConnection();

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    sendSignal(roomIdEl.value, { type: 'offer', sdp: offer.sdp });
    ui('offer 전송 완료');
  } catch (e) {
    console.error(e);
    ui('호출(offer) 중 오류: 콘솔 참조');
  }
});

chatSend.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (!text) return;
  sendSignal(roomIdEl.value, { type: 'chat', chat: text, from: nickEl.value });
  chatInput.value = '';
});

chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') chatSend.click();
});