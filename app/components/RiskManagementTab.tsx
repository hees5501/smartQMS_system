'use client'

import { useState } from 'react'
import { RiskData } from '../types/ProcessData'

interface RiskManagementTabProps {
  isEditing?: boolean
}

export default function RiskManagementTab({ isEditing = false }: RiskManagementTabProps) {
  const [riskData, setRiskData] = useState<RiskData[]>([
    {
      id: '1',
      리스크내용: '설계 변경으로 인한 일정 지연',
      영향도: 4,
      발생가능성: 3,
      위험도: 12,
      대응방안: '변경 관리 프로세스 강화 및 사전 검토 체계 구축'
    }
  ])

  const [newRisk, setNewRisk] = useState({
    리스크내용: '',
    영향도: 1,
    발생가능성: 1,
    대응방안: ''
  })

  const handleAddRisk = () => {
    if (newRisk.리스크내용 && newRisk.대응방안) {
      const 위험도 = newRisk.영향도 * newRisk.발생가능성
      setRiskData(prev => [...prev, { 
        ...newRisk, 
        id: Date.now().toString(),
        위험도 
      }])
      setNewRisk({
        리스크내용: '',
        영향도: 1,
        발생가능성: 1,
        대응방안: ''
      })
    }
  }

  const handleDeleteRisk = (id: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      setRiskData(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleInputChange = (id: string, field: keyof RiskData, value: string | number) => {
    setRiskData(prev => prev.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }
        // 영향도나 발생가능성이 변경되면 위험도 재계산
        if (field === '영향도' || field === '발생가능성') {
          updatedItem.위험도 = updatedItem.영향도 * updatedItem.발생가능성
        }
        return updatedItem
      }
      return item
    }))
  }

  const getRiskLevelColor = (위험도: number) => {
    if (위험도 >= 16) return '#ef4444' // 높음
    if (위험도 >= 9) return '#f59e0b'  // 중간
    return '#10b981' // 낮음
  }

  const getRiskLevelText = (위험도: number) => {
    if (위험도 >= 16) return '높음'
    if (위험도 >= 9) return '중간'
    return '낮음'
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>RISK 관리</h3>
        <button onClick={handleAddRisk} disabled={!isEditing} className="btn-primary">
          + 리스크 추가
        </button>
      </div>

      {/* 새 리스크 입력 폼 */}
      <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr auto', gap: '0.5rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>리스크 내용</label>
            <input
              type="text"
              value={newRisk.리스크내용}
              onChange={(e) => setNewRisk(prev => ({ ...prev, 리스크내용: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="리스크 내용을 입력하세요"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>영향도 (1-5)</label>
            <select
              value={newRisk.영향도}
              onChange={(e) => setNewRisk(prev => ({ ...prev, 영향도: parseInt(e.target.value) }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
            >
              <option value={1}>1 (낮음)</option>
              <option value={2}>2</option>
              <option value={3}>3 (보통)</option>
              <option value={4}>4</option>
              <option value={5}>5 (높음)</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>발생가능성 (1-5)</label>
            <select
              value={newRisk.발생가능성}
              onChange={(e) => setNewRisk(prev => ({ ...prev, 발생가능성: parseInt(e.target.value) }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
            >
              <option value={1}>1 (낮음)</option>
              <option value={2}>2</option>
              <option value={3}>3 (보통)</option>
              <option value={4}>4</option>
              <option value={5}>5 (높음)</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>대응방안</label>
            <input
              type="text"
              value={newRisk.대응방안}
              onChange={(e) => setNewRisk(prev => ({ ...prev, 대응방안: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="대응방안을 입력하세요"
            />
          </div>
          <div>
            <button onClick={handleAddRisk} disabled={!isEditing} className="btn-primary" style={{ fontSize: '0.875rem' }}>
              추가
            </button>
          </div>
        </div>
      </div>

      {/* RISK 테이블 */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ minWidth: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th className="table-header" style={{ width: '3rem' }}>작업</th>
              <th className="table-header">리스크 내용</th>
              <th className="table-header">영향도</th>
              <th className="table-header">발생가능성</th>
              <th className="table-header">위험도</th>
              <th className="table-header">대응방안</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'white' }}>
            {riskData.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td className="table-cell">
                  <button
                    onClick={() => handleDeleteRisk(item.id)}
                    style={{ color: '#ef4444', fontSize: '0.875rem' }}
                  >
                    삭제
                  </button>
                </td>
                <td className="table-cell">
                  <input
                    type="text"
                    value={item.리스크내용}
                    onChange={(e) => handleInputChange(item.id, '리스크내용', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
                <td className="table-cell">
                  <select
                    value={item.영향도}
                    onChange={(e) => handleInputChange(item.id, '영향도', parseInt(e.target.value))}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </td>
                <td className="table-cell">
                  <select
                    value={item.발생가능성}
                    onChange={(e) => handleInputChange(item.id, '발생가능성', parseInt(e.target.value))}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </td>
                <td className="table-cell">
                  <span style={{ 
                    color: getRiskLevelColor(item.위험도),
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    {item.위험도} ({getRiskLevelText(item.위험도)})
                  </span>
                </td>
                <td className="table-cell">
                  <input
                    type="text"
                    value={item.대응방안}
                    onChange={(e) => handleInputChange(item.id, '대응방안', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {riskData.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          리스크가 없습니다. + 리스크 추가 버튼을 클릭하여 리스크를 추가하세요.
        </div>
      )}
    </div>
  )
}
