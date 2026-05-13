export const TechSvg = () => (
  <svg
    viewBox="0 0 600 400"
    fill="none"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18, pointerEvents: 'none' }}
  >
    <style>{`
      .dl  { stroke: rgba(40,37,34,1); stroke-width: .8; stroke-dasharray: 600; animation: drawLine 4s linear infinite; }
      .dl2 { stroke: rgba(40,37,34,1); stroke-width: .6; stroke-dasharray: 400; animation: drawLine 6s 1s linear infinite; }
      .spin { transform-origin: 300px 200px; animation: rotateSlow 20s linear infinite; }
    `}</style>
    <line x1="60"  y1="200" x2="540" y2="200" className="dl" />
    <line x1="300" y1="40"  x2="300" y2="360" className="dl" />
    <circle cx="300" cy="200" r="120" stroke="rgba(40,37,34,1)" strokeWidth=".8" strokeDasharray="8 6" className="spin" />
    <circle cx="300" cy="200" r="70"  stroke="rgba(40,37,34,1)" strokeWidth=".6" strokeDasharray="4 8" />
    <line x1="180" y1="80"  x2="420" y2="320" className="dl2" />
    <line x1="420" y1="80"  x2="180" y2="320" className="dl2" />
    {([[60,40],[540,40],[60,360],[540,360]] as [number,number][]).map(([x,y],i) => (
      <g key={i}>
        <line x1={x} y1={y} x2={x + (x < 300 ? 12 : -12)} y2={y} stroke="rgba(40,37,34,1)" strokeWidth="1" />
        <line x1={x} y1={y} x2={x} y2={y + (y < 200 ? 12 : -12)} stroke="rgba(40,37,34,1)" strokeWidth="1" />
      </g>
    ))}
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i * 30 * Math.PI) / 180
      const r = 120, cx = 300, cy = 200
      return (
        <line
          key={i}
          x1={cx + r * Math.cos(a)} y1={cy + r * Math.sin(a)}
          x2={cx + (r + 10) * Math.cos(a)} y2={cy + (r + 10) * Math.sin(a)}
          stroke="rgba(40,37,34,1)" strokeWidth=".8"
        />
      )
    })}
  </svg>
)
