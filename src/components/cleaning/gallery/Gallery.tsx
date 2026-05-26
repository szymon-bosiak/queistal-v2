import { useState } from "react"
import { useTranslation } from "react-i18next"
import Masonry from "react-masonry-css"
import { Reveal } from "../../shared/reveal/Reveal"
import { WordReveal } from "../../shared/reveal/WordReveal"
import { GalleryTile } from "../../shared/gallery-tile"

import g1 from "../../../assets/gallery/restoration/door.jpg"
import g2 from "../../../assets/gallery/restoration/door-2.jpg"
import g3 from "../../../assets/gallery/restoration/door-3.jpg"
import g4 from "../../../assets/gallery/restoration/door-4.jpg"
import g5 from "../../../assets/gallery/restoration/door-5.jpg"
import g6 from "../../../assets/gallery/restoration/door-6.jpg"
import g7 from "../../../assets/gallery/restoration/door-7.jpg"
import g8 from "../../../assets/gallery/restoration/ceeling.jpg"
import g9 from "../../../assets/gallery/restoration/logs.jpg"
import g10 from "../../../assets/gallery/restoration/tower.jpg"
import g11 from "../../../assets/gallery/restoration/door-8.jpg"

const BP_GRID = {
  backgroundImage:
    "linear-gradient(rgba(227,235,212,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(227,235,212,.04) 1px,transparent 1px)",
  backgroundSize: "48px 48px",
}

const BREAKPOINTS = { default: 4, 1100: 3, 768: 2, 480: 2 }

const TILES = [
  { src: g6, alt: "Drzwi" },
  { src: g10, alt: "Wieża" },
  { src: g9, alt: "Więźba" },
  { src: g11, alt: "Drzwi" },
  { src: g2, alt: "Drzwi" },
  { src: g8, alt: "Strop" },
  { src: g3, alt: "Drzwi" },
  { src: g4, alt: "Drzwi" },
  { src: g5, alt: "Stolarka" },
  { src: g7, alt: "Portal" },
  { src: g1, alt: "Drzwi" },
]

export const Gallery = () => {
  const { t } = useTranslation("cleaning")
  const [zoom, setZoom] = useState<string | null>(null)

  return (
    <section
      id="galeria"
      style={{
        padding: "clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)",
        background: "var(--bp)",
        color: "var(--white)",
        ...BP_GRID,
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <Reveal kind="up">
            <div
              className="stag"
              style={{
                marginBottom: "1rem",
                color: "var(--sage)",
                opacity: 0.5,
              }}
            >
              {t("gallery.label")}
            </div>
          </Reveal>
          <h2
            style={{
              fontSize: "clamp(30px,4vw,52px)",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            <WordReveal text={t("gallery.heading")} />
          </h2>
        </div>

        {/* Masonry grid */}
        <Masonry
          breakpointCols={BREAKPOINTS}
          className="cl-masonry"
          columnClassName="cl-masonry-col"
        >
          {TILES.map((tile, i) => (
            <GalleryTile
              key={tile.src}
              src={tile.src}
              alt={tile.alt}
              idx={i}
              variant="restoration"
              onClick={() => setZoom(tile.src)}
            />
          ))}
        </Masonry>
      </div>

      {/* Lightbox */}
      {zoom && (
        <div
          onClick={() => setZoom(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(6,8,5,.94)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 500,
            animation: "fadeIn .15s ease",
          }}
        >
          <img
            src={zoom}
            style={{
              maxWidth: "92vw",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
            alt=""
          />
          <button
            onClick={() => setZoom(null)}
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              color: "var(--sage)",
              fontSize: 20,
              background: "none",
              border: "1px dashed rgba(227,235,212,.2)",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontFamily: "monospace",
              transition: "border-color .2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "var(--sage)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(227,235,212,.2)")
            }
          >
            ✕
          </button>
          <div
            style={{
              position: "absolute",
              inset: "4vh 4vw",
              border: "1px dashed rgba(227,235,212,.07)",
              pointerEvents: "none",
            }}
          />
        </div>
      )}

      <style>{`
        .cl-masonry {
          display: flex;
          gap: 5px;
          width: 100%;
        }
        .cl-masonry-col {
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 5px;
        }
        .cl-masonry-col > div {
          margin-bottom: 0 !important;
        }
      `}</style>
    </section>
  )
}
