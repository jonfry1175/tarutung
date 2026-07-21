"use client";

import { useEffect } from "react";

export function LocatorInit() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      void import("@locator/runtime").then((locator) => {
        locator.default();
      });
    }
  }, []);

  return null;
}
