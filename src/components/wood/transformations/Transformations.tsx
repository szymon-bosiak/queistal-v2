import { useTranslation } from 'react-i18next'
import { VideoPlaceholder } from './components/video-placeholder'

export const Transformations = () => {
  const { t } = useTranslation('wood')
  const videos = t('transformations.videos', { returnObjects: true }) as string[]

  return (
    <section
      id="transformacje"
      style={{
        padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)',
        background: 'var(--bp)',
        backgroundImage: 'linear-gradient(rgba(227,235,212,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(227,235,212,.04) 1px,transparent 1px)',
        backgroundSize: '48px 48px',
        color: 'var(--white)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="stag" style={{ marginBottom: '1rem', opacity: 0.35 }}>
          {t('transformations.label')}
        </div>
        <h2
          style={{
            fontSize: 'clamp(30px,4vw,52px)',
            fontWeight: 500,
            textTransform: 'uppercase',
            marginBottom: '3rem',
          }}
        >
          {t('transformations.heading')}
        </h2>

        <div
          className="vid-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}
        >
          {videos.map((label, i) => (
            <VideoPlaceholder key={i} label={label} idx={i} />
          ))}
        </div>

        <p style={{ fontSize: 12, fontWeight: 300, opacity: 0.28, marginTop: '1.5rem', letterSpacing: 1 }}>
          Zastąp placeholdery kodem embed z YouTube / Vimeo
        </p>
      </div>

      <style>{`@media (max-width: 768px) { .vid-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
