"use client";

import { useEffect, useState } from "react";

/** Motion is an enhancement: SSR and the first client render stay static. */
export function useMotionPreference() {
  const [canAnimate, setCanAnimate] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setCanAnimate(!preference.matches);

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  return canAnimate;
}
