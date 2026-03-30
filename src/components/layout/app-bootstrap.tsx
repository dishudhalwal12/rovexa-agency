"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type AppBootstrapProps = {
  children: React.ReactNode;
};

const splashExitDurationMs = 700;

function waitForWordmark() {
  return new Promise<void>((resolve) => {
    const image: HTMLImageElement = new window.Image();
    const finish = () => resolve();

    image.onload = finish;
    image.onerror = finish;
    image.src = "/images/rovexa-wordmark-hero.png";

    if (image.complete) {
      finish();
      return;
    }

    if (typeof image.decode === "function") {
      image
        .decode()
        .then(finish)
        .catch(() => undefined);
    }
  });
}

export function AppBootstrap({ children }: AppBootstrapProps) {
  const [isReady, setIsReady] = useState(false);
  const [isSplashMounted, setIsSplashMounted] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fontsReady =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready
        : Promise.resolve();

    Promise.all([fontsReady, waitForWordmark()]).then(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (isMounted) {
            setIsReady(true);
          }
        });
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsSplashMounted(false);
    }, splashExitDurationMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isReady]);

  useEffect(() => {
    document.documentElement.style.overflow = isSplashMounted ? "hidden" : "";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isSplashMounted]);

  return (
    <>
      {children}

      {isSplashMounted ? (
        <div
          data-bootstrap-overlay="true"
          className={`fixed inset-0 z-[999] overflow-hidden bg-[var(--background)] transition-[opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isReady ? "pointer-events-none opacity-0 blur-[10px]" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(243,231,191,0.05),transparent_30%)]" />
          <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(circle_at_center,black_18%,transparent_72%)]" />

          <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
            <div
              className={`relative flex justify-center transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isReady ? "translate-y-5 scale-[0.98] opacity-0" : "translate-y-0 scale-100 opacity-100"
              }`}
            >
              <div className="pointer-events-none absolute inset-[-16%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_60%)] blur-3xl" />
              <Image
                src="/images/rovexa-wordmark-hero.png"
                alt="Rovexa"
                width={1440}
                height={823}
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 88vw, 720px"
                className="relative z-10 h-auto w-[min(88vw,720px)] object-contain drop-shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
              />
            </div>

            <div
              className={`mt-8 flex items-center justify-center gap-3 transition-[opacity,transform] duration-700 delay-75 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isReady ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
              }`}
              aria-label="Loading"
            >
              <span className="splash-dot" />
              <span className="splash-dot" />
              <span className="splash-dot" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
