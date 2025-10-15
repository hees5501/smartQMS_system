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
    } else {
      // 선택된 매뉴얼이 없을 때 초기화
      setFormData({
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
    }
    setIsEditing(false)
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
    // 실제 구현에서는 API 호출
    console.log('저장할 데이터:', formData)
    setIsEditing(false)
    alert('저장되었습니다.')
  }

  const handleCancel = () => {
    // 원래 데이터로 복원
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
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const 분야옵션 = ['품질관리', '환경관리', '안전보건', '정보보안', '에너지관리']
  const 적용범위옵션 = ['전사', '생산본부', '인천공장', '서울사무소', '연구개발센터']
  const 적용사업옵션 = ['AUTO', 'IND']

  return (
    <div style={{ backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)', borderBottom: '1px solid #e5e7eb' }}>
      {/* 헤더 */}
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
            매뉴얼 기본 정보
          </h2>
          
          {/* 액션 버튼들 */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {isEditing ? (
              <>
                <button 
                  className="btn-primary" 
                  style={{ fontSize: '0.875rem' }}
                  onClick={handleSave}
                >
                  저장
                </button>
                <button 
                  className="btn-secondary" 
                  style={{ fontSize: '0.875rem' }}
                  onClick={handleCancel}
                >
                  취소
                </button>
              </>
            ) : (
              <button 
                className="btn-secondary" 
                style={{ fontSize: '0.875rem' }}
                onClick={handleEdit}
                disabled={!selectedManual}
              >
                수정
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 폼 영역 */}
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* 좌측 필드 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* 구분 */}
            <div>
              <label className="form-label">구분</label>
              <input
                type="text"
                value={formData.구분}
                disabled
                className="input-field"
                style={{ backgroundColor: '#f9fafb', color: '#6b7280' }}
              />
            </div>

            {/* 문서번호 */}
            <div>
              <label className="form-label">
                문서번호 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                value={formData.문서번호}
                onChange={(e) => handleInputChange('문서번호', e.target.value)}
                disabled={!isEditing}
                className="input-field"
                placeholder="예: QM-001"
              />
            </div>

            {/* 주관부서 */}
            <div>
              <label className="form-label">주관부서</label>
              <input
                type="text"
                value={formData.주관부서}
                onChange={(e) => handleInputChange('주관부서', e.target.value)}
                disabled={!isEditing}
                className="input-field"
                placeholder="예: 품질관리팀"
              />
            </div>

            {/* 제정일자 */}
            <div>
              <label className="form-label">
                제정일자 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="date"
                value={formData.제정일자}
                onChange={(e) => handleInputChange('제정일자', e.target.value)}
                disabled={!isEditing}
                className="input-field"
              />
            </div>

            {/* 목적 */}
            <div>
              <label className="form-label">목적</label>
              <textarea
                value={formData.목적}
                onChange={(e) => handleInputChange('목적', e.target.value)}
                disabled={!isEditing}
                className="input-field"
                rows={3}
                placeholder="매뉴얼의 목적을 입력하세요"
              />
            </div>

            {/* 적용범위 */}
            <div>
              <label className="form-label">적용범위</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {적용범위옵션.map((option) => (
                  <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.적용범위체크.includes(option)}
                      onChange={(e) => handleCheckboxChange(option, e.target.checked)}
                      disabled={!isEditing}
                      style={{ borderRadius: '0.25rem' }}
                    />
                    <span style={{ fontSize: '0.875rem', color: '#374151' }}>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 우측 필드 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* 분야 */}
            <div>
              <label className="form-label">분야</label>
              <select
                value={formData.분야}
                onChange={(e) => handleInputChange('분야', e.target.value)}
                disabled={!isEditing}
                className="input-field"
              >
                <option value="">분야를 선택하세요</option>
                {분야옵션.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* 표준명 */}
            <div>
              <label className="form-label">
                표준명 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                value={formData.표준명}
                onChange={(e) => handleInputChange('표준명', e.target.value)}
                disabled={!isEditing}
                className="input-field"
                placeholder="예: 품질경영시스템 매뉴얼"
              />
            </div>

            {/* Rev */}
            <div>
              <label className="form-label">Rev</label>
              <input
                type="number"
                value={formData.Rev}
                onChange={(e) => handleInputChange('Rev', parseInt(e.target.value) || 1)}
                disabled
                className="input-field"
                style={{ backgroundColor: '#f9fafb', color: '#6b7280' }}
              />
            </div>

            {/* 개정일자 */}
            <div>
              <label className="form-label">
                개정일자 <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="date"
                value={formData.개정일자}
                onChange={(e) => handleInputChange('개정일자', e.target.value)}
                disabled={!isEditing}
                className="input-field"
              />
            </div>

            {/* 첨부 */}
            <div>
              <label className="form-label">첨부</label>
              <FileAttachmentComponent disabled={!isEditing} />
            </div>

            {/* 적용사업 */}
            <div>
              <label className="form-label">적용사업</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {적용사업옵션.map((option) => (
                  <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="radio"
                      name="적용사업"
                      value={option}
                      checked={formData.적용사업 === option}
                      onChange={(e) => handleInputChange('적용사업', e.target.value)}
                      disabled={!isEditing}
                    />
                    <span style={{ fontSize: '0.875rem', color: '#374151' }}>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 프로세스관련번호 */}
            <div>
              <label className="form-label">프로세스관련번호</label>
              <input
                type="text"
                value={formData.프로세스관련번호}
                onChange={(e) => handleInputChange('프로세스관련번호', e.target.value)}
                disabled={!isEditing}
                className="input-field"
                placeholder="예: PROC-001"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}