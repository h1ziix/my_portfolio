"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ProjectVideo } from "@/components/projects/project-video";
import { Ribbon } from "@/components/ui/ribbon";
import { projectRibbon } from "@/lib/ribbon";
import type { ProjectMedia } from "@/types/portfolio";

type ReelFilm = {
  slug: string;
  name: string;
  subtitle: string;
  media: ProjectMedia;
};

export function FilmReel({ films }: { films: ReelFilm[] }) {
  const [selected, setSelected] = useState<ReelFilm | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !selected) return;
    dialog.showModal();
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      dialog.querySelectorAll("video").forEach((video) => video.pause());
      if (dialog.open) dialog.close();
      document.documentElement.style.overflow = previousOverflow;
      triggerRef.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  const openFilm = (film: ReelFilm, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setSelected(film);
  };

  return (
    <div className="hero-reel">
      <div className="reel-heading">
        <p className="meta">See it in action.</p>
        <span className="meta">{films.length} product films</span>
      </div>
      <div className="reel-stack" role="group" aria-label="Product films">
        {films.map((film, index) => (
          <button
            key={film.slug}
            type="button"
            className="reel-card focus-ring"
            data-ribbon={projectRibbon(film.slug)}
            onClick={(event) => openFilm(film, event.currentTarget)}
          >
            <Ribbon variant="edge" gradient={projectRibbon(film.slug)} />
            <span className="reel-card-top meta">
              <span>
                0{index + 1} / {film.name}
              </span>
              <span>{film.media.duration}</span>
            </span>
            <Image
              src={film.media.poster!}
              alt=""
              width={640}
              height={360}
              sizes="(min-width: 1024px) 450px, (min-width: 768px) 380px, 85vw"
              priority={index === 0}
            />
            <span className="reel-card-caption">
              <span>{film.subtitle}</span>
              <span className="meta">
                Watch film <span aria-hidden="true">↗</span>
              </span>
            </span>
          </button>
        ))}
      </div>
      <ol className="reel-index">
        {films.map((film, index) => (
          <li key={film.slug}>
            <button
              type="button"
              className="focus-ring meta"
              onClick={(event) => openFilm(film, event.currentTarget)}
            >
              <span>0{index + 1}</span>
              <span>{film.name}</span>
              <span>{film.media.duration}</span>
              <span aria-hidden="true">↗</span>
            </button>
          </li>
        ))}
      </ol>
      <dialog
        ref={dialogRef}
        className="film-modal"
        aria-label={selected ? `${selected.name} presentation` : "Product film"}
        onCancel={() => setSelected(null)}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelected(null);
        }}
      >
        <div className="film-modal-panel">
          <div className="film-modal-header">
            <span className="meta">{selected?.name}</span>
            <button
              type="button"
              className="sheet-close focus-ring"
              aria-label="Close film"
              onClick={() => setSelected(null)}
            >
              ×
            </button>
          </div>
          {selected ? (
            <ProjectVideo
              key={selected.slug}
              media={selected.media}
              name={selected.name}
              ribbon={projectRibbon(selected.slug)}
            />
          ) : null}
        </div>
      </dialog>
    </div>
  );
}
