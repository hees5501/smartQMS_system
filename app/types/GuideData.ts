// 지침서 데이터 타입 정의
export interface GuideData {
  id: string
  NO: number
  구분: string
  분야: string
  문서번호: string
  표준명: string
  영문표준명: string
  프로세스오너: string
  Rev: number
  제정일자: string
  개정일자: string
}

// 지침서 기본 정보 폼 데이터
export interface GuideBasicInfoFormData {
  구분: string
  분야: string
  표준명: string
  문서번호: string
  주관부서: string
  Rev: number
  제정일자: string
  개정일자: string
  목적: string
  적용범위: string
  적용범위체크: string[]
  적용사업: string
  프로세스관련번호: string
}

// 지침서 책임과권한 데이터
export interface GuideResponsibilityData {
  id: string
  역할: string
  책임: string
  권한: string
  비고: string
}

// 지침서 용어정의 데이터
export interface GuideTermData {
  id: string
  용어: string
  정의: string
  비고: string
}
