import type { CSSProperties, ReactNode } from 'react'

interface CornerProps {
  pos: { top?: number; bottom?: number; left?: number; right?: number }
}

const Corner = ({ pos }: CornerProps) => {
  const sz = 18
  const style: CSSProperties = {
    position: 'absolute',
    width: sz,
    height: sz,
    borderColor: 'rgba(227,235,212,.3)',
    borderStyle: 'dashed',
    ...pos,
  }
  if (pos.top !== undefined && pos.left !== undefined)    style.borderWidth = '1px 0 0 1px'
  if (pos.top !== undefined && pos.right !== undefined)   style.borderWidth = '1px 1px 0 0'
  if (pos.bottom !== undefined && pos.left !== undefined) style.borderWidth = '0 0 1px 1px'
  if (pos.bottom !== undefined && pos.right !== undefined) style.borderWidth = '0 1px 1px 0'
  return <div style={style} />
}

interface BpBoxProps {
  children: ReactNode
  style?: CSSProperties
  className?: string
}

export const BpBox = ({ children, style, className }: BpBoxProps) => (
  <div className={className} style={{ position: 'relative', border: '1px dashed rgba(227,235,212,.2)', ...style }}>
    <Corner pos={{ top: -1, left: -1 }} />
    <Corner pos={{ top: -1, right: -1 }} />
    <Corner pos={{ bottom: -1, left: -1 }} />
    <Corner pos={{ bottom: -1, right: -1 }} />
    {children}
  </div>
)
