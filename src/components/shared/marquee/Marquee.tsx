import { Fragment } from 'react'

interface MarqueeProps {
  items: string[]
  /** 'sage' — sage strip with ink text (for dark pages); 'ink' — ink strip with sage text */
  tone?: 'sage' | 'ink'
  /** seconds for one full loop */
  duration?: number
}

/**
 * Infinite horizontal ticker. Content is rendered twice and translated by
 * -50%, so the loop is seamless; the base list is repeated to guarantee each
 * half is wider than any viewport.
 */
export const Marquee = ({ items, tone = 'sage', duration = 28 }: MarqueeProps) => {
  const half = Array.from({ length: 3 }, () => items).flat()
  const isSage = tone === 'sage'

  return (
    <div
      aria-hidden
      style={{
        background: isSage ? 'var(--sage)' : 'var(--ink)',
        color: isSage ? 'var(--ink)' : 'var(--sage)',
        borderTop: `1px dashed ${isSage ? 'rgba(40,37,34,.3)' : 'rgba(227,235,212,.25)'}`,
        borderBottom: `1px dashed ${isSage ? 'rgba(40,37,34,.3)' : 'rgba(227,235,212,.25)'}`,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '.85rem 0',
          animation: `marqueeX ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {[0, 1].map(copy => (
          <Fragment key={copy}>
            {half.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: 'clamp(13px,1.2vw,16px)',
                  fontWeight: 400,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ opacity: .85 }}>{item}</span>
                <span style={{ margin: '0 1.75rem', opacity: .35, fontWeight: 300 }}>//</span>
              </span>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
