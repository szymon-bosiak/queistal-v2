import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useInView } from '../../../hooks/useInView'
import { Reveal } from '../../shared/reveal/Reveal'
import { WordReveal } from '../../shared/reveal/WordReveal'
import img1  from '../../../assets/process/1.jpg'
import img2 from '../../../assets/process/2.jpg'
import img3 from '../../../assets/process/3.jpg'
import img4 from '../../../assets/process/4.jpg'

const BP_GRID = {
  backgroundImage:
    'linear-gradient(rgba(227,235,212,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(227,235,212,.04) 1px,transparent 1px)',
  backgroundSize: '48px 48px',
}

const STEP_IMGS = [img1, img2, img3, img4]

interface Step { n: string; title: string; desc: string }

interface ProcRowProps {
  step: Step
  img: string
  idx: number
  last: boolean
}

const ProcRow = ({ step, img, idx, last }: ProcRowProps) => {
  const [ref, seen] = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="proc-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr 1fr',
        gap: '2rem',
        alignItems: 'start',
        padding: '2.5rem 0',
        borderTop: '1px dashed rgba(227,235,212,.12)',
        borderBottom: last ? '1px dashed rgba(227,235,212,.12)' : 'none',
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateX(0)' : 'translateX(-30px)',
        transition: 'opacity .8s var(--ease), transform .8s var(--ease)',
        transitionDelay: `${idx * 120}ms`,
      }}
    >
      <div style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 200, color: 'var(--sage)', opacity: 0.25, lineHeight: 1 }}>
        {step.n}
      </div>
      <div>
        <div style={{ fontSize: 'clamp(18px,2vw,24px)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.75rem' }}>
          {step.title}
        </div>
        <p style={{ fontSize: 'clamp(13px,1.2vw,16px)', fontWeight: 300, lineHeight: 1.8, opacity: 0.55 }}>
          {step.desc}
        </p>
      </div>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
        <img
          src={img}
          alt={step.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            opacity: 0.75,
            transform: seen ? 'scale(1)' : 'scale(1.08)',
            transition: `transform 1.4s ${idx * 120 + 200}ms var(--ease), opacity .6s ${idx * 120}ms var(--ease)`,
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '1px dashed rgba(227,235,212,.15)',
          background: 'linear-gradient(135deg, rgba(0,0,0,.18) 0%, transparent 60%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 10,
          right: 12,
          fontSize: 10,
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: 'rgba(227,235,212,.35)',
          fontWeight: 300,
        }}>
          {step.n}
        </div>
      </div>
    </div>
  )
}

export const Process = () => {
  const { t } = useTranslation('cleaning')
  const steps = t('process.steps', { returnObjects: true }) as Step[]
  const lineRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)

  /* Vertical guide line draws itself as the steps scroll through the viewport */
  useEffect(() => {
    let raf = 0
    const update = () => {
      const line = lineRef.current
      const rows = rowsRef.current
      if (!line || !rows) return
      const r = rows.getBoundingClientRect()
      const p = (window.innerHeight * 0.75 - r.top) / r.height
      line.style.transform = `scaleY(${Math.min(Math.max(p, 0), 1)})`
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section
      id="proces"
      className="grain"
      style={{ padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)', background: 'var(--bp)', color: 'var(--white)', ...BP_GRID }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Reveal kind="up">
          <div className="stag" style={{ marginBottom: '1rem', color: 'var(--sage)', opacity: 0.5 }}>
            {t('process.label')}
          </div>
        </Reveal>
        <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 500, textTransform: 'uppercase', marginBottom: '3.5rem' }}>
          <WordReveal text={t('process.heading')} />
        </h2>

        <div ref={rowsRef} style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {/* Scroll-drawn guide line — sits in the gap between the number
              column and the content, so it never overlaps the numbers */}
          <div
            ref={lineRef}
            className="proc-line"
            aria-hidden
            style={{
              position: 'absolute', top: '2.5rem', bottom: '2.5rem', left: 96, width: 1,
              background: 'linear-gradient(to bottom, rgba(227,235,212,.55), rgba(227,235,212,.15))',
              transform: 'scaleY(0)',
              transformOrigin: 'top',
              willChange: 'transform',
            }}
          />
          {steps.map((step, i) => (
            <ProcRow key={i} step={step} img={STEP_IMGS[i]} idx={i} last={i === steps.length - 1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .proc-line { display: none !important; }
          .proc-row { grid-template-columns: 60px 1fr !important; }
          .proc-row > div:last-child { display: none !important; }
        }
        @media (max-width: 480px) {
          .proc-row { grid-template-columns: 1fr !important; gap: .75rem !important; }
        }
      `}</style>
    </section>
  )
}
