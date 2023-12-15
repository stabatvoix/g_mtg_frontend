import React, { useState, useRef, useEffect, Suspense } from 'react'
import ReactMarkdown from 'react-markdown'
const MDEditor = React.lazy(() => import('@uiw/react-md-editor'))
interface EditableMarkdownProps {
  text: string
  onSave: (text: string) => void
}
const EditableMarkdown: React.FC<EditableMarkdownProps> = ({
  text,
  onSave,
}) => {
  const [isEditing, setEditing] = useState(false)
  const [content, setContent] = useState<string>(text)
  const [markdown, setMarkdown] = useState<string>(text)
  const [isHovered, setHovered] = useState(false)

  const markdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        markdownRef.current &&
        !markdownRef.current.contains(event.target as Node)
      ) {
        setEditing(false)
        setHovered(false)
        setMarkdown(content)
        onSave(content)
      }
    }

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isEditing, content])

  const handleEdit = () => {
    setEditing(true)
  }

  const handleChange = (value?: string) => {
    setContent(value || '')
  }

  return (
    <div
      ref={markdownRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isEditing ? (
        <div>
          <MDEditor
            data-color-mode={'light'}
            value={content}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div
          style={{
            boxShadow: isHovered ? '0 0 0 1px #d9d9d9' : 'none',
            cursor: 'pointer',
            borderRadius: '6px',
          }}
          onClick={handleEdit}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Suspense>
        </div>
      )}
    </div>
  )
}

export default EditableMarkdown
