'use client'

import { useState } from 'react'

interface Column {
  key: string
  label: string
  type: 'text' | 'textarea' | 'number' | 'date'
}

interface RowData {
  id: string
  [key: string]: string | number
}

interface DynamicDataTableProps {
  columns: Column[]
  initialData?: RowData[]
}

export default function DynamicDataTable({ columns, initialData = [] }: DynamicDataTableProps) {
  const [data, setData] = useState<RowData[]>(initialData)
  const [editingRow, setEditingRow] = useState<string | null>(null)
  const [editData, setEditData] = useState<RowData>({})

  const handleAddRow = () => {
    const newRow: RowData = {
      id: Date.now().toString(),
      ...columns.reduce((acc, col) => ({ ...acc, [col.key]: '' }), {})
    }
    setData(prev => [...prev, newRow])
    setEditingRow(newRow.id)
    setEditData(newRow)
  }

  const handleEditRow = (row: RowData) => {
    setEditingRow(row.id)
    setEditData({ ...row })
  }

  const handleSaveRow = () => {
    setData(prev => prev.map(row => 
      row.id === editingRow ? editData : row
    ))
    setEditingRow(null)
    setEditData({})
  }

  const handleCancelEdit = () => {
    setEditingRow(null)
    setEditData({})
  }

  const handleDeleteRow = (id: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      setData(prev => prev.filter(row => row.id !== id))
    }
  }

  const handleInputChange = (key: string, value: string | number) => {
    setEditData(prev => ({ ...prev, [key]: value }))
  }

  const renderCell = (row: RowData, column: Column) => {
    if (editingRow === row.id) {
      if (column.type === 'textarea') {
        return (
          <textarea
            value={editData[column.key] || ''}
            onChange={(e) => handleInputChange(column.key, e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            rows={2}
          />
        )
      } else if (column.type === 'number') {
        return (
          <input
            type="number"
            value={editData[column.key] || ''}
            onChange={(e) => handleInputChange(column.key, parseInt(e.target.value) || 0)}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          />
        )
      } else if (column.type === 'date') {
        return (
          <input
            type="date"
            value={editData[column.key] || ''}
            onChange={(e) => handleInputChange(column.key, e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          />
        )
      } else {
        return (
          <input
            type="text"
            value={editData[column.key] || ''}
            onChange={(e) => handleInputChange(column.key, e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
          />
        )
      }
    }
    
    return (
      <span className="text-sm text-gray-900">
        {row[column.key] || '-'}
      </span>
    )
  }

  return (
    <div className="space-y-4">
      {/* 추가 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={handleAddRow}
          className="btn-primary"
        >
          + 추가
        </button>
      </div>

      {/* 테이블 */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="table-header">
                  {column.label}
                </th>
              ))}
              <th className="table-header">작업</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4">
                    {renderCell(row, column)}
                  </td>
                ))}
                <td className="px-6 py-4">
                  {editingRow === row.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveRow}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        저장
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-600 hover:text-gray-800 text-sm"
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditRow(row)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteRow(row.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          데이터가 없습니다. + 추가 버튼을 클릭하여 데이터를 추가하세요.
        </div>
      )}
    </div>
  )
}
