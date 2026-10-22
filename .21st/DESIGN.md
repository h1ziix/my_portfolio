# Project Design Context

The current direction is **Launch tape**, selected by the user on 2026-10-22. It supersedes the previous color-only layout and its no-mono/no-numbering constraints. The canonical design context is `.21st/design.json`.

- Preserve all existing copy, facts, metrics, project status boundaries, links, videos, captions, transcripts and resume.
- Keep the existing warm paper and ink tokens, with flat surfaces, hairlines and 0–6px radii.
- Use Sofia Sans Condensed for display, Golos Text for body, and JetBrains Mono via next/font for metadata.
- Use a 12-column, 1280px grid with 24px gutters (16px mobile), fluid type and 96–180px section padding.
- Gradients appear only on tape: hero marquee band, project edges, skills underline, process rail and contact cross. At most one dominant tape motif per viewport.
- Project gradients: KazEcoFood ember, Agentic Ops ink, ATU Campus sand, StratWeb pitch. Supporting work uses ember at 60% opacity.
- Keep system/light/dark preference behavior and storage. Use CSS and IntersectionObserver; reduced motion shows all final states.
- Reuse ActionLink, SectionLabel, ThemeToggle, TechnologyIcon, ProjectLinks and native ProjectVideo behavior. New primitives are Ribbon and RevealInView.
- 21st inspiration search returned HTTP 401. The supplied design direction and existing primitives ground this implementation.
- Browser checks cover desktop, tablet and mobile widths, both themes, reduced motion, video playback, mobile navigation and case studies. Verification artifacts are in `output/playwright/`.

## Section composition (user update, 2026-10-22)

The supplied section-by-section specification supersedes the earlier hero film list and flat skill rows. Use the asymmetric 7/5 hero with a rotated reel and mobile scroll-snap carousel, exact count-up proof, and core-stack tape band. Selected projects are sticky chapters with outlined indexes and dark video frames; supporting work is an index table. Skills uses a dark five-cell bento with project filters grounded in the existing project/category and technology mappings. Experience uses a vertical tape timeline, while process is four horizontal steps on desktop and a rail on mobile. The contact finale retains “Get in touch”, crossed marquee tape, a giant copyable email, and the literal configurable profile placeholders. End with the 8% opacity full-name wordmark.

Header state changes after 24px and uses one sliding ribbon indicator. Navigation and reel use native dialogs with Escape and focus return. Reveals use 12px/320ms with 60ms stagger; the hero underline draws in 400ms. Keep native scrolling and pointer behavior. Reduced motion shows final counts, rails and content while preserving filter states.

## Final quality requirements

Check each of the six phases at 375, 1024 and 1440px in both themes on the development server; include 768 and 1280px in the final responsive sweep. All authored controls have a 44px minimum target, and focus uses a 2px accent outline with 2px offset. Sticky chapter columns begin at 1024px and the bento becomes one column below 768px. Filtered text retains AA-safe muted contrast; the 35% dimming applies to decorative borders. Marquee repetitions are hidden from assistive technology with the real message exposed once. Keep the decorative footer wordmark at 8% opacity as SVG artwork. All six videos have posters, reserved 16:9 frames and preload disabled. Measure Lighthouse against the production build in both explicitly selected themes.

## Star-field atmosphere (user update)

Preserve the complete Launch tape composition. A hydration-gated, dependency-free canvas supplies subtle ember sparks on paper and white crystals in dark mode; the dark skills section has a clipped local instance. Positions survive theme changes. The explicitly requested star glow is the sole exception to ribbon-only gradients: cache its radial texture and use it only for dark crystal stars. Keep 30fps, DPR capped at 2, area-based density capped at 160 per canvas, cached soft text masks, visibility/offscreen pauses and one static frame for reduced motion. The fixed static field uses a conservative uniform opacity mask so native scrolling never requires a repaint or compromises text contrast.
