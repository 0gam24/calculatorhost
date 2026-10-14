/** 계산기 페이지에 그대로 보이는 "구간별 바로 보기" 표 (입력 없이 읽히는 정적 HTML) */
export interface QuickTableData {
  /** H2 제목 (질문형) */
  title: string;
  /** <caption> */
  caption: string;
  /** 열 제목. 첫 열은 행 제목(th scope="row") */
  headers: string[];
  rows: string[][];
  /** 가정·기준 (표 아래 작은 글씨) */
  note: string;
}
