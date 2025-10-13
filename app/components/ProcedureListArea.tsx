'use client'

import { useState } from 'react'
import { DocumentType } from '../page'
import { ProcedureData } from '../types/ProcedureData'

interface ProcedureListAreaProps {
  onProcedureSelect: (procedure: ProcedureData) => void
  selectedProcedure: ProcedureData | null
  documentType?: DocumentType
}

// 문서 유형별 제목 매핑
const getDocumentTypeTitle = (type: DocumentType) => {
  const titles = {
    manual: '매뉴얼',
    process: '프로세스',
    procedure: '절차'
  }
  return titles[type] || '문서'
}

// 샘플 데이터
const sampleProcedures: ProcedureData[] = [
  {
    id: '1',
    NO: 1,
    구분: '절차서',
    분야: '품질관리',
    문서번호: 'QP-001',
    표준명: '설계검토 절차서',
    영문표준명: 'Design Review Procedure',
    책임부서: '품질관리팀',
    Rev: 1,
    제정일자: '2024-01-15',
    개정일자: '2024-01-15'
  },
  {
    id: '2',
    NO: 2,
    구분: '절차서',
    분야: '생산관리',
    문서번호: 'QP-002',
    표준명: '구매승인 절차서',
    영문표준명: 'Purchase Approval Procedure',
    책임부서: '구매팀',
    Rev: 2,
    제정일자: '2024-02-01',
    개정일자: '2024-03-15'
  },
  {
    id: '3',
    NO: 3,
    구분: '절차서',
    분야: '환경관리',
    문서번호: 'QP-003',
    표준명: '환경영향평가 절차서',
    영문표준명: 'Environmental Impact Assessment Procedure',
    책임부서: '환경안전팀',
    Rev: 1,
    제정일자: '2024-03-01',
    개정일자: '2024-03-01'
  }
]

export default function ProcedureListArea({ onProcedureSelect, selectedProcedure, documentType = 'procedure' }: ProcedureListAreaProps) {
  const [procedures] = useState<ProcedureData[]>(sampleProcedures)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof ProcedureData>('문서번호')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // 검색 필터링
  const filteredProcedures = procedures.filter(procedure =>
    procedure.문서번호.toLowerCase().includes(searchTerm.toLowerCase()) ||
    procedure.표준명.toLowerCase().includes(searchTerm.toLowerCase()) ||
    procedure.영문표준명.toLowerCase().includes(searchTerm.toLowerCase()) ||
    procedure.책임부서.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 정렬
  const sortedProcedures = [...filteredProcedures].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (field: keyof ProcedureData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleRowClick = (procedure: ProcedureData) => {
    onProcedureSelect(procedure)
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
            placeholder="문서번호, 표준명, 영문표준명, 책임부서로 검색..."
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
                onClick={() => handleSort('책임부서')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                책임부서
                {sortField === '책임부서' && (
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
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'white' }}>
            {sortedProcedures.map((procedure) => (
              <tr
                key={procedure.id}
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: selectedProcedure?.id === procedure.id ? '#eff6ff' : 'white'
                }}
                onClick={() => handleRowClick(procedure)}
                onMouseEnter={(e) => {
                  if (selectedProcedure?.id !== procedure.id) {
                    e.currentTarget.style.backgroundColor = '#f9fafb'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedProcedure?.id !== procedure.id) {
                    e.currentTarget.style.backgroundColor = 'white'
                  }
                }}
              >
                <td className="table-cell">
                  <input 
                    type="checkbox" 
                    style={{ borderRadius: '0.25rem' }}
                    checked={selectedProcedure?.id === procedure.id}
                    onChange={() => handleRowClick(procedure)}
                  />
                </td>
                <td className="table-cell">{procedure.NO}</td>
                <td className="table-cell">
                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    padding: '0.125rem 0.625rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.75rem', 
                    fontWeight: '500', 
                    backgroundColor: '#dcfce7', 
                    color: '#166534' 
                  }}>
                    {procedure.구분}
                  </span>
                </td>
                <td className="table-cell">{procedure.분야}</td>
                <td className="table-cell" style={{ fontWeight: '500' }}>{procedure.문서번호}</td>
                <td className="table-cell">{procedure.표준명}</td>
                <td className="table-cell">{procedure.영문표준명}</td>
                <td className="table-cell">{procedure.책임부서}</td>
                <td className="table-cell">{procedure.Rev}</td>
                <td className="table-cell">{procedure.제정일자}</td>
                <td className="table-cell">{procedure.개정일자}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div style={{ padding: '0.75rem 1.5rem', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '0.875rem', color: '#374151' }}>
            총 {sortedProcedures.length}개 항목
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
