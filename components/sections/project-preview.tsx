"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/portfolio";

type ProjectPreviewProps = {
  project: Project;
};

export function ProjectPreview({ project }: ProjectPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPreviewAsset = "previewAsset" in project;
  const isVideoPreview =
    hasPreviewAsset && "previewType" in project && project.previewType === "video";

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoPreview) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            // The loaded first frame remains visible if autoplay is unavailable.
          });
        } else {
          video.pause();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.2 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [isVideoPreview]);

  return (
    <div className="group relative min-h-[360px] overflow-hidden border hairline bg-ink-900 transition duration-500 hover:border-white/25">
      <div className="flex h-10 items-center gap-2 border-b hairline px-4">
        <span className="h-2 w-2 bg-zinc-500" />
        <span className="h-2 w-2 bg-zinc-600" />
        <span className="h-2 w-2 bg-signal-violet" />
      </div>

      <div className="technical-surface relative h-[320px] overflow-hidden p-6">
        {hasPreviewAsset ? (
          <>
            {isVideoPreview ? (
              <video
                ref={videoRef}
                src={project.previewAsset}
                aria-label={project.previewAlt}
                muted
                loop
                playsInline
                preload="metadata"
                controls={false}
                className="absolute inset-0 h-full w-full animate-[preview-fade-in_700ms_ease-out_both] object-cover object-center opacity-95 transition duration-500 group-hover:scale-[1.02]"
              />
            ) : (
              <Image
                src={project.previewAsset}
                alt={project.previewAlt}
                fill
                unoptimized
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="absolute inset-0 h-full w-full animate-[preview-fade-in_700ms_ease-out_both] object-cover object-center opacity-95 transition duration-500 group-hover:scale-[1.02]"
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.04),rgba(8,8,8,0.08)_42%,rgba(8,8,8,0.72))]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.34),rgba(8,8,8,0)_42%,rgba(8,8,8,0.22))]" />
          </>
        ) : "previewStats" in project ? (
          <div className="absolute inset-0 p-6 pb-20">
            <div className="grid h-full grid-rows-[auto_1fr] border hairline bg-black/35 p-5">
              <div className="flex items-center justify-between border-b hairline pb-4 font-mono text-[0.66rem] uppercase tracking-caps">
                <span className="text-zinc-500">Document automation system</span>
                <span className="flex items-center gap-2 text-zinc-300">
                  <span className="h-1.5 w-1.5 bg-signal-violet shadow-[0_0_12px_rgba(176,38,255,0.7)]" />
                  Operational
                </span>
              </div>

              <div className="grid grid-cols-2 content-center border-l border-t hairline">
                {project.previewStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="min-h-24 border-b border-r hairline p-4"
                  >
                    <p className="text-3xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-caps text-zinc-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
          <div className="absolute inset-x-8 bottom-20 h-px bg-signal-violet/45" />
          <div className="absolute bottom-20 right-8 top-8 w-px bg-white/10" />
        </div>

        <div className="relative z-10 flex h-full items-end justify-between gap-4">
          <h3 className="text-4xl font-semibold uppercase leading-none text-white md:text-5xl">
            {project.name}
          </h3>
          <div className="mb-1 border border-white/12 bg-black/20 p-2 transition duration-500 group-hover:border-signal-violet/35 group-hover:bg-black/30">
            <ArrowUpRight
              aria-hidden="true"
              className="h-5 w-5 text-zinc-400 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
