'use client'

import { useState } from 'react'
import { ManualData, ManualTabType, ManualRevisionHistoryData, ManualTermDefinitionData } from '../types/ManualData'
import FileAttachmentComponent from './FileAttachmentComponent'
import DynamicDataTable from './DynamicDataTable'

interface ManualDetailContentAreaProps {
  selectedManual: ManualData | null
}

export default function ManualDetailContentArea({ selectedManual }: ManualDetailContentAreaProps) {
  const [activeTab, setActiveTab] = useState<ManualTabType>('개정이력')
  const [isEditing, setIsEditing] = useState(false)

  // 개정이력 데이터
  const [revisionHistory, setRevisionHistory] = useState<ManualRevisionHistoryData[]>([
    {
      id: '1',
      버전: 'Rev. 3',
      개정일자: '2024-01-15',
      주요개정내용: 'ISO 9001:2015 요구사항 반영 및 프로세스 개선',
      작성자: '김철수'
    },
    {
      id: '2',
      버전: 'Rev. 2',
      개정일자: '2023-06-01',
      주요개정내용: '조직 구조 변경에 따른 책임과 권한 수정',
      작성자: '이영희'
    }
  ])

  // 용어정의 데이터
  const [termDefinitions, setTermDefinitions] = useState<ManualTermDefinitionData[]>([
    {
      id: '1',
      용어: '품질경영시스템',
      용어영문: 'Quality Management System',
      용어의정의: '품질방침과 품질목표를 수립하고 달성하기 위해 필요한 상호 연관된 또는 상호 작용하는 요소들의 집합',
      비고: 'ISO 9000:2015'
    }
  ])

  const tabs: ManualTabType[] = [
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

  const handleTabClick = (tab: ManualTabType) => {
    setActiveTab(tab)
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // 실제 구현에서는 API 호출
    console.log('저장할 데이터:', { activeTab, revisionHistory, termDefinitions })
    setIsEditing(false)
    alert('저장되었습니다.')
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case '개정이력':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* 파일 첨부 영역 */}
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                개정 관련 증빙 자료
              </h4>
              <FileAttachmentComponent disabled={!isEditing} />
            </div>

            {/* 개정이력 테이블 */}
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                개정이력
              </h4>
              <DynamicDataTable
                columns={[
                  { key: '버전', label: '버전', type: 'text' },
                  { key: '개정일자', label: '개정일자', type: 'date' },
                  { key: '주요개정내용', label: '주요 개정 내용', type: 'textarea' },
                  { key: '작성자', label: '작성자', type: 'text' }
                ]}
                initialData={revisionHistory}
              />
            </div>
          </div>
        )

      case '용어의정의':
        return (
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              용어의 정의
            </h4>
            <DynamicDataTable
              columns={[
                { key: '용어', label: '용어', type: 'text' },
                { key: '용어영문', label: '용어(영문)', type: 'text' },
                { key: '용어의정의', label: '용어의 정의', type: 'textarea' },
                { key: '비고', label: '비고', type: 'text' }
              ]}
              initialData={termDefinitions}
            />
          </div>
        )

      default:
        // 나머지 탭들은 모두 파일 첨부 컴포넌트 사용
        return (
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              {activeTab} 관련 문서
            </h4>
            <FileAttachmentComponent disabled={!isEditing} />
          </div>
        )
    }
  }

  if (!selectedManual) {
    return (
      <div style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>매뉴얼을 선택하세요</p>
          <p style={{ fontSize: '0.875rem' }}>목록에서 매뉴얼을 선택하면 상세 내용을 확인할 수 있습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
      {/* 헤더 */}
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
            매뉴얼 상세 내용
          </h2>
          
          {/* 액션 버튼들 */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {isEditing ? (
              <>
                <button 
                  className="btn-primary" 
                  style={{ fontSize: '0.875rem' }}
                  onClick={handleSave}
                >
                  저장
                </button>
                <button 
                  className="btn-secondary" 
                  style={{ fontSize: '0.875rem' }}
                  onClick={handleCancel}
                >
                  취소
                </button>
              </>
            ) : (
              <button 
                className="btn-secondary" 
                style={{ fontSize: '0.875rem' }}
                onClick={handleEdit}
              >
                수정
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div style={{ borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', overflowX: 'auto' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              style={{
                padding: '0.75rem 1rem',
                border: 'none',
                backgroundColor: activeTab === tab ? '#3b82f6' : 'transparent',
                color: activeTab === tab ? 'white' : '#374151',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                borderBottom: activeTab === tab ? '2px solid #1d4ed8' : '2px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease-in-out'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6'
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 탭 내용 */}
      <div style={{ padding: '1.5rem' }}>
        {renderTabContent()}
      </div>
    </div>
  )
}