import { useInView } from '../../../hooks/useInView'
import type { CSSProperties, ElementType, ReactNode } from 'react'

type RevealKind = 'up' | 'left' | 'right' | 'scale' | 'fade'

const kindClass: Record<RevealKind, string> = {
  up:    'reveal',
  left:  'reveal-l',
  right: 'reveal-r',
  scale: 'reveal-scale',
  fade:  'reveal-fade',
}

interface RevealProps {
  children: ReactNode
  kind?: RevealKind
  delay?: number
  className?: string
  style?: CSSProperties
  as?: keyof React.JSX.IntrinsicElements
}

export const Reveal = ({
  children,
  kind = 'up',
  delay = 0,
  className = '',
  style,
  as,
}: RevealProps) => {
  const [ref, seen] = useInView()
  const cls = kindClass[kind]
  const Tag = (as ?? 'div') as ElementType

  return (
    <Tag
      ref={ref}
      className={`${cls}${seen ? ' visible' : ''} ${className}`}
      style={{ animationDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  )
}
