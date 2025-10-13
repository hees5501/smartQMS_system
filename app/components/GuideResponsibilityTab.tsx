'use client'

import { useState } from 'react'
import { GuideResponsibilityData } from '../types/GuideData'

export default function GuideResponsibilityTab() {
  const [responsibilityData, setResponsibilityData] = useState<GuideResponsibilityData[]>([
    {
      id: '1',
      역할: '지침 담당자',
      책임: '지침 수행 및 모니터링',
      권한: '지침 변경 요청, 보고서 작성',
      비고: '품질관리팀 소속'
    }
  ])

  const [newResponsibility, setNewResponsibility] = useState({
    역할: '',
    책임: '',
    권한: '',
    비고: ''
  })

  const handleAddResponsibility = () => {
    if (newResponsibility.역할 && newResponsibility.책임 && newResponsibility.권한) {
      setResponsibilityData(prev => [...prev, { ...newResponsibility, id: Date.now().toString() }])
      setNewResponsibility({
        역할: '',
        책임: '',
        권한: '',
        비고: ''
      })
    }
  }

  const handleDeleteResponsibility = (id: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      setResponsibilityData(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleInputChange = (id: string, field: keyof GuideResponsibilityData, value: string) => {
    setResponsibilityData(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>책임과 권한</h3>
        <button onClick={handleAddResponsibility} className="btn-primary">
          + 역할 추가
        </button>
      </div>

      {/* 새 역할 입력 폼 */}
      <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>역할</label>
            <input
              type="text"
              value={newResponsibility.역할}
              onChange={(e) => setNewResponsibility(prev => ({ ...prev, 역할: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="역할명"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>책임</label>
            <input
              type="text"
              value={newResponsibility.책임}
              onChange={(e) => setNewResponsibility(prev => ({ ...prev, 책임: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="책임 내용"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>권한</label>
            <input
              type="text"
              value={newResponsibility.권한}
              onChange={(e) => setNewResponsibility(prev => ({ ...prev, 권한: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="권한 내용"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>비고</label>
            <input
              type="text"
              value={newResponsibility.비고}
              onChange={(e) => setNewResponsibility(prev => ({ ...prev, 비고: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="비고"
            />
          </div>
        </div>
        <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
          <button onClick={handleAddResponsibility} className="btn-primary" style={{ fontSize: '0.875rem' }}>
            추가
          </button>
        </div>
      </div>

      {/* 책임과권한 테이블 */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ minWidth: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th className="table-header" style={{ width: '3rem' }}>작업</th>
              <th className="table-header">역할</th>
              <th className="table-header">책임</th>
              <th className="table-header">권한</th>
              <th className="table-header">비고</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'white' }}>
            {responsibilityData.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td className="table-cell">
                  <button
                    onClick={() => handleDeleteResponsibility(item.id)}
                    style={{ color: '#ef4444', fontSize: '0.875rem' }}
                  >
                    삭제
                  </button>
                </td>
                <td className="table-cell">
                  <input
                    type="text"
                    value={item.역할}
                    onChange={(e) => handleInputChange(item.id, '역할', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
                <td className="table-cell">
                  <input
                    type="text"
                    value={item.책임}
                    onChange={(e) => handleInputChange(item.id, '책임', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
                <td className="table-cell">
                  <input
                    type="text"
                    value={item.권한}
                    onChange={(e) => handleInputChange(item.id, '권한', e.target.value)}
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

      {responsibilityData.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          역할이 없습니다. + 역할 추가 버튼을 클릭하여 역할을 추가하세요.
        </div>
      )}
    </div>
  )
}
