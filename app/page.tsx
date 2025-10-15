'use client'

import { useState } from 'react'
import NavigationMenu from './components/NavigationMenu'
import ManualListArea from './components/ManualListArea'
import ManualBasicInfoArea from './components/ManualBasicInfoArea'
import ManualDetailContentArea from './components/ManualDetailContentArea'
import ProcessListArea from './components/ProcessListArea'
import ProcessBasicInfoArea from './components/ProcessBasicInfoArea'
import ProcessDetailContentArea from './components/ProcessDetailContentArea'
import ProcedureListArea from './components/ProcedureListArea'
import ProcedureBasicInfoArea from './components/ProcedureBasicInfoArea'
import ProcedureDetailContentArea from './components/ProcedureDetailContentArea'
import GuideListArea from './components/GuideListArea'
import GuideBasicInfoArea from './components/GuideBasicInfoArea'
import GuideDetailContentArea from './components/GuideDetailContentArea'
import { ProcessData } from './types/ProcessData'
import { ProcedureData } from './types/ProcedureData'
import { GuideData } from './types/GuideData'
import { ManualData } from './types/ManualData'

// 문서 유형 정의
export type DocumentType = 'manual' | 'guide' | 'process' | 'procedure'

export default function SmartQMS() {
  const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType>('manual')
  const [selectedManual, setSelectedManual] = useState<ManualData | null>(null)
  const [selectedGuide, setSelectedGuide] = useState<GuideData | null>(null)
  const [selectedProcess, setSelectedProcess] = useState<ProcessData | null>(null)
  const [selectedProcedure, setSelectedProcedure] = useState<ProcedureData | null>(null)

  // 메뉴에서 문서 유형 선택 시 호출되는 함수
  const handleDocumentTypeSelect = (type: DocumentType) => {
    setSelectedDocumentType(type)
    setSelectedManual(null) // 문서 유형 변경 시 선택된 문서 초기화
    setSelectedGuide(null)
    setSelectedProcess(null)
    setSelectedProcedure(null)
  }

  // 목록에서 매뉴얼 선택 시 호출되는 함수
  const handleManualSelect = (manual: ManualData) => {
    setSelectedManual(manual)
    setSelectedGuide(null)
    setSelectedProcess(null)
    setSelectedProcedure(null)
  }

  // 목록에서 지침서 선택 시 호출되는 함수
  const handleGuideSelect = (guide: GuideData) => {
    setSelectedGuide(guide)
    setSelectedManual(null)
    setSelectedProcess(null)
    setSelectedProcedure(null)
  }

  // 목록에서 프로세스 선택 시 호출되는 함수
  const handleProcessSelect = (process: ProcessData) => {
    setSelectedProcess(process)
    setSelectedManual(null)
    setSelectedGuide(null)
    setSelectedProcedure(null)
  }

  // 목록에서 절차서 선택 시 호출되는 함수
  const handleProcedureSelect = (procedure: ProcedureData) => {
    setSelectedProcedure(procedure)
    setSelectedManual(null)
    setSelectedGuide(null)
    setSelectedProcess(null)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* 헤더 */}
      <header style={{ backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ padding: '1rem 1.5rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>Smart QMS</h1>
        </div>
      </header>

      {/* 4단 분할 구조 */}
      <div style={{ display: 'flex', height: 'calc(100vh - 73px)' }}>
        {/* 좌측: 메뉴 영역 (Menu Area) */}
        <div style={{ width: '250px', minWidth: '250px', borderRight: '1px solid #e5e7eb' }}>
          <NavigationMenu 
            selectedType={selectedDocumentType}
            onTypeSelect={handleDocumentTypeSelect}
          />
        </div>

        {/* 우측: 3단 영역 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* 상단: 목록 영역 (List Area) */}
          <div style={{ flex: 1, minHeight: 0 }}>
            {selectedDocumentType === 'manual' ? (
              <ManualListArea 
                onManualSelect={handleManualSelect}
                selectedManual={selectedManual}
                documentType={selectedDocumentType}
              />
            ) : selectedDocumentType === 'guide' ? (
              <GuideListArea 
                onGuideSelect={handleGuideSelect}
                selectedGuide={selectedGuide}
                documentType={selectedDocumentType}
              />
            ) : selectedDocumentType === 'process' ? (
              <ProcessListArea 
                onProcessSelect={handleProcessSelect}
                selectedProcess={selectedProcess}
                documentType={selectedDocumentType}
              />
            ) : selectedDocumentType === 'procedure' ? (
              <ProcedureListArea 
                onProcedureSelect={handleProcedureSelect}
                selectedProcedure={selectedProcedure}
                documentType={selectedDocumentType}
              />
            ) : (
              <div style={{ backgroundColor: 'white', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#6b7280' }}>문서 화면을 선택하세요.</p>
              </div>
            )}
          </div>

          {/* 중단: 기본 정보 영역 (Basic Info Area) */}
          <div style={{ flex: 1, minHeight: 0 }}>
            {selectedDocumentType === 'manual' ? (
              <ManualBasicInfoArea 
                selectedManual={selectedManual}
              />
            ) : selectedDocumentType === 'guide' ? (
              <GuideBasicInfoArea 
                selectedGuide={selectedGuide}
                documentType={selectedDocumentType}
              />
            ) : selectedDocumentType === 'process' ? (
              <ProcessBasicInfoArea 
                selectedProcess={selectedProcess}
                documentType={selectedDocumentType}
              />
            ) : selectedDocumentType === 'procedure' ? (
              <ProcedureBasicInfoArea 
                selectedProcedure={selectedProcedure}
                documentType={selectedDocumentType}
              />
            ) : (
              <div style={{ backgroundColor: 'white', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#6b7280' }}>문서 화면을 선택하세요.</p>
              </div>
            )}
          </div>

          {/* 하단: 상세 내용 영역 (Detailed Content Area) */}
          <div style={{ flex: 1, minHeight: 0 }}>
            {selectedDocumentType === 'manual' ? (
              <ManualDetailContentArea 
                selectedManual={selectedManual}
              />
            ) : selectedDocumentType === 'guide' ? (
              <GuideDetailContentArea 
                selectedGuide={selectedGuide}
                documentType={selectedDocumentType}
              />
            ) : selectedDocumentType === 'process' ? (
              <ProcessDetailContentArea 
                selectedProcess={selectedProcess}
                documentType={selectedDocumentType}
              />
            ) : selectedDocumentType === 'procedure' ? (
              <ProcedureDetailContentArea 
                selectedProcedure={selectedProcedure}
                documentType={selectedDocumentType}
              />
            ) : (
              <div style={{ backgroundColor: 'white', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: '#6b7280' }}>문서 화면을 선택하세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
