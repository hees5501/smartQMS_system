'use client'

import { useState, useEffect } from 'react'
import { ManualData, DocumentType } from '../page'
import FileAttachmentComponent from './FileAttachmentComponent'

interface ManualBasicInfoAreaProps {
  selectedManual: ManualData | null
  documentType?: DocumentType
}

interface BasicInfoFormData {
  구분: string
  문서번호: string
  주관부서: string
  제정일자: string
  목적: string
  적용범위: string[]
  분야: string
  표준명: string
  Rev: number
  개정일자: string
  적용사업: string
  프로세스관련번호: string
}

export default function ManualBasicInfoArea({ selectedManual, documentType = 'manual' }: ManualBasicInfoAreaProps) {
  const [formData, setFormData] = useState<BasicInfoFormData>({
    구분: '매뉴얼',
    문서번호: '',
    주관부서: '',
    제정일자: '',
    목적: '',
    적용범위: [],
    분야: '',
    표준명: '',
    Rev: 1,
    개정일자: '',
    적용사업: '',
    프로세스관련번호: ''
  })

  const [isEditing, setIsEditing] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  // 선택된 매뉴얼이 변경될 때 폼 데이터 업데이트
  useEffect(() => {
    if (selectedManual) {
      setFormData({
        구분: selectedManual.구분,
        문서번호: selectedManual.문서번호,
        주관부서: '',
        제정일자: selectedManual.제정일자,
        목적: '',
        적용범위: [],
        분야: '',
        표준명: selectedManual.표준명,
        Rev: selectedManual.Rev,
        개정일자: selectedManual.개정일자,
        적용사업: '',
        프로세스관련번호: ''
      })
      setIsEditing(false)
    }
  }, [selectedManual])

  const handleInputChange = (field: keyof BasicInfoFormData, value: string | string[] | number) => {
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
    // 여기서 실제 저장 로직을 구현
    console.log('저장할 데이터:', formData)
    setSaveMessage('저장되었습니다.')
    setIsEditing(false)
    
    // 3초 후 메시지 숨기기
    setTimeout(() => setSaveMessage(''), 3000)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // 원래 데이터로 복원
    if (selectedManual) {
      setFormData({
        구분: selectedManual.구분,
        문서번호: selectedManual.문서번호,
        주관부서: '',
        제정일자: selectedManual.제정일자,
        목적: '',
        적용범위: [],
        분야: '',
        표준명: selectedManual.표준명,
        Rev: selectedManual.Rev,
        개정일자: selectedManual.개정일자,
        적용사업: '',
        프로세스관련번호: ''
      })
    }
  }

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
            {documentType === 'manual' ? '매뉴얼' : 
             documentType === 'guide' ? '지침' :
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {/* 좌측 필드 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                문서번호 <span className="text-red-500">*</span>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                제정일자 <span className="text-red-500">*</span>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                적용범위
              </label>
              <div className="space-y-2">
                {['전사', '생산본부', '인천공장'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.적용범위.includes(option)}
                      onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                      disabled={!isEditing}
                      className="rounded mr-2"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 우측 필드 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                <option value="환경관리">환경관리</option>
                <option value="안전보건">안전보건</option>
                <option value="정보보안">정보보안</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                표준명 <span className="text-red-500">*</span>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rev
              </label>
              <input
                type="number"
                value={formData.Rev}
                onChange={(e) => handleInputChange('Rev', parseInt(e.target.value) || 1)}
                disabled={!isEditing}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                개정일자 <span className="text-red-500">*</span>
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                첨부
              </label>
              <FileAttachmentComponent disabled={!isEditing} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                적용사업
              </label>
              <div className="space-y-2">
                {['AUTO', 'IND'].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="적용사업"
                      value={option}
                      checked={formData.적용사업 === option}
                      onChange={(e) => handleInputChange('적용사업', e.target.value)}
                      disabled={!isEditing}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
        </div>
      </div>
    </div>
  )
}
