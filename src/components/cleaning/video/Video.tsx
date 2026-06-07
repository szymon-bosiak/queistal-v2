import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BpBox } from '../../shared/bp-box'
import { Reveal } from '../../shared/reveal/Reveal'
import { WordReveal } from '../../shared/reveal/WordReveal'
import videoSrc from '../../../assets/queistal_video.mp4'
import videoPoster from '../../../assets/queistal_video_poster.jpg'

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
      <div
        className="video-grid"
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'auto minmax(0,1fr)',
          gap: 'clamp(2.5rem,6vw,7rem)',
          alignItems: 'start',
        }}
      >

        {/* Copy column */}
        <div className="video-copy">
          <Reveal kind="up">
            <div className="stag" style={{ marginBottom: '1rem', color: 'var(--sage)', opacity: 0.5 }}>
              {t('video.label')}
            </div>
          </Reveal>

          <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 500, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            <WordReveal text={t('video.heading')} />
          </h2>

          <Reveal kind="up" delay={120}>
            <p style={{ fontSize: 'clamp(15px,1.3vw,18px)', fontWeight: 300, lineHeight: 1.8, opacity: 0.55, maxWidth: '46ch' }}>
              {t('video.text')}
            </p>
          </Reveal>
        </div>

        {/* Media column */}
        <Reveal kind="scale" delay={150} className="video-media" style={{ display: 'flex', justifyContent: 'center' }}>
          <BpBox style={{ display: 'inline-block' }}>
            <div
              style={{ position: 'relative', cursor: 'pointer', lineHeight: 0 }}
              onClick={toggle}
              onMouseEnter={() => setHov(true)}
              onMouseLeave={() => setHov(false)}
            >
              <video
                ref={videoRef}
                src={videoSrc}
                poster={videoPoster}
                preload="none"
                loop
                playsInline
                className="video-el"
                style={{ display: 'block', width: 'auto', height: 'auto', maxHeight: 'min(88vh, 820px)', maxWidth: '100%' }}
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

      <style>{`
        @media (max-width: 900px) {
          .video-grid { grid-template-columns: 1fr !important; }
          .video-media { display: block !important; margin-top: 2.5rem; }
          .video-media > div { display: block !important; }
          .video-el { width: 100% !important; max-height: none !important; }
        }
      `}</style>
    </section>
  )
}
