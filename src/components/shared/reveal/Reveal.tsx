import { useInView } from '../../../hooks/useInView'

type RevealKind = 'up' | 'left' | 'right' | 'scale' | 'fade'

const kindClass: Record<RevealKind, string> = {
  up:    'reveal',
  left:  'reveal-l',
  right: 'reveal-r',
  scale: 'reveal-scale',
  fade:  'reveal-fade',
}

interface RevealProps {
  children: React.ReactNode
  kind?: RevealKind
  delay?: number
  className?: string
  style?: React.CSSProperties
  as?: keyof React.JSX.IntrinsicElements
}

export const Reveal = ({
  children,
  kind = 'up',
  delay = 0,
  className = '',
  style,
  as: Tag = 'div',
}: RevealProps) => {
  const [ref, seen] = useInView()
  const cls = kindClass[kind]

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${cls}${seen ? ' visible' : ''} ${className}`}
      style={{ animationDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  )
}
