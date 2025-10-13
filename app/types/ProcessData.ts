// 프로세스 데이터 타입 정의
export interface ProcessData {
  id: string
  NO: number
  구분: string
  분야: string
  문서번호: string
  프로세스명: string
  프로세스오너: string
  Rev: number
  제정일자: string
  개정일자: string
  결재상태: string
}

// 프로세스 기본 정보 폼 데이터
export interface ProcessBasicInfoFormData {
  구분: string
  분야: string
  프로세스명: string
  영문프로세스명: string
  문서번호: string
  Rev: number
  개정부서: string
  ST: string
  제정일자: string
  개정일자: string
  목적: string
  적용범위: string[]
  적용사업: string
  프로세스관련번호: string
}

// RACIE 매트릭스 데이터
export interface RACIEData {
  id: string
  활동: string
  담당자: string
  R: string // 담당
  A: string // 결재
  C: string // 협의
  I: string // 통보
  E: string // 지원
}

// RISK 관리 데이터
export interface RiskData {
  id: string
  리스크내용: string
  영향도: number
  발생가능성: number
  위험도: number // 자동계산
  대응방안: string
}
