"use client";

import { useState } from "react";

type Drug = {
  id: number;
  name: string;
  efficacy: string;
  usage: string;
  caution: string;
};

const MOCK_DRUGS: Drug[] = [
  {
    id: 1,
    name: "아모르탄정",
    efficacy: "고혈압 치료제",
    usage: "1일 1회, 1회 1정 복용",
    caution: "어지럼증, 저혈압이 나타날 수 있습니다."
  },
  {
    id: 2,
    name: "자누메트정",
    efficacy: "2형 당뇨병 치료",
    usage: "1일 2회, 식사와 함께 복용",
    caution: "신장 기능 저하 환자 주의, 저혈당 증상 관찰"
  }
];

export function DrugSearchPanel() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<Drug[]>(MOCK_DRUGS);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(undefined);

    try {
      const response = await fetch(
        `http://localhost:8090/api/drug-info/search?keyword=${encodeURIComponent(keyword)}`,
        { method: "GET" }
      );

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message ?? "약학 정보 검색에 실패했습니다.");
      }

      const payload = (await response.json()) as Drug[];
      setResults(payload);
    } catch (searchError) {
      setError(
        searchError instanceof Error
          ? searchError.message
          : "e약은요 API에 연결할 수 없습니다. 로컬 데이터를 표시합니다."
      );

      // fallback to mock list
      setResults(
        MOCK_DRUGS.filter((drug) =>
          drug.name.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid">
      <form className="card form" onSubmit={handleSearch}>
        <div className="form-group">
          <label className="form-label" htmlFor="drug-search">
            약품명 또는 증상으로 검색
          </label>
          <input
            id="drug-search"
            className="form-input"
            placeholder="예: 고혈압, 감기, 아모르탄"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "검색 중..." : "검색"}
        </button>
        <p className="muted">
          e약은요 오픈 API를 우선 사용하고, 장애 발생 시 로컬 DB 데이터를
          제공합니다.
        </p>
        {error && (
          <p className="muted" style={{ color: "#b45309" }}>
            {error}
          </p>
        )}
      </form>

      {results.length === 0 ? (
        <div className="card">검색 결과가 없습니다.</div>
      ) : (
        results.map((drug) => (
          <article key={drug.id} className="card">
            <div className="card-header">
              <h2 className="card-title">{drug.name}</h2>
              <span className="tag">약학 정보</span>
            </div>
            <p>
              <strong>효능/효과:</strong> {drug.efficacy}
            </p>
            <p>
              <strong>용법/용량:</strong> {drug.usage}
            </p>
            <p>
              <strong>주의/부작용:</strong> {drug.caution}
            </p>
          </article>
        ))
      )}
    </div>
  );
}
