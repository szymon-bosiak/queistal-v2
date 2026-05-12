import { useState } from 'react'

interface FaqItemProps {
  question: string
  answer: string
  isLast?: boolean
}

export const FaqItem = ({ question, answer, isLast = false }: FaqItemProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px dashed rgba(40,37,34,.22)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '1.5rem',
          padding: '1.5rem 0',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Oswald, sans-serif',
          color: 'var(--color-ink)', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 'clamp(16px,1.6vw,20px)', fontWeight: 400, lineHeight: 1.3 }}>
          {question}
        </span>
        <span style={{
          fontSize: 24, fontWeight: 200, lineHeight: 1, flexShrink: 0,
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform .25s var(--ease)',
          opacity: .5,
        }}>
          +
        </span>
      </button>

      <div style={{
        overflow: 'hidden',
        maxHeight: open ? '400px' : '0',
        transition: 'max-height .35s var(--ease)',
      }}>
        <p style={{
          fontSize: 'clamp(14px,1.2vw,17px)',
          fontWeight: 300,
          lineHeight: 1.8,
          opacity: .65,
          paddingBottom: '1.5rem',
        }}>
          {answer}
        </p>
      </div>
    </div>
  )
}
