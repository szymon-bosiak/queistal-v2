interface TestimonialCardProps {
  name: string
  location: string
  text: string
}

export const TestimonialCard = ({ name, location, text }: TestimonialCardProps) => {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
      {/* Avatar */}
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'rgba(227,235,212,.12)',
        border: '1px solid rgba(227,235,212,.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 2rem',
        fontSize: 20, fontWeight: 400,
        color: 'var(--color-sage)',
        letterSpacing: 1,
      }}>
        {initials}
      </div>

      {/* Quote */}
      <p style={{
        fontSize: 'clamp(16px,1.8vw,21px)',
        fontWeight: 200,
        lineHeight: 1.75,
        opacity: .8,
        marginBottom: '2rem',
        fontStyle: 'italic',
      }}>
        „{text}"
      </p>

      {/* Name + location */}
      <div>
        <div style={{ fontSize: 'clamp(22px,3vw,34px)', fontWeight: 400, letterSpacing: .5 }}>
          {name}
        </div>
        <div style={{ fontSize: 12, fontWeight: 300, letterSpacing: 3, opacity: .35, marginTop: '.25rem' }}>
          {location}
        </div>
      </div>
    </div>
  )
}
