'use client'

import { useState } from 'react'
import { DocumentType } from '../page'
import { ProcedureData } from '../types/ProcedureData'
import FileAttachmentComponent from './FileAttachmentComponent'
import ResponsibilityTab from './ResponsibilityTab'
import ProcedureStepsTab from './ProcedureStepsTab'

interface ProcedureDetailContentAreaProps {
  selectedProcedure: ProcedureData | null
  documentType?: DocumentType
}

const tabList = [
  '표지',
  '책임과권한',
  '업무FLOW',
  '절차',
  '양식 및 개정이력',
  '첨부'
]

export default function ProcedureDetailContentArea({ selectedProcedure, documentType = 'procedure' }: ProcedureDetailContentAreaProps) {
  const [activeTab, setActiveTab] = useState('표지')

  if (!selectedProcedure) {
    return (
      <div style={{ backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <p style={{ fontSize: '1.125rem' }}>목록에서 절차서를 선택하세요</p>
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case '표지':
        return <CoverTab />
      case '책임과권한':
        return <ResponsibilityTab />
      case '업무FLOW':
        return <WorkFlowTab />
      case '절차':
        return <ProcedureStepsTab />
      case '양식 및 개정이력':
        return <FormAndRevisionTab />
      case '첨부':
        return <AttachmentTab />
      default:
        return <CoverTab />
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

// 표지 탭 컴포넌트
function CoverTab() {
  return (
    <div style={{ padding: '1.5rem' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>표지</h3>
      <div style={{ 
        border: '2px dashed #d1d5db', 
        borderRadius: '0.5rem', 
        padding: '2rem', 
        textAlign: 'center',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
        <p style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1rem' }}>
          절차서 표지 파일을 업로드하세요
        </p>
        <FileAttachmentComponent />
      </div>
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
          절차의 흐름을 시각적으로 표현한 이미지를 업로드하세요
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
