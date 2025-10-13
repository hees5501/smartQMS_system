# Smart QMS System

## 📋 개요

Smart QMS는 품질경영시스템(Quality Management System) 문서를 체계적으로 관리하는 웹 애플리케이션입니다. 매뉴얼, 지침서, 프로세스, 절차서 등 다양한 문서 유형을 통합 관리할 수 있습니다.

## 🚀 주요 기능

### 📚 문서 유형별 관리
- **매뉴얼**: 품질경영시스템 매뉴얼 관리
- **지침서**: 업무 지침서 및 위지윅 에디터 관리
- **프로세스**: 업무 프로세스 및 RACIE 매트릭스 관리
- **절차서**: 작업 절차서 및 단계별 절차 관리

### 🎨 4단 분할 구조
- **좌측 메뉴**: 문서 유형 선택
- **상단**: 문서 목록 (검색, 정렬, 페이지네이션)
- **중단**: 기본 정보 (편집 가능)
- **하단**: 상세 내용 (탭 기반)

### 🔧 특화 기능
- **RACIE 매트릭스**: 활동별 역할 정의
- **RISK 관리**: 위험도 자동 계산 및 시각적 표시
- **위지윅 에디터**: 시각적 업무지침 작성
- **동적 테이블**: 용어정의, 책임과권한 등 관리
- **파일 첨부**: 표지, 양식, 첨부파일 관리

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks (useState)
- **Build Tool**: Next.js App Router

## 📁 프로젝트 구조

```
smartQMS_system/
├── app/
│   ├── components/          # React 컴포넌트
│   │   ├── ManualListArea.tsx
│   │   ├── GuideListArea.tsx
│   │   ├── ProcessListArea.tsx
│   │   ├── ProcedureListArea.tsx
│   │   ├── NavigationMenu.tsx
│   │   └── ... (기타 컴포넌트들)
│   ├── types/              # TypeScript 타입 정의
│   │   ├── ProcessData.ts
│   │   ├── ProcedureData.ts
│   │   └── GuideData.ts
│   ├── globals.css         # 전역 스타일
│   ├── layout.tsx          # 루트 레이아웃
│   └── page.tsx            # 메인 페이지
├── docs/                   # PRD 문서
│   ├── designPRD.md
│   ├── manualPRD.md
│   ├── guidePRD.md
│   ├── processPRD.md
│   └── procedurePRD.md
└── README.md
```

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/hees5501/smartQMS_system.git
cd smartQMS_system
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 브라우저에서 확인
```
http://localhost:3000
```

## 📖 사용 방법

### 1. 문서 유형 선택
좌측 메뉴에서 원하는 문서 유형을 선택합니다:
- 📋 매뉴얼
- 📖 지침
- ⚙️ 프로세스
- 📝 절차

### 2. 문서 목록 확인
상단 영역에서 해당 유형의 문서 목록을 확인하고 검색할 수 있습니다.

### 3. 기본 정보 편집
중단 영역에서 선택한 문서의 기본 정보를 편집할 수 있습니다.

### 4. 상세 내용 관리
하단 영역의 탭을 통해 문서의 상세 내용을 관리할 수 있습니다:
- **매뉴얼**: 표지, 목차, 내용, 첨부
- **지침서**: 표지, 용어의정의, 책임과권한, 업무지침, 양식 및 개정이력, 첨부
- **프로세스**: RACIE, 용어의정의, 업무FLOW, 양식 및 개정이력, 첨부, 내부심사리스트, RISK관리
- **절차서**: 표지, 책임과권한, 업무FLOW, 절차, 양식 및 개정이력, 첨부

## 🎯 주요 특징

### ✨ 사용자 친화적 인터페이스
- 직관적인 4단 분할 구조
- 반응형 디자인
- 일관된 UI/UX

### 🔒 타입 안전성
- TypeScript로 구현된 타입 안전성
- 인터페이스 기반 데이터 구조
- 컴파일 타임 오류 검출

### 🎨 현대적 스타일링
- Tailwind CSS v4 호환
- 일관된 디자인 시스템
- 커스텀 컴포넌트 스타일

### 📊 동적 데이터 관리
- 실시간 검색 및 정렬
- 페이지네이션
- 동적 테이블 추가/삭제/수정

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

프로젝트 링크: [https://github.com/hees5501/smartQMS_system](https://github.com/hees5501/smartQMS_system)

---

**Smart QMS System** - 체계적인 품질경영시스템 문서 관리 솔루션 🚀