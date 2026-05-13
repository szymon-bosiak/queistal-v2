import { useTranslation } from 'react-i18next'
import { BpBox } from '../../shared/bp-box'

const BP_GRID = {
  backgroundImage:
    'linear-gradient(rgba(227,235,212,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(227,235,212,.04) 1px,transparent 1px)',
  backgroundSize: '48px 48px',
}

export const Video = () => {
  const { t } = useTranslation('cleaning')

  return (
    <section
      id="video"
      style={{ background: 'var(--bp)', color: 'var(--white)', padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)', ...BP_GRID }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="stag" style={{ marginBottom: '1rem', color: 'var(--sage)', opacity: 0.5 }}>
          {t('video.label')}
        </div>
        <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 500, textTransform: 'uppercase', marginBottom: '3rem' }}>
          {t('video.heading')}
        </h2>

        <BpBox>
          <div style={{ width: '100%', paddingTop: '56.25%', position: 'relative', background: 'rgba(227,235,212,.03)' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  border: '1px dashed rgba(227,235,212,.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: '12px solid transparent',
                    borderBottom: '12px solid transparent',
                    borderLeft: '20px solid rgba(227,235,212,.6)',
                    marginLeft: 6,
                  }}
                />
              </div>
              <p style={{ fontSize: 13, fontWeight: 400, letterSpacing: 3, opacity: 0.3, textTransform: 'uppercase' }}>
                {t('video.placeholder')}
              </p>
            </div>
          </div>
        </BpBox>
      </div>
    </section>
  )
}
