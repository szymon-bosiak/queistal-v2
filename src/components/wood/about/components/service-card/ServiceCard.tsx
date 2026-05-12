interface ServiceCardProps {
  icon: string
  label: string
}

export const ServiceCard = ({ icon, label }: ServiceCardProps) => (
  <div
    style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '0.75rem',
      height: '11rem', width: '100%',
      border: '1px solid var(--color-ink)',
      background: 'var(--color-sage)',
      cursor: 'default',
      transition: 'transform 0.3s ease',
      padding: '1rem',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.1) rotate(4deg)'
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.transform = ''
    }}
  >
    <img src={icon} alt="" style={{ height: '3rem', width: '3rem', objectFit: 'contain' }} />
    <span style={{
      fontSize: 12, fontWeight: 400, letterSpacing: 2,
      textTransform: 'uppercase', textAlign: 'center', lineHeight: 1.3,
    }}>
      {label}
    </span>
  </div>
)
