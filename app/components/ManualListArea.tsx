'use client'

import { useState } from 'react'
import { DocumentType } from '../page'
import { ManualData } from '../types/ManualData'

interface ManualListAreaProps {
  onManualSelect: (manual: ManualData) => void
  selectedManual: ManualData | null
  documentType?: DocumentType
}

// 문서 유형별 제목 매핑
const getDocumentTypeTitle = (type: DocumentType) => {
  const titles = {
    manual: '매뉴얼',
    guide: '지침',
    process: '프로세스',
    procedure: '절차'
  }
  return titles[type] || '문서'
}

// 샘플 데이터
const sampleManuals: ManualData[] = [
  {
    id: '1',
    NO: 1,
    구분: '매뉴얼',
    분야: '품질관리',
    문서번호: 'QM-001',
    표준명: '품질경영시스템 매뉴얼',
    영문표준명: 'Quality Management System Manual',
    프로세스오너: '김철수',
    Rev: 3,
    제정일자: '2023-01-15',
    개정일자: '2024-01-15'
  },
  {
    id: '2',
    NO: 2,
    구분: '매뉴얼',
    분야: '환경관리',
    문서번호: 'EM-001',
    표준명: '환경경영시스템 매뉴얼',
    영문표준명: 'Environmental Management System Manual',
    프로세스오너: '이영희',
    Rev: 2,
    제정일자: '2023-03-01',
    개정일자: '2024-02-15'
  },
  {
    id: '3',
    NO: 3,
    구분: '매뉴얼',
    분야: '안전보건',
    문서번호: 'SM-001',
    표준명: '안전보건경영시스템 매뉴얼',
    영문표준명: 'Safety and Health Management System Manual',
    프로세스오너: '박민수',
    Rev: 1,
    제정일자: '2024-01-01',
    개정일자: '2024-01-01'
  }
]

export default function ManualListArea({ onManualSelect, selectedManual, documentType = 'manual' }: ManualListAreaProps) {
  const [manuals] = useState<ManualData[]>(sampleManuals)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof ManualData>('문서번호')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // 검색 필터링
  const filteredManuals = manuals.filter(manual =>
    manual.문서번호.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manual.표준명.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manual.영문표준명.toLowerCase().includes(searchTerm.toLowerCase()) ||
    manual.프로세스오너.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 정렬
  const sortedManuals = [...filteredManuals].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (field: keyof ManualData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleRowClick = (manual: ManualData) => {
    onManualSelect(manual)
  }

  return (
    <div style={{ backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', borderBottom: '1px solid #e5e7eb' }}>
      {/* 헤더 */}
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
            {getDocumentTypeTitle(documentType)} 목록
          </h2>
          
          {/* 액션 버튼들 */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-secondary" style={{ fontSize: '0.875rem' }}>조회</button>
            <button className="btn-primary" style={{ fontSize: '0.875rem' }}>추가</button>
            <button className="btn-secondary" style={{ fontSize: '0.875rem' }}>수정</button>
            <button className="btn-secondary" style={{ fontSize: '0.875rem' }}>삭제</button>
            <button className="btn-secondary" style={{ fontSize: '0.875rem' }}>복사</button>
            <button className="btn-secondary" style={{ fontSize: '0.875rem' }}>출력</button>
            <button className="btn-secondary" style={{ fontSize: '0.875rem' }}>엑셀</button>
            <button className="btn-secondary" style={{ fontSize: '0.875rem' }}>이력</button>
            <button className="btn-secondary" style={{ fontSize: '0.875rem' }}>다운로드</button>
          </div>
        </div>
        
        {/* 검색 */}
        <div style={{ marginTop: '1rem' }}>
          <input
            type="text"
            placeholder="문서번호, 표준명, 영문표준명, 프로세스오너로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
            style={{ maxWidth: '28rem' }}
          />
        </div>
      </div>

      {/* 테이블 */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ minWidth: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th className="table-header" style={{ width: '3rem' }}>
                <input type="checkbox" style={{ borderRadius: '0.25rem' }} />
              </th>
              <th 
                className="table-header"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('NO')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                NO
                {sortField === 'NO' && (
                  <span style={{ marginLeft: '0.25rem' }}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="table-header"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('구분')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                구분
                {sortField === '구분' && (
                  <span style={{ marginLeft: '0.25rem' }}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="table-header"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('분야')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                분야
                {sortField === '분야' && (
                  <span style={{ marginLeft: '0.25rem' }}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="table-header"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('문서번호')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                문서번호
                {sortField === '문서번호' && (
                  <span style={{ marginLeft: '0.25rem' }}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="table-header"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('표준명')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                표준명
                {sortField === '표준명' && (
                  <span style={{ marginLeft: '0.25rem' }}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="table-header"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('영문표준명')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                영문표준명
                {sortField === '영문표준명' && (
                  <span style={{ marginLeft: '0.25rem' }}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="table-header"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('프로세스오너')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                프로세스 오너
                {sortField === '프로세스오너' && (
                  <span style={{ marginLeft: '0.25rem' }}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="table-header"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('Rev')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                Rev
                {sortField === 'Rev' && (
                  <span style={{ marginLeft: '0.25rem' }}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="table-header"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('제정일자')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                제정일자
                {sortField === '제정일자' && (
                  <span style={{ marginLeft: '0.25rem' }}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="table-header"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('개정일자')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                개정일자
                {sortField === '개정일자' && (
                  <span style={{ marginLeft: '0.25rem' }}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th 
                className="table-header"
                style={{ cursor: 'pointer' }}
                onClick={() => handleSort('폐기일자')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                폐기일자
                {sortField === '폐기일자' && (
                  <span style={{ marginLeft: '0.25rem' }}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'white' }}>
            {sortedManuals.map((manual) => (
              <tr
                key={manual.id}
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: selectedManual?.id === manual.id ? '#eff6ff' : 'white'
                }}
                onClick={() => handleRowClick(manual)}
                onMouseEnter={(e) => {
                  if (selectedManual?.id !== manual.id) {
                    e.currentTarget.style.backgroundColor = '#f9fafb'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedManual?.id !== manual.id) {
                    e.currentTarget.style.backgroundColor = 'white'
                  }
                }}
              >
                <td className="table-cell">
                  <input 
                    type="checkbox" 
                    style={{ borderRadius: '0.25rem' }}
                    checked={selectedManual?.id === manual.id}
                    onChange={() => handleRowClick(manual)}
                  />
                </td>
                <td className="table-cell">{manual.NO}</td>
                <td className="table-cell">
                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    padding: '0.125rem 0.625rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.75rem', 
                    fontWeight: '500', 
                    backgroundColor: '#dbeafe', 
                    color: '#1e40af' 
                  }}>
                    {manual.구분}
                  </span>
                </td>
                <td className="table-cell">{manual.분야}</td>
                <td className="table-cell" style={{ fontWeight: '500' }}>{manual.문서번호}</td>
                <td className="table-cell">{manual.표준명}</td>
                <td className="table-cell">{manual.영문표준명}</td>
                <td className="table-cell">{manual.프로세스오너}</td>
                <td className="table-cell">{manual.Rev}</td>
                <td className="table-cell">{manual.제정일자}</td>
                <td className="table-cell">{manual.개정일자}</td>
                <td className="table-cell">{manual.폐기일자 || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div style={{ padding: '0.75rem 1.5rem', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '0.875rem', color: '#374151' }}>
            총 {sortedManuals.length}개 항목
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-secondary" style={{ fontSize: '0.875rem' }}>이전</button>
            <button className="btn-primary" style={{ fontSize: '0.875rem' }}>1</button>
            <button className="btn-secondary" style={{ fontSize: '0.875rem' }}>다음</button>
          </div>
        </div>
      </div>
    </div>
  )
}