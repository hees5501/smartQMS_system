'use client'

import { DocumentType } from '../page'

interface NavigationMenuProps {
  selectedType: DocumentType
  onTypeSelect: (type: DocumentType) => void
}

// 문서 유형별 메뉴 아이템 정의
const menuItems = [
  {
    type: 'manual' as DocumentType,
    label: '매뉴얼',
    icon: '📋',
    description: '품질경영시스템 매뉴얼'
  },
  {
    type: 'guide' as DocumentType,
    label: '지침',
    icon: '📖',
    description: '업무 지침서'
  },
  {
    type: 'process' as DocumentType,
    label: '프로세스',
    icon: '⚙️',
    description: '업무 프로세스'
  },
  {
    type: 'procedure' as DocumentType,
    label: '절차',
    icon: '📝',
    description: '작업 절차서'
  }
]

export default function NavigationMenu({ selectedType, onTypeSelect }: NavigationMenuProps) {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      height: '100%', 
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 메뉴 헤더 */}
      <div style={{ 
        padding: '1rem 1.5rem', 
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb'
      }}>
        <h2 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          color: '#374151',
          margin: 0
        }}>
          문서 유형 선택
        </h2>
      </div>

      {/* 메뉴 아이템 목록 */}
      <div style={{ flex: 1, padding: '0.5rem 0' }}>
        {menuItems.map((item) => (
          <button
            key={item.type}
            onClick={() => onTypeSelect(item.type)}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              border: 'none',
              backgroundColor: selectedType === item.type ? '#eff6ff' : 'transparent',
              color: selectedType === item.type ? '#1e40af' : '#374151',
              textAlign: 'left',
              cursor: 'pointer',
              borderLeft: selectedType === item.type ? '3px solid #3b82f6' : '3px solid transparent',
              transition: 'all 0.15s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
            onMouseEnter={(e) => {
              if (selectedType !== item.type) {
                e.currentTarget.style.backgroundColor = '#f9fafb'
              }
            }}
            onMouseLeave={(e) => {
              if (selectedType !== item.type) {
                e.currentTarget.style.backgroundColor = 'transparent'
              }
            }}
          >
            {/* 아이콘 */}
            <span style={{ fontSize: '1.25rem' }}>
              {item.icon}
            </span>
            
            {/* 텍스트 영역 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ 
                fontSize: '0.875rem', 
                fontWeight: selectedType === item.type ? '600' : '500',
                lineHeight: '1.25'
              }}>
                {item.label}
              </span>
              <span style={{ 
                fontSize: '0.75rem', 
                color: selectedType === item.type ? '#1e40af' : '#6b7280',
                lineHeight: '1.25'
              }}>
                {item.description}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* 메뉴 푸터 */}
      <div style={{ 
        padding: '1rem 1.5rem', 
        borderTop: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb'
      }}>
        <div style={{ 
          fontSize: '0.75rem', 
          color: '#6b7280',
          textAlign: 'center'
        }}>
          Smart QMS v1.0
        </div>
      </div>
    </div>
  )
}
