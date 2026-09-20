"use client";

import { useEffect, useRef } from "react";
import { mountResolutionField } from "@/app/lib/resolution-field";

export default function ResolutionField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return mountResolutionField(ref.current);
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
