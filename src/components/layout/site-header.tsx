"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const flowerIconRef = useRef<HTMLDivElement>(null);
  const transitionEndHandlerRef = useRef<((event: TransitionEvent) => void) | null>(null);
  const idleIntervalRef = useRef<number | null>(null);
  const isSpinningRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isIdleSpinningRef = useRef(false);

  const getRotationDegrees = (transformValue: string) => {
    if (transformValue === "none") {
      return 0;
    }

    const matrix3dMatch = transformValue.match(/^matrix3d\((.+)\)$/);

    if (matrix3dMatch) {
      const values = matrix3dMatch[1].split(",").map((value) => Number.parseFloat(value.trim()));
      const angle = Math.atan2(values[1] ?? 0, values[0] ?? 1) * (180 / Math.PI);
      return angle >= 0 ? angle : angle + 360;
    }

    const matrixMatch = transformValue.match(/^matrix\((.+)\)$/);

    if (!matrixMatch) {
      return 0;
    }

    const values = matrixMatch[1].split(",").map((value) => Number.parseFloat(value.trim()));
    const angle = Math.atan2(values[1] ?? 0, values[0] ?? 1) * (180 / Math.PI);
    return angle >= 0 ? angle : angle + 360;
  };

  const clearStopListener = (node: HTMLDivElement) => {
    if (!transitionEndHandlerRef.current) {
      return;
    }

    node.removeEventListener("transitionend", transitionEndHandlerRef.current);
    transitionEndHandlerRef.current = null;
  };

  const startFlowerSpin = () => {
    const node = flowerIconRef.current;

    if (!node) {
      return;
    }

    clearStopListener(node);

    const currentRotation = getRotationDegrees(window.getComputedStyle(node).transform);

    isIdleSpinningRef.current = false;
    node.style.transition = "none";
    node.style.transform = `rotate(${currentRotation}deg)`;
    node.classList.remove("is-spinning");

    void node.offsetWidth;

    node.style.animationDelay = `-${(currentRotation / 360) * 2}s`;
    node.classList.add("is-spinning");
    isSpinningRef.current = true;
  };

  const stopFlowerSpin = () => {
    const node = flowerIconRef.current;

    if (!node) {
      return;
    }

    clearStopListener(node);

    const currentRotation = getRotationDegrees(window.getComputedStyle(node).transform);
    const remainingDegrees = currentRotation < 0.5 ? 360 : 360 - currentRotation;

    isIdleSpinningRef.current = false;
    node.classList.remove("is-spinning");
    node.style.animationDelay = "0s";
    node.style.transform = `rotate(${currentRotation}deg)`;

    void node.offsetWidth;

    node.style.transition = "transform 600ms ease-out";
    node.style.transform = `rotate(${currentRotation + remainingDegrees}deg)`;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName !== "transform") {
        return;
      }

      node.style.transition = "none";
      node.style.transform = "";
      node.style.animationDelay = "0s";
      node.removeEventListener("transitionend", handleTransitionEnd);
      transitionEndHandlerRef.current = null;
      isSpinningRef.current = false;
    };

    transitionEndHandlerRef.current = handleTransitionEnd;
    node.addEventListener("transitionend", handleTransitionEnd);
  };

  const triggerIdleSpin = () => {
    const node = flowerIconRef.current;

    if (!node || isHoveredRef.current || isSpinningRef.current || isIdleSpinningRef.current) {
      return;
    }

    clearStopListener(node);

    const currentRotation = getRotationDegrees(window.getComputedStyle(node).transform);

    isIdleSpinningRef.current = true;
    node.classList.remove("is-spinning");
    node.style.animationDelay = "0s";
    node.style.transition = "none";
    node.style.transform = `rotate(${currentRotation}deg)`;

    void node.offsetWidth;

    node.style.transition = "transform 1500ms ease-in-out";
    node.style.transform = `rotate(${currentRotation + 360}deg)`;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName !== "transform") {
        return;
      }

      node.style.transition = "none";
      node.style.transform = "";
      node.removeEventListener("transitionend", handleTransitionEnd);
      transitionEndHandlerRef.current = null;
      isIdleSpinningRef.current = false;
    };

    transitionEndHandlerRef.current = handleTransitionEnd;
    node.addEventListener("transitionend", handleTransitionEnd);
  };

  const toggleFlowerSpin = () => {
    if (isSpinningRef.current) {
      stopFlowerSpin();
      return;
    }

    startFlowerSpin();
  };

  useEffect(() => {
    idleIntervalRef.current = window.setInterval(() => {
      triggerIdleSpin();
    }, 8000);

    return () => {
      const node = flowerIconRef.current;

      if (idleIntervalRef.current !== null) {
        window.clearInterval(idleIntervalRef.current);
      }

      if (node) {
        clearStopListener(node);
      }
    };
  }, []);

  return (
    <header className="relative z-[100] flex flex-col gap-4 py-2 lg:flex-row lg:items-center lg:justify-between">
      <Link
        href="/"
        className="mx-auto flex items-center gap-3 lg:mx-0"
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        onMouseEnter={() => {
          isHoveredRef.current = true;
          toggleFlowerSpin();
        }}
      >
        <div
          ref={flowerIconRef}
          className="relative h-11 w-11 overflow-hidden rounded-full ring-1 ring-white/10"
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src="/images/logo.png"
            alt="Rovexa flower logo"
            fill
            sizes="44px"
            className="object-cover"
          />
        </div>
        <span className="font-brand text-[1.9rem] leading-none tracking-[0.01em]">Rovexa</span>
      </Link>

      <nav
        aria-label="Primary"
        className="glass-pill relative z-[100] mx-auto flex w-full max-w-max flex-wrap items-center justify-center gap-2 rounded-[2rem] p-2 lg:mx-0"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-4 py-2.5 text-sm text-[var(--muted)] transition duration-200 hover:bg-white/8 hover:text-[var(--foreground)]"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/contact"
        className="glass-pill relative z-[50] mx-auto inline-flex min-h-13 items-center justify-center rounded-full px-6 text-sm font-medium text-[var(--foreground)] transition duration-200 hover:-translate-y-0.5 hover:border-white/30 lg:mx-0"
      >
        Get an audit
      </Link>
    </header>
  );
}
