# Guardian Frontapp (Next.js Prototype)

이 디렉터리는 Guardian 백엔드 API 요구사항을 토대로 작성된 Next.js 기반 UI 프로토타입입니다.  
현재는 API 연동 없이 UI 흐름과 폼 제출 로직만 구성되어 있으며, 실제 데이터 호출 시 백엔드 엔드포인트(`http://localhost:8090`)를 사용하도록 설계되어 있습니다.

## 주요 스크린

| 경로 | 설명 |
| --- | --- |
| `/` | 주요 기능 카드가 나열된 홈 |
| `/login` | JWT / Refresh Token 기반 로그인 폼 |
| `/signup` | Client/Provider 선택 가입 + 약관 동의 |
| `/client/dashboard` | 개인정보, 복약 계획/기록, 담당자 정보 |
| `/provider/dashboard` | 담당 환자 리스트, 복약 상태, 긴급 호출 요약 |
| `/admin/dashboard` | 배정/긴급 호출/알림 로그 관리 |
| `/drug-info` | e약은요 + 로컬 DB 연동을 가정한 약학정보 검색 |
| `/chat` | Client–Provider 1:1 실시간 채팅 UI 시뮬레이션 |
| `/video` | WebRTC 통화 세션 관리 UI |
| `/emergency` | 긴급 호출 생성/확인 플로우 |

## 사전 준비

```bash
cd frontapp
npm install
```

필요에 따라 API 서버 주소를 `.env.local` 에 지정할 수 있습니다.

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8090
```

> 현재 환경에서 네트워크가 제한된 경우, 위 명령이 실패할 수 있습니다.  
> 이때는 패키지 설치가 가능한 환경에서 `npm install`을 실행한 뒤 `node_modules`를 복사하거나,  
> pnpm/bun처럼 로컬 미러 저장소를 활용해 주세요.

## 실행

```bash
npm run dev
```

기본 포트는 3000이며, 로그인/회원가입 폼은 위 환경변수에 맞춰 백엔드 API를 호출합니다.

## 구성 메모

- Next.js App Router (`app/` 디렉터리)를 사용했습니다.
- UI 상태는 모두 클라이언트 컴포넌트에서 관리합니다. 실제 API 연동 시 `fetch` 로직을 백엔드 엔드포인트와 연결하면 됩니다.
- 기본 스타일은 `styles/globals.css`에서 제공하며, 필요 시 Tailwind 등 추가 스타일 도구를 도입할 수 있습니다.
