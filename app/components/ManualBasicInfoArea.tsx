'use client'

import { useState, useEffect } from 'react'
import { ManualData, ManualBasicInfoFormData } from '../types/ManualData'
import FileAttachmentComponent from './FileAttachmentComponent'

interface ManualBasicInfoAreaProps {
  selectedManual: ManualData | null
}

export default function ManualBasicInfoArea({ selectedManual }: ManualBasicInfoAreaProps) {
  const [formData, setFormData] = useState<ManualBasicInfoFormData>({
    구분: '매뉴얼',
    분야: '',
    표준명: '',
    문서번호: '',
    주관부서: '',
    Rev: 1,
    제정일자: '',
    개정일자: '',
    목적: '',
    적용범위: '',
    적용범위체크: [],
    적용사업: '',
    프로세스관련번호: ''
  })

  const [isEditing, setIsEditing] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  // 선택된 매뉴얼이 변경될 때 폼 데이터 업데이트
  useEffect(() => {
    if (selectedManual) {
      setFormData({
        구분: '매뉴얼',
        분야: selectedManual.분야,
        표준명: selectedManual.표준명,
        문서번호: selectedManual.문서번호,
        주관부서: '',
        Rev: selectedManual.Rev,
        제정일자: selectedManual.제정일자,
        개정일자: selectedManual.개정일자,
        목적: '',
        적용범위: '',
        적용범위체크: [],
        적용사업: '',
        프로세스관련번호: ''
      })
      setIsEditing(false)
    }
  }, [selectedManual])

  const handleInputChange = (field: keyof ManualBasicInfoFormData, value: string | number | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      적용범위체크: checked 
        ? [...prev.적용범위체크, value]
        : prev.적용범위체크.filter(item => item !== value)
    }))
  }

  const handleSave = () => {
    console.log('저장할 데이터:', formData)
    setSaveMessage('저장되었습니다.')
    setIsEditing(false)
    
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    if (selectedManual) {
      setFormData({
        구분: '매뉴얼',
        분야: selectedManual.분야,
        표준명: selectedManual.표준명,
        문서번호: selectedManual.문서번호,
        주관부서: '',
        Rev: selectedManual.Rev,
        제정일자: selectedManual.제정일자,
        개정일자: selectedManual.개정일자,
        목적: '',
        적용범위: '',
        적용범위체크: [],
        적용사업: '',
        프로세스관련번호: ''
      })
    }
  }

  const 분야옵션 = ['품질관리', '환경관리', '안전보건', '정보보안', '에너지관리']
  const 적용범위옵션 = ['전사', '생산본부', '인천공장', '서울사무소', '연구개발센터']
  const 적용사업옵션 = ['AUTO', 'IND']

  if (!selectedManual) {
    return (
      <div style={{ backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', borderBottom: '1px solid #e5e7eb', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <p style={{ fontSize: '1.125rem' }}>목록에서 매뉴얼을 선택하세요</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', borderBottom: '1px solid #e5e7eb', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* 헤더 */}
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
            매뉴얼 기본 정보
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {!isEditing ? (
              <button onClick={handleEdit} className="btn-primary">
                수정
              </button>
            ) : (
              <>
                <button onClick={handleSave} className="btn-primary">
                  저장
                </button>
                <button onClick={handleCancel} className="btn-secondary">
                  취소
                </button>
              </>
            )}
          </div>
        </div>
        {saveMessage && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#059669' }}>
            {saveMessage}
          </div>
        )}
      </div>

      {/* 폼 내용 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
        {/* 1행 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              구분 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.구분}
              disabled
              className="input-field"
              style={{ backgroundColor: '#f3f4f6' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              분야
            </label>
            <select
              value={formData.분야}
              onChange={(e) => handleInputChange('분야', e.target.value)}
              disabled={!isEditing}
              className="input-field"
            >
              <option value="">선택하세요</option>
              {분야옵션.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              표준명 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.표준명}
              onChange={(e) => handleInputChange('표준명', e.target.value)}
              disabled={!isEditing}
              className="input-field"
              required
            />
          </div>
        </div>

        {/* 2행 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              문서번호 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.문서번호}
              onChange={(e) => handleInputChange('문서번호', e.target.value)}
              disabled={!isEditing}
              className="input-field"
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              주관부서
            </label>
            <input
              type="text"
              value={formData.주관부서}
              onChange={(e) => handleInputChange('주관부서', e.target.value)}
              disabled={!isEditing}
              className="input-field"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              Rev
            </label>
            <input
              type="number"
              value={formData.Rev}
              onChange={(e) => handleInputChange('Rev', parseInt(e.target.value) || 1)}
              disabled
              className="input-field"
              style={{ backgroundColor: '#f3f4f6' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              제정일자 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="date"
              value={formData.제정일자}
              onChange={(e) => handleInputChange('제정일자', e.target.value)}
              disabled={!isEditing}
              className="input-field"
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              개정일자 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="date"
              value={formData.개정일자}
              onChange={(e) => handleInputChange('개정일자', e.target.value)}
              disabled={!isEditing}
              className="input-field"
              required
            />
          </div>
        </div>

        {/* 3행 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              목적
            </label>
            <textarea
              value={formData.목적}
              onChange={(e) => handleInputChange('목적', e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="input-field"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              적용범위
            </label>
            <textarea
              value={formData.적용범위}
              onChange={(e) => handleInputChange('적용범위', e.target.value)}
              disabled={!isEditing}
              rows={3}
              className="input-field"
            />
          </div>
        </div>

        {/* 4행 */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              적용범위 (체크박스)
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {적용범위옵션.map((option) => (
                <label key={option} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={formData.적용범위체크.includes(option)}
                    onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                    disabled={!isEditing}
                    style={{ borderRadius: '0.25rem', marginRight: '0.5rem' }}
                  />
                  <span style={{ fontSize: '0.875rem', color: '#374151' }}>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              적용사업
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {적용사업옵션.map((option) => (
                <label key={option} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="radio"
                    name="적용사업"
                    value={option}
                    checked={formData.적용사업 === option}
                    onChange={(e) => handleInputChange('적용사업', e.target.value)}
                    disabled={!isEditing}
                    style={{ marginRight: '0.5rem' }}
                  />
                  <span style={{ fontSize: '0.875rem', color: '#374151' }}>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              프로세스관련번호
            </label>
            <input
              type="text"
              value={formData.프로세스관련번호}
              onChange={(e) => handleInputChange('프로세스관련번호', e.target.value)}
              disabled={!isEditing}
              className="input-field"
            />
          </div>
        </div>

        {/* 첨부 */}
        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
            첨부
          </label>
          <FileAttachmentComponent disabled={!isEditing} />
        </div>
      </div>
    </div>
  )
}