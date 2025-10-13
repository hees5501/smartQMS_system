'use client'

import { useState } from 'react'
import { DocumentType } from '../page'
import { GuideData } from '../types/GuideData'

interface GuideListAreaProps {
  onGuideSelect: (guide: GuideData) => void
  selectedGuide: GuideData | null
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
const sampleGuides: GuideData[] = [
  {
    id: '1',
    NO: 1,
    구분: '지침서',
    분야: '품질관리',
    문서번호: 'QG-001',
    표준명: '품질검사 지침서',
    영문표준명: 'Quality Inspection Guide',
    프로세스오너: '김철수',
    Rev: 1,
    제정일자: '2024-01-15',
    개정일자: '2024-01-15'
  },
  {
    id: '2',
    NO: 2,
    구분: '지침서',
    분야: '생산관리',
    문서번호: 'QG-002',
    표준명: '생산계획 수립 지침서',
    영문표준명: 'Production Planning Guide',
    프로세스오너: '이영희',
    Rev: 2,
    제정일자: '2024-02-01',
    개정일자: '2024-03-15'
  },
  {
    id: '3',
    NO: 3,
    구분: '지침서',
    분야: '환경관리',
    문서번호: 'QG-003',
    표준명: '환경영향평가 지침서',
    영문표준명: 'Environmental Impact Assessment Guide',
    프로세스오너: '박민수',
    Rev: 1,
    제정일자: '2024-03-01',
    개정일자: '2024-03-01'
  }
]

export default function GuideListArea({ onGuideSelect, selectedGuide, documentType = 'guide' }: GuideListAreaProps) {
  const [guides] = useState<GuideData[]>(sampleGuides)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<keyof GuideData>('문서번호')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // 검색 필터링
  const filteredGuides = guides.filter(guide =>
    guide.문서번호.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.표준명.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.영문표준명.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.프로세스오너.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // 정렬
  const sortedGuides = [...filteredGuides].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (field: keyof GuideData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleRowClick = (guide: GuideData) => {
    onGuideSelect(guide)
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
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'white' }}>
            {sortedGuides.map((guide) => (
              <tr
                key={guide.id}
                style={{ 
                  cursor: 'pointer',
                  backgroundColor: selectedGuide?.id === guide.id ? '#eff6ff' : 'white'
                }}
                onClick={() => handleRowClick(guide)}
                onMouseEnter={(e) => {
                  if (selectedGuide?.id !== guide.id) {
                    e.currentTarget.style.backgroundColor = '#f9fafb'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedGuide?.id !== guide.id) {
                    e.currentTarget.style.backgroundColor = 'white'
                  }
                }}
              >
                <td className="table-cell">
                  <input 
                    type="checkbox" 
                    style={{ borderRadius: '0.25rem' }}
                    checked={selectedGuide?.id === guide.id}
                    onChange={() => handleRowClick(guide)}
                  />
                </td>
                <td className="table-cell">{guide.NO}</td>
                <td className="table-cell">
                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    padding: '0.125rem 0.625rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.75rem', 
                    fontWeight: '500', 
                    backgroundColor: '#fef3c7', 
                    color: '#92400e' 
                  }}>
                    {guide.구분}
                  </span>
                </td>
                <td className="table-cell">{guide.분야}</td>
                <td className="table-cell" style={{ fontWeight: '500' }}>{guide.문서번호}</td>
                <td className="table-cell">{guide.표준명}</td>
                <td className="table-cell">{guide.영문표준명}</td>
                <td className="table-cell">{guide.프로세스오너}</td>
                <td className="table-cell">{guide.Rev}</td>
                <td className="table-cell">{guide.제정일자}</td>
                <td className="table-cell">{guide.개정일자}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div style={{ padding: '0.75rem 1.5rem', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '0.875rem', color: '#374151' }}>
            총 {sortedGuides.length}개 항목
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
