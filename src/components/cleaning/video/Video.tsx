import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BpBox } from '../../shared/bp-box'
import { Reveal } from '../../shared/reveal/Reveal'
import { WordReveal } from '../../shared/reveal/WordReveal'
import videoSrc from '../../../assets/video.mp4'

const BP_GRID = {
  backgroundImage:
    'linear-gradient(rgba(227,235,212,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(227,235,212,.04) 1px,transparent 1px)',
  backgroundSize: '48px 48px',
}

export const Video = () => {
  const { t } = useTranslation('cleaning')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [hov, setHov] = useState(false)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else          { v.pause(); setPlaying(false) }
  }

  return (
    <section
      id="jak-dzialamy"
      style={{ background: 'var(--bp)', color: 'var(--white)', padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)', ...BP_GRID }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        <Reveal kind="up">
          <div className="stag" style={{ marginBottom: '1rem', color: 'var(--sage)', opacity: 0.5 }}>
            {t('video.label')}
          </div>
        </Reveal>

        <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 500, textTransform: 'uppercase', marginBottom: '3rem' }}>
          <WordReveal text={t('video.heading')} />
        </h2>

        <Reveal kind="scale" delay={150}>
          <BpBox>
            <div
              style={{ position: 'relative', cursor: 'pointer', lineHeight: 0 }}
              onClick={toggle}
              onMouseEnter={() => setHov(true)}
              onMouseLeave={() => setHov(false)}
            >
              <video
                ref={videoRef}
                src={videoSrc}
                loop
                playsInline
                style={{ width: '100%', display: 'block' }}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />

              {/* Overlay — fades out when playing and not hovered */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
                background: playing && !hov ? 'transparent' : 'rgba(6,8,5,.35)',
                opacity: playing && !hov ? 0 : 1,
                transition: 'opacity .3s, background .3s',
                pointerEvents: 'none',
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  border: '1px dashed rgba(227,235,212,.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  animation: !playing ? 'pulseRing 2.4s ease-out infinite' : 'none',
                  transform: hov ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform .25s var(--ease)',
                }}>
                  {playing ? (
                    /* Pause icon — two bars */
                    <div style={{ display: 'flex', gap: 5 }}>
                      <div style={{ width: 4, height: 18, background: 'rgba(227,235,212,.7)', borderRadius: 1 }} />
                      <div style={{ width: 4, height: 18, background: 'rgba(227,235,212,.7)', borderRadius: 1 }} />
                    </div>
                  ) : (
                    /* Play triangle */
                    <div style={{
                      width: 0, height: 0,
                      borderTop: '12px solid transparent',
                      borderBottom: '12px solid transparent',
                      borderLeft: '20px solid rgba(227,235,212,.6)',
                      marginLeft: 6,
                    }} />
                  )}
                </div>
              </div>
            </div>
          </BpBox>
        </Reveal>

      </div>
    </section>
  )
}
