import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { getSiteContent, hasSanityConfig } from "./lib/sanity";
import type { Artwork, Gallery, SiteContent } from "./types";
import "./styles.css";

function getPieceClass(aspectRatio?: number) {
  if (!aspectRatio) return "piece piece-standard";
  if (aspectRatio > 2) return "piece piece-panoramic";
  if (aspectRatio > 1.18) return "piece piece-landscape";
  if (aspectRatio < 0.72) return "piece piece-vertical";
  if (aspectRatio < 0.92) return "piece piece-portrait";
  return "piece piece-square";
}

function App() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedGalleryId, setSelectedGalleryId] = useState<string | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const timeout = new Promise<SiteContent>((_, reject) => {
      window.setTimeout(() => reject(new Error("Sanity load timed out")), 3500);
    });

    Promise.race([getSiteContent(), timeout])
      .then(setContent)
      .catch(async () => {
        const { fallbackContent } = await import("./data/fallbackContent");
        setContent(fallbackContent);
      });
  }, []);

  const activeGallery = useMemo<Gallery | null>(() => {
    if (!content) return null;
    return content.galleries.find((gallery) => gallery.id === selectedGalleryId) || null;
  }, [content, selectedGalleryId]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 3600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    if (!selectedArtwork) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedArtwork(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedArtwork]);

  if (!content) {
    return <main className="loading">Loading</main>;
  }

  return (
    <>
      <button className="menu-button" type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        <span />
      </button>

      <aside className="menu" aria-hidden={!menuOpen}>
        <nav aria-label="Site menu">
          {content.galleries.map((gallery) => (
            <button type="button" key={gallery.id} onClick={() => { setMenuOpen(false); setSelectedGalleryId(gallery.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              {gallery.title}
            </button>
          ))}
        </nav>
      </aside>

      <button className={`name name-${content.activeFont}`} type="button" onClick={() => setSelectedGalleryId(null)}>
        {content.photographerName}
      </button>

      {activeGallery ? (
        <section className="galleries" aria-label={`${activeGallery.title} gallery`}>
          <div className="gallery-head">
            <h2>{activeGallery.title}</h2>
            <button type="button" onClick={() => setSelectedGalleryId(null)}>Main image</button>
          </div>
          <div className="gallery-grid">
            {activeGallery.artworks.map((artwork) => (
              <article className={getPieceClass(artwork.aspectRatio)} key={artwork.id}>
                <img src={artwork.image} alt={artwork.alt} />
                <div className="piece-overlay">
                  <span className="piece-title">{artwork.title}</span>
                  <div className="piece-actions">
                    <button type="button" onClick={() => setSelectedArtwork(artwork)}>
                      View image
                    </button>
                    <button type="button" onClick={() => setNotice("Coming soon. Thank you for your patience. For inquiries, contact ourwildlifepics@gmail.com.")}>
                      Shop print
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <main id="home" className="hero">
          <img className="hero-image" src={content.homeImage} alt={content.homeImageAlt} />
        </main>
      )}

      {!hasSanityConfig && (
        <div className="cms-status">
          Local fallback content. Add Sanity project settings in <code>.env</code> to connect CMS.
        </div>
      )}

      {notice && <div className="notice" role="status">{notice}</div>}

      {selectedArtwork && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={selectedArtwork.title} onClick={() => setSelectedArtwork(null)}>
          <figure className="lightbox-frame" onClick={(event) => event.stopPropagation()}>
            <img src={selectedArtwork.image} alt={selectedArtwork.alt} />
            <figcaption>
              <strong>{selectedArtwork.title}</strong>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
