'use client'

import { useState } from 'react'

interface GuideWorkInstructionTabProps {
  isEditing?: boolean
}

export default function GuideWorkInstructionTab({ isEditing = false }: GuideWorkInstructionTabProps) {
  const [content, setContent] = useState(`
    <h2>업무지침</h2>
    <p>이 지침서는 특정 업무를 수행하는 가장 상세하고 구체적인 방법을 기술합니다.</p>
    
    <h3>1. 목적</h3>
    <p>본 지침서는 업무 수행의 일관성과 품질을 보장하기 위해 작성되었습니다.</p>
    
    <h3>2. 적용범위</h3>
    <ul>
      <li>전체 직원</li>
      <li>관련 부서</li>
    </ul>
    
    <h3>3. 업무 절차</h3>
    <ol>
      <li>업무 시작 전 준비사항 확인</li>
      <li>업무 수행</li>
      <li>결과 검토</li>
      <li>보고서 작성</li>
    </ol>
    
    <h3>4. 주의사항</h3>
    <p>업무 수행 시 다음 사항을 주의하세요:</p>
    <ul>
      <li>안전수칙 준수</li>
      <li>품질기준 충족</li>
      <li>문서화 의무</li>
    </ul>
  `)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleSave = () => {
    console.log('저장할 내용:', content)
    alert('업무지침이 저장되었습니다.')
  }

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>업무지침</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleSave} className="btn-primary">
            저장
          </button>
        </div>
      </div>

      {/* 위지윅 에디터 영역 */}
      <div style={{ 
        border: '1px solid #d1d5db', 
        borderRadius: '0.5rem', 
        overflow: 'hidden',
        backgroundColor: 'white'
      }}>
        {/* 툴바 */}
        <div style={{ 
          backgroundColor: '#f9fafb', 
          padding: '0.75rem', 
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap'
        }}>
          <button 
            style={{ 
              padding: '0.25rem 0.5rem', 
              fontSize: '0.875rem', 
              backgroundColor: 'white', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            title="굵게"
          >
            <strong>B</strong>
          </button>
          <button 
            style={{ 
              padding: '0.25rem 0.5rem', 
              fontSize: '0.875rem', 
              backgroundColor: 'white', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            title="기울임"
          >
            <em>I</em>
          </button>
          <button 
            style={{ 
              padding: '0.25rem 0.5rem', 
              fontSize: '0.875rem', 
              backgroundColor: 'white', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            title="밑줄"
          >
            <u>U</u>
          </button>
          <div style={{ width: '1px', backgroundColor: '#e5e7eb', margin: '0 0.25rem' }}></div>
          <button 
            style={{ 
              padding: '0.25rem 0.5rem', 
              fontSize: '0.875rem', 
              backgroundColor: 'white', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            title="제목 1"
          >
            H1
          </button>
          <button 
            style={{ 
              padding: '0.25rem 0.5rem', 
              fontSize: '0.875rem', 
              backgroundColor: 'white', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            title="제목 2"
          >
            H2
          </button>
          <button 
            style={{ 
              padding: '0.25rem 0.5rem', 
              fontSize: '0.875rem', 
              backgroundColor: 'white', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            title="제목 3"
          >
            H3
          </button>
          <div style={{ width: '1px', backgroundColor: '#e5e7eb', margin: '0 0.25rem' }}></div>
          <button 
            style={{ 
              padding: '0.25rem 0.5rem', 
              fontSize: '0.875rem', 
              backgroundColor: 'white', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            title="번호 목록"
          >
            📋
          </button>
          <button 
            style={{ 
              padding: '0.25rem 0.5rem', 
              fontSize: '0.875rem', 
              backgroundColor: 'white', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            title="기호 목록"
          >
            • 목록
          </button>
          <div style={{ width: '1px', backgroundColor: '#e5e7eb', margin: '0 0.25rem' }}></div>
          <button 
            style={{ 
              padding: '0.25rem 0.5rem', 
              fontSize: '0.875rem', 
              backgroundColor: 'white', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            title="이미지 삽입"
          >
            🖼️
          </button>
          <button 
            style={{ 
              padding: '0.25rem 0.5rem', 
              fontSize: '0.875rem', 
              backgroundColor: 'white', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            title="표 삽입"
          >
            📊
          </button>
        </div>

        {/* 에디터 영역 */}
        <div style={{ position: 'relative' }}>
          <textarea
            value={content}
            onChange={handleContentChange}
            disabled={!isEditing}
            style={{
              width: '100%',
              minHeight: '400px',
              padding: '1rem',
              border: 'none',
              outline: 'none',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            placeholder="업무지침 내용을 입력하세요..."
          />
        </div>
      </div>

      {/* 미리보기 영역 */}
      <div style={{ marginTop: '1rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>미리보기</h4>
        <div 
          style={{ 
            border: '1px solid #e5e7eb', 
            borderRadius: '0.5rem', 
            padding: '1rem', 
            backgroundColor: '#f9fafb',
            minHeight: '200px',
            fontSize: '0.875rem',
            lineHeight: '1.5'
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  )
}
