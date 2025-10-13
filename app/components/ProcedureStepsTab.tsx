'use client'

import { useState } from 'react'
import { ProcedureStepData } from '../types/ProcedureData'

export default function ProcedureStepsTab() {
  const [stepData, setStepData] = useState<ProcedureStepData[]>([
    {
      id: '1',
      단계: 1,
      단계명: '요구사항 분석',
      수행내용: '고객 요구사항을 분석하고 문서화합니다.',
      담당자: '김철수',
      소요시간: '2시간',
      산출물: '요구사항 명세서',
      비고: '품질관리팀 검토 필요'
    },
    {
      id: '2',
      단계: 2,
      단계명: '설계 검토',
      수행내용: '설계 문서를 검토하고 승인합니다.',
      담당자: '이영희',
      소요시간: '1시간',
      산출물: '설계 검토 보고서',
      비고: '기술팀 협의'
    }
  ])

  const [newStep, setNewStep] = useState({
    단계: stepData.length + 1,
    단계명: '',
    수행내용: '',
    담당자: '',
    소요시간: '',
    산출물: '',
    비고: ''
  })

  const handleAddStep = () => {
    if (newStep.단계명 && newStep.수행내용 && newStep.담당자) {
      setStepData(prev => [...prev, { ...newStep, id: Date.now().toString() }])
      setNewStep({
        단계: stepData.length + 2,
        단계명: '',
        수행내용: '',
        담당자: '',
        소요시간: '',
        산출물: '',
        비고: ''
      })
    }
  }

  const handleDeleteStep = (id: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      setStepData(prev => {
        const filtered = prev.filter(item => item.id !== id)
        // 단계 번호 재정렬
        return filtered.map((item, index) => ({ ...item, 단계: index + 1 }))
      })
    }
  }

  const handleInputChange = (id: string, field: keyof ProcedureStepData, value: string | number) => {
    setStepData(prev => prev.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ))
  }

  const moveStepUp = (id: string) => {
    setStepData(prev => {
      const currentIndex = prev.findIndex(item => item.id === id)
      if (currentIndex > 0) {
        const newData = [...prev]
        const temp = newData[currentIndex]
        newData[currentIndex] = newData[currentIndex - 1]
        newData[currentIndex - 1] = temp
        // 단계 번호 재정렬
        return newData.map((item, index) => ({ ...item, 단계: index + 1 }))
      }
      return prev
    })
  }

  const moveStepDown = (id: string) => {
    setStepData(prev => {
      const currentIndex = prev.findIndex(item => item.id === id)
      if (currentIndex < prev.length - 1) {
        const newData = [...prev]
        const temp = newData[currentIndex]
        newData[currentIndex] = newData[currentIndex + 1]
        newData[currentIndex + 1] = temp
        // 단계 번호 재정렬
        return newData.map((item, index) => ({ ...item, 단계: index + 1 }))
      }
      return prev
    })
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>절차 단계</h3>
        <button onClick={handleAddStep} className="btn-primary">
          + 단계 추가
        </button>
      </div>

      {/* 새 단계 입력 폼 */}
      <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>단계</label>
            <input
              type="number"
              value={newStep.단계}
              onChange={(e) => setNewStep(prev => ({ ...prev, 단계: parseInt(e.target.value) || 1 }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              disabled
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>단계명</label>
            <input
              type="text"
              value={newStep.단계명}
              onChange={(e) => setNewStep(prev => ({ ...prev, 단계명: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="단계명"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>수행내용</label>
            <input
              type="text"
              value={newStep.수행내용}
              onChange={(e) => setNewStep(prev => ({ ...prev, 수행내용: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="수행내용"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>담당자</label>
            <input
              type="text"
              value={newStep.담당자}
              onChange={(e) => setNewStep(prev => ({ ...prev, 담당자: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="담당자"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>소요시간</label>
            <input
              type="text"
              value={newStep.소요시간}
              onChange={(e) => setNewStep(prev => ({ ...prev, 소요시간: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="소요시간"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>산출물</label>
            <input
              type="text"
              value={newStep.산출물}
              onChange={(e) => setNewStep(prev => ({ ...prev, 산출물: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="산출물"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>비고</label>
            <input
              type="text"
              value={newStep.비고}
              onChange={(e) => setNewStep(prev => ({ ...prev, 비고: e.target.value }))}
              className="input-field"
              style={{ fontSize: '0.875rem' }}
              placeholder="비고"
            />
          </div>
        </div>
        <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
          <button onClick={handleAddStep} className="btn-primary" style={{ fontSize: '0.875rem' }}>
            추가
          </button>
        </div>
      </div>

      {/* 절차 단계 테이블 */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ minWidth: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead style={{ backgroundColor: '#f9fafb' }}>
            <tr>
              <th className="table-header" style={{ width: '3rem' }}>작업</th>
              <th className="table-header" style={{ width: '4rem' }}>단계</th>
              <th className="table-header">단계명</th>
              <th className="table-header">수행내용</th>
              <th className="table-header">담당자</th>
              <th className="table-header">소요시간</th>
              <th className="table-header">산출물</th>
              <th className="table-header">비고</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'white' }}>
            {stepData.map((item, index) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td className="table-cell">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <button
                      onClick={() => moveStepUp(item.id)}
                      disabled={index === 0}
                      style={{ 
                        color: index === 0 ? '#9ca3af' : '#374151', 
                        fontSize: '0.75rem',
                        cursor: index === 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveStepDown(item.id)}
                      disabled={index === stepData.length - 1}
                      style={{ 
                        color: index === stepData.length - 1 ? '#9ca3af' : '#374151', 
                        fontSize: '0.75rem',
                        cursor: index === stepData.length - 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => handleDeleteStep(item.id)}
                      style={{ color: '#ef4444', fontSize: '0.75rem' }}
                    >
                      삭제
                    </button>
                  </div>
                </td>
                <td className="table-cell" style={{ textAlign: 'center', fontWeight: '600' }}>
                  {item.단계}
                </td>
                <td className="table-cell">
                  <input
                    type="text"
                    value={item.단계명}
                    onChange={(e) => handleInputChange(item.id, '단계명', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
                <td className="table-cell">
                  <textarea
                    value={item.수행내용}
                    onChange={(e) => handleInputChange(item.id, '수행내용', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent', resize: 'vertical' }}
                    rows={2}
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
                <td className="table-cell">
                  <input
                    type="text"
                    value={item.소요시간}
                    onChange={(e) => handleInputChange(item.id, '소요시간', e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.875rem', border: 'none', backgroundColor: 'transparent' }}
                  />
                </td>
                <td className="table-cell">
                  <input
                    type="text"
                    value={item.산출물}
                    onChange={(e) => handleInputChange(item.id, '산출물', e.target.value)}
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

      {stepData.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          절차 단계가 없습니다. + 단계 추가 버튼을 클릭하여 단계를 추가하세요.
        </div>
      )}
    </div>
  )
}
