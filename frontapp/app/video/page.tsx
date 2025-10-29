import { VideoSessionPanel } from "../../components/video/VideoSessionPanel";

export const metadata = {
  title: "영상 통화 | Guardian Front",
  description: "WebRTC 기반 영상 통화 흐름을 시뮬레이션합니다."
};

export default function VideoPage() {
  return <VideoSessionPanel />;
}
