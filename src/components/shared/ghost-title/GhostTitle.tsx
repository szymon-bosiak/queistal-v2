import { useEffect, useRef } from 'react'

interface GhostTitleProps {
  text: string
  /** which horizontal edge the text bleeds out of */
  side?: 'left' | 'right'
  /** vertical anchor within the section */
  top?: string
  /** 'sage' for dark sections, 'ink' for light ones */
  tone?: 'sage' | 'ink'
}

/**
 * Huge outlined watermark behind a section, drifting slowly against the
 * scroll (parallax). Parent section must be position:relative + overflow:hidden.
 */
export const GhostTitle = ({ text, side = 'right', top = '8%', tone = 'sage' }: GhostTitleProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const el = ref.current
      const parent = el?.parentElement
      if (!el || !parent) return
      const r = parent.getBoundingClientRect()
      // 0 when the section enters the viewport bottom, 1 when it leaves the top
      const p = (window.innerHeight - r.top) / (window.innerHeight + r.height)
      el.style.transform = `translateY(${(0.5 - Math.min(Math.max(p, 0), 1)) * 140}px)`
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'absolute',
        top,
        [side]: '-1.5rem',
        fontSize: 'clamp(90px,14vw,210px)',
        fontWeight: 500,
        lineHeight: 1,
        textTransform: 'uppercase',
        color: 'transparent',
        WebkitTextStroke: tone === 'sage'
          ? '1px rgba(227,235,212,.05)'
          : '1px rgba(10,13,18,.07)',
        letterSpacing: -2,
        whiteSpace: 'nowrap',
        userSelect: 'none',
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      {text}
    </div>
  )
}
