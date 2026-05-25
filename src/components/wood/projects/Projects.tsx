import { useState } from "react"
import { useTranslation } from "react-i18next"
import Masonry from "react-masonry-css"
import { ProjectTile } from "./components/project-tile"

const BREAKPOINTS = { default: 4, 1100: 3, 768: 2, 480: 1 }

const constructionImages = import.meta.glob(
  "../../../assets/gallery/construction/*.{jpg,png}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>

const ALT_BY_FILE: Record<string, string> = {
  "tower.jpg": "Wie\u017ca",
  "bench-2.jpg": "\u0141awka",
  "bench.jpg": "\u0141awka",
  "cabin.jpg": "Domek drewniany",
  "cabins.jpg": "Elewacja",
  "ceiling-2.jpg": "Konstrukcja sufitu",
  "ceiling.jpg": "Konstrukcja sufitu",
  "furniture.jpg": "\u0141awki",
  "gazebo.jpg": "Altana",
  "gazeebo.jpg": "Altana",
  "graduation-tower.jpg": "T\u0119\u017cnia",
  "lounge.jpg": "Strefa wypoczynku",
  "pavilion-2.jpg": "Pawilon",
  "pavilion-3.jpg": "Zadaszenie",
  "pavilion-4.jpg": "Pawilon",
  "pavilion-5.jpg": "Pawilon",
  "pavilion-6.jpg": "Pawilon",
  "pavilion-7.jpg": "Zabudowa",
  "pavilion.jpg": "Pawilon rekreacyjny",
  "platform.jpg": "Platforma",
  "roof-2.jpg": "Wi\u0119\u017aba dachowa",
  "roof-3.jpg": "Konstrukcja dachu",
  "shelter.jpg": "Wiata",
  "stairs.jpg": "Schody",
  "stand.jpg": "Stoisko",
  "stop.jpg": "Tablice informacyjne",
  "structure.jpg": "Konstrukcja",
  "swing.jpg": "Hu\u015btawka",
}

const TILES = Object.entries(constructionImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => {
    const file = path.split("/").at(-1) ?? ""

    return {
      src,
      alt: ALT_BY_FILE[file] ?? "Realizacja drewniana",
    }
  })

export const Projects = () => {
  const { t } = useTranslation("wood")
  const [zoom, setZoom] = useState<string | null>(null)

  return (
    <section
      id="realizacje"
      style={{
        padding: "clamp(5rem,9vw,8rem) clamp(1.5rem,5vw,5rem)",
        background: "var(--ink)",
        color: "var(--white)",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <div
              className="stag"
              style={{ marginBottom: "1rem", opacity: 0.35 }}
            >
              {t("projects.label")}
            </div>
            <h2
              style={{
                fontSize: "clamp(30px,4vw,52px)",
                fontWeight: 500,
                textTransform: "uppercase",
              }}
            >
              {t("projects.heading")}
            </h2>
          </div>
        </div>

        {/* Masonry grid */}
        <Masonry
          breakpointCols={BREAKPOINTS}
          className="wd-masonry"
          columnClassName="wd-masonry-col"
        >
          {TILES.map((tile, i) => (
            <ProjectTile
              key={tile.src}
              src={tile.src}
              alt={tile.alt}
              idx={i}
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
            background: "rgba(0,0,0,.9)",
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
              color: "#fff",
              fontSize: 28,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "Oswald, sans-serif",
            }}
          >
            &times;
          </button>
        </div>
      )}

      <style>{`
        .wd-masonry {
          display: flex;
          gap: 6px;
          width: 100%;
        }
        .wd-masonry-col {
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 6px;
        }
      `}</style>
    </section>
  )
}
