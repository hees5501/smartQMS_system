'use client'

import { useState } from 'react'
import { GuideTermData } from '../types/GuideData'

export default function GuideTermDefinitionTab() {
  const [termData, setTermData] = useState<GuideTermData[]>([
    {
      id: '1',
      용어: '품질관리',
      정의: '제품이나 서비스의 품질을 보장하기 위한 체계적인 관리 활동',
      비고: 'ISO 9001 기준'
    },
    {
      id: '2',
      용어: '검사',
      정의: '제품이나 서비스가 규격에 부합하는지 확인하는 과정',
      비고: '시각적, 측정적 검사 포함'
    }
  ])

  const [newTerm, setNewTerm] = useState({
    용어: '',
    정의: '',
    비고: ''
  })

  const handleAddTerm = () => {
    if (newTerm.용어 && newTerm.정의) {
      setTermData(prev => [...prev, { ...newTerm, id: Date.now().toString() }])
      setNewTerm({
        용어: '',
        정의: '',
        비고: ''
      })
    }
  }

  const handleDeleteTerm = (id: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      setTermData(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleInputChange = (id: string, field: keyof GuideTermData, value: string) => {
    setTermData(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>용어의 정의</h3>
        <button onClick={handleAddTerm} className="btn-primary">
          + 용어 추가
        </button>
      </div>

      {/* 새 용어 입력 폼 */}
      <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>용어</label>
            <input
              type="text"
              value={newTerm.용어}
              onChange={(e) => setNewTerm(prev => ({ ...prev, 용어: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="용어명"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>정의</label>
            <input
              type="text"
              value={newTerm.정의}
              onChange={(e) => setNewTerm(prev => ({ ...prev, 정의: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="용어 정의"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>비고</label>
            <input
              type="text"
              value={newTerm.비고}
              onChange={(e) => setNewTerm(prev => ({ ...prev, 비고: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="비고"
            />
          </div>
        </div>
        <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
          <button onClick={handleAddTerm} className="btn-primary" style={{ fontSize: '0.875rem' }}>
            추가
          </button>
        </div>
      </div>

      {/* 용어 정의 테이블 */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ minWidth: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th className="table-header" style={{ width: '3rem' }}>작업</th>
              <th className="table-header">용어</th>
              <th className="table-header">정의</th>
              <th className="table-header">비고</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'white' }}>
            {termData.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td className="table-cell">
                  <button
                    onClick={() => handleDeleteTerm(item.id)}
                    style={{ color: '#ef4444', fontSize: '0.875rem' }}
                  >
                    삭제
                  </button>
                </td>
                <td className="table-cell">
                  <input
                    type="text"
                    value={item.용어}
                    onChange={(e) => handleInputChange(item.id, '용어', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
                <td className="table-cell">
                  <input
                    type="text"
                    value={item.정의}
                    onChange={(e) => handleInputChange(item.id, '정의', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
                <td className="table-cell">
                  <input
                    type="text"
                    value={item.비고}
                    onChange={(e) => handleInputChange(item.id, '비고', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {termData.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          용어가 없습니다. + 용어 추가 버튼을 클릭하여 용어를 추가하세요.
        </div>
      )}
    </div>
  )
}
