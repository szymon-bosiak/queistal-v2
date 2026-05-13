import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectTile } from './components/project-tile'
import p1  from '../../../assets/showcase/1.jpg'
import p3  from '../../../assets/showcase/3.jpg'
import p15 from '../../../assets/showcase/15.jpg'
import p5  from '../../../assets/showcase/5.jpg'
import p13 from '../../../assets/showcase/13.jpg'
import p8  from '../../../assets/showcase/8.jpg'
import p14 from '../../../assets/showcase/14.jpg'
import p17 from '../../../assets/showcase/17.jpg'
import p7  from '../../../assets/showcase/7.jpg'
import p16 from '../../../assets/showcase/16.jpg'

const TILES = [
  { src: p1,  alt: 'Drewniana elewacja', area: 'a' },
  { src: p3,  alt: 'Wiata parkowa',      area: 'b' },
  { src: p15, alt: 'Tężnia',             area: 'c' },
  { src: p5,  alt: 'Przystanek',         area: 'd' },
  { src: p13, alt: 'Gont',               area: 'e' },
  { src: p8,  alt: 'Taras widokowy',     area: 'f' },
  { src: p14, alt: 'Altana',             area: 'g' },
  { src: p17, alt: 'Budka',              area: 'h' },
  { src: p7,  alt: 'Budka handlowa',     area: 'i' },
  { src: p16, alt: 'Ławki',              area: 'j' },
] as const

export const Projects = () => {
  const { t } = useTranslation('wood')
  const [zoom, setZoom] = useState<string | null>(null)

  return (
    <section
      id="realizacje"
      style={{
        padding: 'clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)',
        background: 'var(--ink)',
        color: 'var(--white)',
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="stag" style={{ marginBottom: '1rem', opacity: 0.35 }}>
              {t('projects.label')}
            </div>
            <h2 style={{ fontSize: 'clamp(30px,4vw,52px)', fontWeight: 500, textTransform: 'uppercase' }}>
              {t('projects.heading')}
            </h2>
          </div>
        </div>

        {/* Bento grid */}
        <div
          className="bento"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(4, 200px)',
            gridTemplateAreas: '"a a b c" "a a d e" "f g h i" "f j j i"',
            gap: 6,
          }}
        >
          {TILES.map((tile, i) => (
            <ProjectTile
              key={tile.area}
              src={tile.src}
              alt={tile.alt}
              area={tile.area}
              idx={i}
              onClick={() => setZoom(tile.src)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {zoom && (
        <div
          onClick={() => setZoom(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 500,
            animation: 'fadeIn .15s ease',
          }}
        >
          <img src={zoom} style={{ maxWidth: '92vw', maxHeight: '90vh', objectFit: 'contain' }} alt="" />
          <button
            onClick={() => setZoom(null)}
            style={{
              position: 'absolute',
              top: 20,
              right: 24,
              color: '#fff',
              fontSize: 28,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Oswald, sans-serif',
            }}
          >
            ✕
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .bento {
            grid-template-columns: repeat(2, 1fr) !important;
            grid-template-rows: repeat(7, 160px) !important;
            grid-template-areas:
              "a a"
              "a a"
              "b c"
              "d e"
              "f g"
              "h i"
              "j j" !important;
          }
        }
      `}</style>
    </section>
  )
}
