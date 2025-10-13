'use client'

import { useState } from 'react'
import { DocumentType } from '../page'
import { ProcessData } from '../types/ProcessData'
import FileAttachmentComponent from './FileAttachmentComponent'
import DynamicDataTable from './DynamicDataTable'
import RACIETab from './RACIETab'
import RiskManagementTab from './RiskManagementTab'

interface ProcessDetailContentAreaProps {
  selectedProcess: ProcessData | null
  documentType?: DocumentType
}

const tabList = [
  'RACIE',
  '용어의정의',
  '업무FLOW',
  '양식 및 개정이력',
  '첨부',
  '내부심사리스트',
  'RISK관리'
]

export default function ProcessDetailContentArea({ selectedProcess, documentType = 'process' }: ProcessDetailContentAreaProps) {
  const [activeTab, setActiveTab] = useState('RACIE')

  if (!selectedProcess) {
    return (
      <div style={{ backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <p style={{ fontSize: '1.125rem' }}>목록에서 프로세스를 선택하세요</p>
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'RACIE':
        return <RACIETab />
      case '용어의정의':
        return <TermDefinitionTab />
      case '업무FLOW':
        return <WorkFlowTab />
      case '양식 및 개정이력':
        return <FormAndRevisionTab />
      case '첨부':
        return <AttachmentTab />
      case '내부심사리스트':
        return <InternalAuditTab />
      case 'RISK관리':
        return <RiskManagementTab />
      default:
        return <AttachmentTab />
    }
  }

  return (
    <div style={{ backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 탭 헤더 */}
      <div style={{ borderBottom: '1px solid #e5e7eb' }}>
        <nav style={{ display: 'flex', gap: '2rem', padding: '0 1.5rem' }} aria-label="Tabs">
          {tabList.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '1rem 0.25rem',
                borderBottom: '2px solid',
                fontWeight: '500',
                fontSize: '0.875rem',
                borderBottomColor: activeTab === tab ? '#3b82f6' : 'transparent',
                color: activeTab === tab ? '#2563eb' : '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.15s ease-in-out'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.color = '#374151'
                  e.currentTarget.style.borderBottomColor = '#d1d5db'
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.color = '#6b7280'
                  e.currentTarget.style.borderBottomColor = 'transparent'
                }
              }}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* 탭 내용 */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {renderTabContent()}
      </div>
    </div>
  )
}

// 용어의정의 탭 컴포넌트
function TermDefinitionTab() {
  return (
    <div style={{ padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>용어의 정의</h3>
      <DynamicDataTable
        columns={[
          { key: '용어', label: '용어', type: 'text' },
          { key: '정의', label: '정의', type: 'textarea' },
          { key: '비고', label: '비고', type: 'text' }
        ]}
        initialData={[
          {
            id: '1',
            용어: '프로세스',
            정의: '입력물을 출력물로 변환하는 일련의 상호 연관된 활동',
            비고: ''
          }
        ]}
      />
    </div>
  )
}

// 업무FLOW 탭 컴포넌트
function WorkFlowTab() {
  return (
    <div style={{ padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>업무 FLOW</h3>
      <div style={{ 
        border: '2px dashed #d1d5db', 
        borderRadius: '0.5rem', 
        padding: '2rem', 
        textAlign: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
        <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1rem' }}>
          BPMN 다이어그램 또는 업무 흐름도 이미지를 업로드하세요
        </p>
        <FileAttachmentComponent />
      </div>
    </div>
  )
}

// 양식 및 개정이력 탭 컴포넌트
function FormAndRevisionTab() {
  return (
    <div style={{ padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>양식 및 개정이력</h3>
      
      {/* 양식 파일 */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>양식 파일</h4>
        <FileAttachmentComponent />
      </div>
      
      {/* 개정이력 파일 */}
      <div>
        <h4 style={{ fontSize: '1rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>개정이력 파일</h4>
        <FileAttachmentComponent />
      </div>
    </div>
  )
}

// 첨부 탭 컴포넌트
function AttachmentTab() {
  return (
    <div style={{ padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>첨부 파일</h3>
      <FileAttachmentComponent />
    </div>
  )
}

// 내부심사리스트 탭 컴포넌트
function InternalAuditTab() {
  return (
    <div style={{ padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>내부심사리스트</h3>
      <FileAttachmentComponent />
    </div>
  )
}
