// 절차서 데이터 타입 정의
export interface ProcedureData {
  id: string
  NO: number
  구분: string
  분야: string
  문서번호: string
  표준명: string
  영문표준명: string
  책임부서: string
  Rev: number
  제정일자: string
  개정일자: string
}

// 절차서 기본 정보 폼 데이터
export interface ProcedureBasicInfoFormData {
  구분: string
  분야: string
  표준명: string
  영문표준명: string
  문서번호: string
  책임부서: string
  Rev: number
  제정일자: string
  개정일자: string
  목적: string
  적용범위: string[]
  적용사업: string
  프로세스관련번호: string
}

// 책임과권한 데이터
export interface ResponsibilityData {
  id: string
  역할: string
  책임: string
  권한: string
  비고: string
}

// 절차 단계 데이터
export interface ProcedureStepData {
  id: string
  단계: number
  단계명: string
  수행내용: string
  담당자: string
  소요시간: string
  산출물: string
  비고: string
}
