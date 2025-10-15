'use client'

import { useState, useEffect } from 'react'
import { DocumentType } from '../page'
import { ProcessData, ProcessBasicInfoFormData } from '../types/ProcessData'
import FileAttachmentComponent from './FileAttachmentComponent'

interface ProcessBasicInfoAreaProps {
  selectedProcess: ProcessData | null
  documentType?: DocumentType
}

export default function ProcessBasicInfoArea({ selectedProcess, documentType = 'process' }: ProcessBasicInfoAreaProps) {
  const [formData, setFormData] = useState<ProcessBasicInfoFormData>({
    구분: '프로세스',
    분야: '',
    프로세스명: '',
    영문프로세스명: '',
    문서번호: '',
    Rev: 1,
    개정부서: '',
    ST: '',
    제정일자: '',
    개정일자: '',
    목적: '',
    적용범위: [],
    적용사업: '',
    프로세스관련번호: ''
  })

  const [isEditing, setIsEditing] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  // 선택된 프로세스가 변경될 때 폼 데이터 업데이트
  useEffect(() => {
    if (selectedProcess) {
      setFormData({
        구분: selectedProcess.구분,
        분야: selectedProcess.분야,
        프로세스명: selectedProcess.프로세스명,
        영문프로세스명: '',
        문서번호: selectedProcess.문서번호,
        Rev: selectedProcess.Rev,
        개정부서: '',
        ST: '',
        제정일자: selectedProcess.제정일자,
        개정일자: selectedProcess.개정일자,
        목적: '',
        적용범위: [],
        적용사업: '',
        프로세스관련번호: ''
      })
      setIsEditing(false)
    }
  }, [selectedProcess])

  const handleInputChange = (field: keyof ProcessBasicInfoFormData, value: string | string[] | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      적용범위: checked 
        ? [...prev.적용범위, value]
        : prev.적용범위.filter(item => item !== value)
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
    if (selectedProcess) {
      setFormData({
        구분: selectedProcess.구분,
        분야: selectedProcess.분야,
        프로세스명: selectedProcess.프로세스명,
        영문프로세스명: '',
        문서번호: selectedProcess.문서번호,
        Rev: selectedProcess.Rev,
        개정부서: '',
        ST: '',
        제정일자: selectedProcess.제정일자,
        개정일자: selectedProcess.개정일자,
        목적: '',
        적용범위: [],
        적용사업: '',
        프로세스관련번호: ''
      })
    }
  }

  if (!selectedProcess) {
    return (
      <div style={{ backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', borderBottom: '1px solid #e5e7eb', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <p style={{ fontSize: '1.125rem' }}>목록에서 프로세스를 선택하세요</p>
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
            {documentType === 'manual' ? '매뉴얼' : 
             documentType === 'process' ? '프로세스' :
             documentType === 'procedure' ? '절차' : '문서'} 기본 정보
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
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
              <option value="품질관리">품질관리</option>
              <option value="생산관리">생산관리</option>
              <option value="환경관리">환경관리</option>
              <option value="안전보건">안전보건</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              프로세스명 <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.프로세스명}
              onChange={(e) => handleInputChange('프로세스명', e.target.value)}
              disabled={!isEditing}
              className="input-field"
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              영문 프로세스명
            </label>
            <input
              type="text"
              value={formData.영문프로세스명}
              onChange={(e) => handleInputChange('영문프로세스명', e.target.value)}
              disabled={!isEditing}
              className="input-field"
            />
          </div>
        </div>

        {/* 2행 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
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
              Rev
            </label>
            <input
              type="number"
              value={formData.Rev}
              onChange={(e) => handleInputChange('Rev', parseInt(e.target.value) || 1)}
              disabled={true}
              className="input-field"
              style={{ backgroundColor: '#f3f4f6' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              개정부서
            </label>
            <input
              type="text"
              value={formData.개정부서}
              onChange={(e) => handleInputChange('개정부서', e.target.value)}
              disabled={!isEditing}
              className="input-field"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              S&T
            </label>
            <input
              type="text"
              value={formData.ST}
              onChange={(e) => handleInputChange('ST', e.target.value)}
              disabled={!isEditing}
              className="input-field"
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
        <div style={{ marginBottom: '1rem' }}>
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

        {/* 4행 */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>
              적용범위
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['전사', '생산본부', '부산공장', '인천사무소'].map((option) => (
                <label key={option} style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={formData.적용범위.includes(option)}
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
              {['AUTO', 'IND'].map((option) => (
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
              disabled={true}
              className="input-field"
              style={{ backgroundColor: '#f3f4f6' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
