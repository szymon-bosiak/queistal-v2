import { useInView } from '../../../hooks/useInView'

interface WordRevealProps {
  text: string
  delay?: number
  step?: number
  style?: React.CSSProperties
}

export const WordReveal = ({ text, delay = 0, step = 80, style }: WordRevealProps) => {
  const [ref, seen] = useInView()
  const words = text.split(' ')

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} style={{ display: 'inline-block' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '.25em' }}>
          <span
            style={{
              display: 'inline-block',
              transform: seen ? 'translateY(0)' : 'translateY(110%)',
              opacity: seen ? 1 : 0,
              transition: `transform .8s ${i * step + delay}ms var(--ease), opacity .8s ${i * step + delay}ms var(--ease)`,
              ...style,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  )
}
