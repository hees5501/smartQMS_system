'use client'

import { useState } from 'react'
import { DocumentType } from '../page'
import { ProcessData } from '../types/ProcessData'

interface ProcessListAreaProps {
  onProcessSelect: (process: ProcessData) => void
  selectedProcess: ProcessData | null
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
const sampleProcesses: ProcessData[] = [
  {
    id: '1',
    NO: 1,
    구분: '프로세스',
    분야: '품질관리',
    문서번호: 'QP-001',
    프로세스명: '설계개발 프로세스',
    프로세스오너: '김철수',
    Rev: 1,
    제정일자: '2024-01-15',
    개정일자: '2024-01-15',
    결재상태: '승인'
  },
  {
    id: '2',
    NO: 2,
    구분: '프로세스',
    분야: '생산관리',
    문서번호: 'QP-002',
    프로세스명: '구매관리 프로세스',
    프로세스오너: '이영희',
    Rev: 2,
    제정일자: '2024-02-01',
    개정일자: '2024-03-15',
    결재상태: '검토중'
  },
  {
    id: '3',
    NO: 3,
    구분: '프로세스',
    분야: '환경관리',
    문서번호: 'QP-003',
    프로세스명: '환경영향평가 프로세스',
    프로세스오너: '박민수',
    Rev: 1,
    제정일자: '2024-03-01',
    개정일자: '2024-03-01',
    결재상태: '작성중'
  }
]

export default function ProcessListArea({ onProcessSelect, selectedProcess, documentType = 'process' }: ProcessListAreaProps) {
  const [processes] = useState<ProcessData[]>(sampleProcesses)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof ProcessData>('문서번호')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // 검색 필터링
  const filteredProcesses = processes.filter(process =>
    process.문서번호.toLowerCase().includes(searchTerm.toLowerCase()) ||
    process.프로세스명.toLowerCase().includes(searchTerm.toLowerCase()) ||
    process.프로세스오너.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 정렬
  const sortedProcesses = [...filteredProcesses].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (field: keyof ProcessData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleRowClick = (process: ProcessData) => {
    onProcessSelect(process)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case '승인': return '#10b981'
      case '검토중': return '#f59e0b'
      case '작성중': return '#6b7280'
      default: return '#6b7280'
    }
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
            placeholder="문서번호, 프로세스명, 프로세스오너로 검색..."
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
                onClick={() => handleSort('프로세스명')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                프로세스명
                {sortField === '프로세스명' && (
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
                프로세스오너
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
                onClick={() => handleSort('결재상태')}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              >
                결재상태
                {sortField === '결재상태' && (
                  <span style={{ marginLeft: '0.25rem' }}>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'white' }}>
            {sortedProcesses.map((process) => (
              <tr
                key={process.id}
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: selectedProcess?.id === process.id ? '#eff6ff' : 'white'
                }}
                onClick={() => handleRowClick(process)}
                onMouseEnter={(e) => {
                  if (selectedProcess?.id !== process.id) {
                    e.currentTarget.style.backgroundColor = '#f9fafb'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedProcess?.id !== process.id) {
                    e.currentTarget.style.backgroundColor = 'white'
                  }
                }}
              >
                <td className="table-cell">
                  <input 
                    type="checkbox" 
                    style={{ borderRadius: '0.25rem' }}
                    checked={selectedProcess?.id === process.id}
                    onChange={() => handleRowClick(process)}
                  />
                </td>
                <td className="table-cell">{process.NO}</td>
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
                    {process.구분}
                  </span>
                </td>
                <td className="table-cell">{process.분야}</td>
                <td className="table-cell" style={{ fontWeight: '500' }}>{process.문서번호}</td>
                <td className="table-cell">{process.프로세스명}</td>
                <td className="table-cell">{process.프로세스오너}</td>
                <td className="table-cell">{process.Rev}</td>
                <td className="table-cell">{process.제정일자}</td>
                <td className="table-cell">{process.개정일자}</td>
                <td className="table-cell">
                  <span style={{ 
                    color: getStatusColor(process.결재상태),
                    fontWeight: '500'
                  }}>
                    {process.결재상태}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div style={{ padding: '0.75rem 1.5rem', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '0.875rem', color: '#374151' }}>
            총 {sortedProcesses.length}개 항목
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
