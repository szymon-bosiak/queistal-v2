import { useState } from 'react'

interface FaqItemProps {
  question: string
  answer: string
  borderColor?: string
  color?: string
}

export const FaqItem = ({
  question,
  answer,
  borderColor = 'rgba(10,13,18,.18)',
  color = 'var(--ink)',
}: FaqItemProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderTop: `1px dashed ${borderColor}` }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 0',
          textAlign: 'left',
          gap: '2rem',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Oswald, sans-serif',
          color,
        }}
      >
        <span style={{ fontSize: 'clamp(16px,1.8vw,20px)', fontWeight: 400 }}>{question}</span>
        <span
          style={{
            fontSize: 22,
            fontWeight: 200,
            opacity: 0.45,
            flexShrink: 0,
            transform: open ? 'rotate(45deg)' : 'none',
            transition: 'transform .25s var(--ease)',
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>

      <div style={{ overflow: 'hidden', maxHeight: open ? '300px' : '0', transition: 'max-height .4s var(--ease)' }}>
        <p
          style={{
            fontSize: 'clamp(14px,1.3vw,17px)',
            fontWeight: 300,
            lineHeight: 1.8,
            opacity: 0.6,
            paddingBottom: '1.5rem',
            maxWidth: '70ch',
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  )
}
