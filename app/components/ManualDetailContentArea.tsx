'use client'

import { useState } from 'react'
import { ManualData, DocumentType } from '../page'
import FileAttachmentComponent from './FileAttachmentComponent'
import DynamicDataTable from './DynamicDataTable'

interface ManualDetailContentAreaProps {
  selectedManual: ManualData | null
  documentType?: DocumentType
}

const tabList = [
  '개정이력',
  '목차',
  '책임과권한',
  '적용범위',
  '용어의정의',
  '회사개요',
  '품질방침',
  '윤리강령',
  '프로세스맵',
  '품질시스템구성',
  '완전성검증표',
  '문서화된프로세스',
  'QMS TREE',
  '완성된매트릭스'
]

export default function ManualDetailContentArea({ selectedManual, documentType = 'manual' }: ManualDetailContentAreaProps) {
  const [activeTab, setActiveTab] = useState('개정이력')

  if (!selectedManual) {
    return (
      <div style={{ backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <p style={{ fontSize: '1.125rem' }}>목록에서 매뉴얼을 선택하세요</p>
        </div>
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case '개정이력':
        return <RevisionHistoryTab />
      case '용어의정의':
        return <TermDefinitionTab />
      default:
        return <FileAttachmentTab />
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

// 개정이력 탭 컴포넌트
function RevisionHistoryTab() {
  const [revisionHistory, setRevisionHistory] = useState([
    {
      id: '1',
      버전: '1.0',
      개정일자: '2024-01-15',
      주요개정내용: '초안 작성',
      작성자: '김철수'
    }
  ])

  const [newRevision, setNewRevision] = useState({
    버전: '',
    개정일자: '',
    주요개정내용: '',
    작성자: ''
  })

  const handleAddRevision = () => {
    if (newRevision.버전 && newRevision.개정일자 && newRevision.주요개정내용 && newRevision.작성자) {
      setRevisionHistory(prev => [...prev, { ...newRevision, id: Date.now().toString() }])
      setNewRevision({ 버전: '', 개정일자: '', 주요개정내용: '', 작성자: '' })
    }
  }

  const handleDeleteRevision = (id: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      setRevisionHistory(prev => prev.filter(item => item.id !== id))
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* 파일 첨부 영역 */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">개정 관련 증빙 자료</h3>
        <FileAttachmentComponent />
      </div>

      {/* 개정이력 테이블 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">개정이력</h3>
          <button
            onClick={handleAddRevision}
            className="btn-primary"
          >
            + 추가
          </button>
        </div>

        {/* 새 개정이력 입력 폼 */}
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">버전</label>
              <input
                type="text"
                value={newRevision.버전}
                onChange={(e) => setNewRevision(prev => ({ ...prev, 버전: e.target.value }))}
                className="input-field"
                placeholder="예: 1.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">개정일자</label>
              <input
                type="date"
                value={newRevision.개정일자}
                onChange={(e) => setNewRevision(prev => ({ ...prev, 개정일자: e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">작성자</label>
              <input
                type="text"
                value={newRevision.작성자}
                onChange={(e) => setNewRevision(prev => ({ ...prev, 작성자: e.target.value }))}
                className="input-field"
                placeholder="작성자명"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleAddRevision}
                className="btn-primary w-full"
              >
                추가
              </button>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">주요 개정 내용</label>
            <textarea
              value={newRevision.주요개정내용}
              onChange={(e) => setNewRevision(prev => ({ ...prev, 주요개정내용: e.target.value }))}
              className="input-field"
              rows={2}
              placeholder="개정 내용을 입력하세요"
            />
          </div>
        </div>

        {/* 개정이력 테이블 */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">버전</th>
                <th className="table-header">개정일자</th>
                <th className="table-header">주요 개정 내용</th>
                <th className="table-header">작성자</th>
                <th className="table-header">작업</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {revisionHistory.map((item) => (
                <tr key={item.id}>
                  <td className="table-cell">{item.버전}</td>
                  <td className="table-cell">{item.개정일자}</td>
                  <td className="table-cell">{item.주요개정내용}</td>
                  <td className="table-cell">{item.작성자}</td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleDeleteRevision(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// 용어의정의 탭 컴포넌트
function TermDefinitionTab() {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">용어의 정의</h3>
      <DynamicDataTable
        columns={[
          { key: '용어', label: '용어', type: 'text' },
          { key: '용어영문', label: '용어(영문)', type: 'text' },
          { key: '정의', label: '용어의 정의', type: 'textarea' },
          { key: '비고', label: '비고', type: 'text' }
        ]}
        initialData={[
          {
            id: '1',
            용어: '품질경영시스템',
            용어영문: 'Quality Management System',
            정의: '품질정책과 품질목표를 수립하고 달성하기 위한 상호 연관된 또는 상호 작용하는 요소들의 집합',
            비고: ''
          }
        ]}
      />
    </div>
  )
}

// 파일 첨부 탭 컴포넌트 (기본)
function FileAttachmentTab() {
  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">관련 문서</h3>
      <FileAttachmentComponent />
    </div>
  )
}
