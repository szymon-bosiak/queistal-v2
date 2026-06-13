interface TestimonialCardProps {
  initials: string
  name: string
  text: string
  fade: boolean
  onLight?: boolean
}

export const TestimonialCard = ({ initials, name, text, fade, onLight }: TestimonialCardProps) => (
  <div
    style={{
      background: onLight ? 'rgba(10,13,18,.06)' : 'rgba(255,255,255,.04)',
      border: `1px dashed ${onLight ? 'rgba(10,13,18,.18)' : 'rgba(255,255,255,.12)'}`,
      padding: 'clamp(2rem,4vw,3.5rem)',
      opacity: fade ? 1 : 0,
      transition: 'opacity .2s',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: 'clamp(1.5rem,3vw,3rem)',
      alignItems: 'start',
    }}
    className="tcard"
  >
    {/* Avatar */}
    <div
      style={{
        width: 68,
        height: 68,
        borderRadius: '50%',
        background: onLight ? 'rgba(10,13,18,.08)' : 'rgba(227,235,212,.1)',
        border: `1px solid ${onLight ? 'rgba(10,13,18,.18)' : 'rgba(255,255,255,.12)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 400,
        color: onLight ? 'var(--ink)' : 'var(--sage)',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>

    {/* Content */}
    <div>
      <div style={{ fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 400, marginBottom: '1rem' }}>
        {name}
      </div>
      <p style={{ fontSize: 'clamp(15px,1.5vw,19px)', fontWeight: 200, lineHeight: 1.8, opacity: 0.7 }}>
        "{text}"
      </p>
    </div>

    <style>{`@media (max-width: 480px) { .tcard { grid-template-columns: 1fr !important; } }`}</style>
  </div>
)
