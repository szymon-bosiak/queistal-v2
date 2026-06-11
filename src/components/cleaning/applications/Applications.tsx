import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '../../shared/reveal/Reveal'
import { WordReveal } from '../../shared/reveal/WordReveal'
import { useInView } from '../../../hooks/useInView'
import restorationDoor from '../../../assets/applications/restoration-door.jpg'
import restoratioCobblestone from '../../../assets/applications/restoration-cobblestone.jpg'
import restorationDrawer from '../../../assets/applications/restoration-drawer.jpg'
import restorationWall from '../../../assets/applications/restoration-wall.jpg'
import restorationMetal from '../../../assets/applications/restoration-metal.jpg'
import restorationIndustrial from '../../../assets/applications/restoration-industrial.jpg'

const APP_IMGS = [restoratioCobblestone, restorationMetal, restorationDrawer, restorationWall, restorationDoor, restorationIndustrial]
const APP_TAGS = ['01', '02', '03', '04', '05', '06']

interface AppItem { label: string; note: string }

const AppCard = ({ item, img, tag, idx }: { item: AppItem; img: string; tag: string; idx: number }) => {
  const [ref, seen] = useInView({ threshold: 0.1 })
  const [hov, setHov] = useState(false)

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        aspectRatio: '4 / 3',
        background: '#0a0d12',
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateY(0) scale(1)' : 'translateY(36px) scale(.96)',
        transition: `opacity .8s ${idx * 120}ms var(--ease), transform .8s ${idx * 120}ms var(--ease)`,
      }}
    >
      {/* Image — desaturated, brightens on hover */}
      <img
        src={img}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: hov ? 'grayscale(.3) brightness(.85)' : 'grayscale(1) brightness(.45)',
          transform: hov ? 'scale(1.06)' : 'scale(1)',
          transition: 'filter .5s var(--ease), transform .8s var(--ease)',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10,13,18,.92) 0%, rgba(10,13,18,.55) 50%, rgba(10,13,18,.25) 100%)',
        }}
      />

      {/* Dashed inner frame */}
      <div
        style={{
          position: 'absolute',
          inset: 14,
          border: '1px dashed rgba(227,235,212,.18)',
          pointerEvents: 'none',
          opacity: hov ? 0.5 : 0.25,
          transition: 'opacity .3s',
        }}
      />

      {/* Top-left: code tag */}
      <div
        style={{
          position: 'absolute',
          top: 22,
          left: 22,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 10,
          letterSpacing: 3,
          color: 'var(--sage)',
          opacity: 0.6,
          fontWeight: 400,
        }}
      >
        <span>//{tag}</span>
        <span style={{ width: 24, height: 1, borderTop: '1px dashed rgba(227,235,212,.4)' }} />
      </div>

      {/* Bottom content */}
      <div style={{ position: 'absolute', left: 22, right: 22, bottom: 22, color: 'var(--white)' }}>
        <div
          style={{
            fontSize: 'clamp(20px,2.4vw,28px)',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: 1,
            lineHeight: 1.1,
            marginBottom: 8,
            transform: hov ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform .3s var(--ease)',
          }}
        >
          {item.label}
        </div>
        <div style={{ fontSize: 13, fontWeight: 300, opacity: 0.55, letterSpacing: 0.5 }}>
          {item.note}
        </div>
        <div
          style={{
            marginTop: 14,
            height: 1,
            background: 'linear-gradient(to right, var(--sage), transparent)',
            transform: `scaleX(${hov ? 1 : 0.2})`,
            transformOrigin: 'left',
            transition: 'transform .5s var(--ease)',
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  )
}

export const Applications = () => {
  const { t } = useTranslation('cleaning')
  const items = t('applications.items', { returnObjects: true }) as AppItem[]

  return (
    <section
      id="zastosowania"
      className="grain"
      style={{ padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)', background: '#0a0d12', color: 'var(--white)' }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Reveal kind="up">
              <div className="stag" style={{ marginBottom: '1rem', color: 'var(--sage)', opacity: 0.5 }}>
                {t('applications.label')}
              </div>
            </Reveal>
            <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 500, textTransform: 'uppercase' }}>
              <WordReveal text={t('applications.heading')} />
            </h2>
          </div>
          <Reveal kind="up" delay={200}>
            <div style={{ fontSize: 12, letterSpacing: 2, opacity: 0.32, maxWidth: 280, lineHeight: 1.7, fontWeight: 300 }}>
              <span style={{ color: 'var(--sage)', opacity: 0.8 }}>06</span>
              &nbsp;kategorii materiałów · obiektów · powierzchni
            </div>
          </Reveal>
        </div>

        {/* Photo grid */}
        <div className="apps-g" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
          {items.map((item, i) => (
            <AppCard key={i} item={item} img={APP_IMGS[i]} tag={APP_TAGS[i]} idx={i} />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) { .apps-g { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 480px) { .apps-g { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
