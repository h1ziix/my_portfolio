import type { ProjectMedia } from "@/types/portfolio";

const previewPosters: Record<string, string> = {
  "/projects/campusforge-preview.mp4": "/projects/campusforge-poster.webp",
  "/projects/xeal-preview.mp4": "/projects/xeal-poster.webp",
  "/projects/i-like-yogurt-preview.mp4": "/projects/i-like-yogurt-poster.webp",
};

export function projectVideoPoster(media: ProjectMedia) {
  return media.poster ?? previewPosters[media.src];
}
