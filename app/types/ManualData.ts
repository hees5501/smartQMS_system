// 매뉴얼 데이터 타입 정의
export interface ManualData {
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
  폐기일자?: string
}

// 매뉴얼 기본 정보 폼 데이터
export interface ManualBasicInfoFormData {
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

// 매뉴얼 개정이력 데이터
export interface ManualRevisionHistoryData {
  id: string
  버전: string
  개정일자: string
  주요개정내용: string
  작성자: string
}

// 매뉴얼 용어정의 데이터
export interface ManualTermDefinitionData {
  id: string
  용어: string
  용어영문: string
  용어의정의: string
  비고: string
}

// 매뉴얼 탭 타입
export type ManualTabType = 
  | '개정이력'
  | '목차'
  | '책임과권한'
  | '적용범위'
  | '용어의정의'
  | '회사개요'
  | '품질방침'
  | '윤리강령'
  | '프로세스맵'
  | '품질시스템구성'
  | '완전성검증표'
  | '문서화된프로세스'
  | 'QMS TREE'
  | '완성된매트릭스'
