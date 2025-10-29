import { DrugSearchPanel } from "../../components/drug/DrugSearchPanel";

export const metadata = {
  title: "약학 정보 검색 | Guardian Front",
  description: "e약은요 API와 로컬 DB를 활용한 약품/증상 검색 화면"
};

export default function DrugInfoPage() {
  return <DrugSearchPanel />;
}
