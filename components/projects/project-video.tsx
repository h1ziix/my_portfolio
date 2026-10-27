"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ProjectMedia } from "@/types/portfolio";
import type { RibbonGradient } from "@/lib/ribbon";
import { Ribbon } from "@/components/ui/ribbon";
import { projectVideoPoster } from "@/lib/project-media";

type PlaybackState =
  "idle" | "loading" | "playing" | "paused" | "ended" | "error";

export function ProjectVideo({
  media,
  name,
  id,
  ribbon,
}: {
  media: ProjectMedia;
  name: string;
  id?: string;
  ribbon?: RibbonGradient;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const captionId = useId();
  const [playback, setPlayback] = useState<PlaybackState>("idle");
  const isTrailer = media.presentation === "trailer";

  useEffect(() => {
    const video = videoRef.current;
    return () => video?.pause();
  }, []);

  async function play() {
    const video = videoRef.current;
    if (!video) return;

    if (video.error) video.load();
    setPlayback("loading");
    try {
      await video.play();
      if (!video.paused) {
        setPlayback("playing");
        video.focus();
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setPlayback("error");
      video.focus();
    }
  }

  return (
    <figure
      id={id}
      className="film min-w-0"
      data-presentation={media.presentation}
    >
      <div className="film-frame">
        {ribbon ? <Ribbon variant="edge" gradient={ribbon} /> : null}
        <div className="film-heading">
          <span className="font-medium text-ink">{name}</span>
          <span className="text-slate">
            {isTrailer ? "Project trailer" : "Video presentation"}
          </span>
        </div>
        <div className="film-stage" aria-busy={playback === "loading"}>
          <video
            ref={videoRef}
            src={media.src}
            poster={projectVideoPoster(media)}
            preload="none"
            playsInline
            controls={playback !== "idle" && playback !== "ended"}
            tabIndex={playback === "idle" || playback === "ended" ? -1 : 0}
            aria-label={media.alt || `${name} presentation`}
            aria-describedby={media.caption ? captionId : undefined}
            className="focus-ring block aspect-video w-full object-contain"
            onPlay={(event) => {
              const current = event.currentTarget;
              current.ownerDocument
                .querySelectorAll("video")
                .forEach((video) => {
                  if (video !== current) video.pause();
                });
            }}
            onPlaying={() => setPlayback("playing")}
            onPause={(event) => {
              if (!event.currentTarget.ended)
                setPlayback((state) =>
                  state === "idle" || state === "error" ? state : "paused",
                );
            }}
            onWaiting={() =>
              setPlayback((state) =>
                state === "idle" || state === "error" ? state : "loading",
              )
            }
            onEnded={() => setPlayback("ended")}
            onError={() => setPlayback("error")}
          >
            {media.captions ? (
              <track
                kind="captions"
                src={media.captions}
                srcLang="ru"
                label="Russian"
                default
              />
            ) : null}
            Your browser does not support video playback. Use the download link
            below.
          </video>

          {playback === "idle" || playback === "ended" ? (
            <button
              type="button"
              onClick={play}
              className="film-start group"
            >
              <span className="sr-only">{name}: </span>
              <span className="film-play">
                <svg
                  aria-hidden="true"
                  width="26"
                  height="26"
                  viewBox="0 0 20 20"
                  className="ml-1"
                  fill="currentColor"
                >
                  <path d="M5 3.75a.75.75 0 0 1 1.137-.643l10 6a.75.75 0 0 1 0 1.286l-10 6A.75.75 0 0 1 5 15.75z" />
                </svg>
              </span>
              <span className="film-watch-label">
                {playback === "ended"
                  ? "Watch again"
                  : isTrailer
                    ? "Watch trailer"
                    : "Watch presentation"}
              </span>
              <span className="film-hover-label meta">
                PLAY <span aria-hidden="true">▸</span> {media.duration}
              </span>
            </button>
          ) : null}

          {playback === "loading" ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="flex items-center gap-2 rounded-control border border-rule-strong bg-surface px-4 py-3 text-sm text-ink shadow-lg">
                <span
                  aria-hidden="true"
                  className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-rule-strong border-t-action motion-reduce:animate-none"
                />
                Loading video…
              </span>
            </div>
          ) : null}
        </div>
        <div className="film-meta">
          <span className="text-slate">
            {playback === "playing"
              ? "Now playing"
              : playback === "paused"
                ? "Paused"
                : playback === "ended"
                  ? "Finished"
                  : playback === "loading"
                    ? "Loading video"
                    : isTrailer
                      ? "Project trailer"
                      : "Product film"}
          </span>
          <span className="flex items-center gap-3 text-slate">
            {media.format ? (
              <span className="film-format">{media.format}</span>
            ) : null}
            {media.duration ? (
              <span className="film-duration">{media.duration}</span>
            ) : null}
          </span>
        </div>
      </div>

      <figcaption className="film-caption">
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={playback === "error" ? "mt-2 text-ink" : "sr-only"}
        >
          {playback === "loading"
            ? "Loading video."
            : playback === "error"
              ? "Playback could not start. Retry or open the video below."
              : ""}
        </p>
        {playback === "error" ? (
          <button
            type="button"
            onClick={play}
            className="text-link focus-ring inline-flex min-h-11 items-center font-medium"
          >
            Retry playback
          </button>
        ) : null}
        <details className="film-resources">
          <summary className="focus-ring">Video notes &amp; downloads</summary>
          <div className="film-resource-content">
            {media.captions ? <p className="meta">RU captions</p> : null}
            {media.caption ? <p id={captionId}>{media.caption}</p> : null}
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {media.transcript ? (
                <a
                  href={media.transcript}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="film-resource focus-ring"
                  aria-label={`Read ${name} transcript (opens in a new tab)`}
                >
                  Transcript
                </a>
              ) : null}
              <a
                href={media.src}
                download
                className="film-resource focus-ring"
                aria-label={`Download ${name} video`}
              >
                Download video
              </a>
            </div>
          </div>
        </details>
      </figcaption>
    </figure>
  );
}
