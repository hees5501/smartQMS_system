'use client'

import { useState } from 'react'
import { RACIEData } from '../types/ProcessData'

export default function RACIETab() {
  const [racieData, setRacieData] = useState<RACIEData[]>([
    {
      id: '1',
      활동: '요구사항 분석',
      담당자: '김철수',
      R: '김철수',
      A: '이영희',
      C: '박민수',
      I: '최지영',
      E: '정수진'
    }
  ])

  const [newActivity, setNewActivity] = useState({
    활동: '',
    담당자: '',
    R: '',
    A: '',
    C: '',
    I: '',
    E: ''
  })

  const handleAddActivity = () => {
    if (newActivity.활동 && newActivity.담당자) {
      setRacieData(prev => [...prev, { ...newActivity, id: Date.now().toString() }])
      setNewActivity({
        활동: '',
        담당자: '',
        R: '',
        A: '',
        C: '',
        I: '',
        E: ''
      })
    }
  }

  const handleDeleteActivity = (id: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      setRacieData(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleInputChange = (id: string, field: keyof RACIEData, value: string) => {
    setRacieData(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>RACIE 매트릭스</h3>
        <button onClick={handleAddActivity} className="btn-primary">
          + 활동 추가
        </button>
      </div>

      {/* 새 활동 입력 폼 */}
      <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '0.5rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>활동</label>
            <input
              type="text"
              value={newActivity.활동}
              onChange={(e) => setNewActivity(prev => ({ ...prev, 활동: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="활동명"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>담당자</label>
            <input
              type="text"
              value={newActivity.담당자}
              onChange={(e) => setNewActivity(prev => ({ ...prev, 담당자: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="담당자명"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>R (담당)</label>
            <input
              type="text"
              value={newActivity.R}
              onChange={(e) => setNewActivity(prev => ({ ...prev, R: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="담당자"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>A (결재)</label>
            <input
              type="text"
              value={newActivity.A}
              onChange={(e) => setNewActivity(prev => ({ ...prev, A: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="결재자"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>C (협의)</label>
            <input
              type="text"
              value={newActivity.C}
              onChange={(e) => setNewActivity(prev => ({ ...prev, C: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="협의자"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>I (통보)</label>
            <input
              type="text"
              value={newActivity.I}
              onChange={(e) => setNewActivity(prev => ({ ...prev, I: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="통보자"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>E (지원)</label>
            <input
              type="text"
              value={newActivity.E}
              onChange={(e) => setNewActivity(prev => ({ ...prev, E: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="지원자"
            />
          </div>
          <div>
            <button onClick={handleAddActivity} className="btn-primary" style={{ fontSize: '0.875rem' }}>
              추가
            </button>
          </div>
        </div>
      </div>

      {/* RACIE 테이블 */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ minWidth: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th className="table-header" style={{ width: '3rem' }}>작업</th>
              <th className="table-header">활동</th>
              <th className="table-header">담당자</th>
              <th className="table-header" style={{ backgroundColor: '#fef3c7' }}>R (담당)</th>
              <th className="table-header" style={{ backgroundColor: '#fef3c7' }}>A (결재)</th>
              <th className="table-header" style={{ backgroundColor: '#fef3c7' }}>C (협의)</th>
              <th className="table-header" style={{ backgroundColor: '#fef3c7' }}>I (통보)</th>
              <th className="table-header" style={{ backgroundColor: '#fef3c7' }}>E (지원)</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'white' }}>
            {racieData.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td className="table-cell">
                  <button
                    onClick={() => handleDeleteActivity(item.id)}
                    style={{ color: '#ef4444', fontSize: '0.875rem' }}
                  >
                    삭제
                  </button>
                </td>
                <td className="table-cell">
                  <input
                    type="text"
                    value={item.활동}
                    onChange={(e) => handleInputChange(item.id, '활동', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
                <td className="table-cell">
                  <input
                    type="text"
                    value={item.담당자}
                    onChange={(e) => handleInputChange(item.id, '담당자', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
                <td className="table-cell" style={{ backgroundColor: '#fef3c7' }}>
                  <input
                    type="text"
                    value={item.R}
                    onChange={(e) => handleInputChange(item.id, 'R', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
                <td className="table-cell" style={{ backgroundColor: '#fef3c7' }}>
                  <input
                    type="text"
                    value={item.A}
                    onChange={(e) => handleInputChange(item.id, 'A', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
                <td className="table-cell" style={{ backgroundColor: '#fef3c7' }}>
                  <input
                    type="text"
                    value={item.C}
                    onChange={(e) => handleInputChange(item.id, 'C', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
                <td className="table-cell" style={{ backgroundColor: '#fef3c7' }}>
                  <input
                    type="text"
                    value={item.I}
                    onChange={(e) => handleInputChange(item.id, 'I', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
                <td className="table-cell" style={{ backgroundColor: '#fef3c7' }}>
                  <input
                    type="text"
                    value={item.E}
                    onChange={(e) => handleInputChange(item.id, 'E', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {racieData.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          활동이 없습니다. + 활동 추가 버튼을 클릭하여 활동을 추가하세요.
        </div>
      )}
    </div>
  )
}
