"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, type Variants, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent
} from "react";
import { AuditButton } from "@/components/ui/audit-button";

const services = [
  {
    key: "marketing",
    label: "Marketing",
    title: "People scroll past a hundred brands a day.",
    description:
      "Yours should be the one they remember, save, and send to someone else.",
    details: ["campaign strategy", "content direction", "smart reach"]
  },
  {
    key: "branding",
    label: "Creative Branding",
    title: "First impressions do not wait around.",
    description:
      "We make sure yours lands clean, fast, and hard to forget.",
    details: ["identity systems", "art direction", "voice and tone"]
  },
  {
    key: "tech",
    label: "Tech",
    title: "A slow, awkward website quietly loses clients.",
    description:
      "We fix the experience before the opportunity disappears.",
    details: ["web experiences", "conversion journeys", "system design"]
  },
  {
    key: "operations",
    label: "Operations & Distribution",
    title: "The best brands still miss deadlines.",
    description:
      "We make sure that does not become your reputation.",
    details: ["delivery systems", "distribution support", "operational flow"]
  }
] as const;

type Service = (typeof services)[number];

const characterCursors = {
  pinda: {
    src: "/images/pinda.png",
    label: "Pinda"
  },
  ranveer: {
    src: "/images/ranveer.png",
    label: "Ranveer"
  }
} as const;

type CharacterCursor = keyof typeof characterCursors;

const socialProofAvatars = [
  {
    src: "/images/pinda.png",
    alt: "Client placeholder avatar 1"
  },
  {
    src: "/images/ranveer.png",
    alt: "Client placeholder avatar 2"
  },
  {
    src: "/images/element.png",
    alt: "Client placeholder avatar 3"
  },
  {
    src: "/images/logo.png",
    alt: "Client placeholder avatar 4"
  }
] as const;

const cursorImageSize = 180;
const cursorFaceInset = 40;
const heroCountdownDurationMinutes = 20;
const heroCountdownDurationSeconds = heroCountdownDurationMinutes * 60;
const heroCountdownStorageKey = "rovexa:hero-countdown";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

function LoopLine({
  className,
  path
}: {
  className: string;
  path: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 200"
      className={`pointer-events-none absolute text-white/14 ${className}`}
      fill="none"
    >
      <path d={path} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function FlowerBadge({ className }: { className: string }) {
  return (
    <div
      className={`liquid-card pointer-events-none absolute hidden h-20 w-20 items-center justify-center rounded-full md:flex ${className}`}
    >
      <div className="relative h-11 w-11 overflow-hidden rounded-full">
        <Image src="/images/logo.png" alt="" fill sizes="44px" className="object-cover" />
      </div>
    </div>
  );
}

function HeroSocialProof() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div aria-hidden="true" className="mt-7 h-10 w-full" />;
  }

  return (
    <div
      aria-label="Trusted by our clients, 10 plus brands grown"
      className="mx-auto mt-7 inline-flex items-center justify-center gap-3.5 opacity-[0.92] sm:gap-4"
    >
      <div className="flex items-center -space-x-[11px]">
        {socialProofAvatars.map((avatar) => (
          <div
            key={avatar.src}
            className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[var(--background)] bg-white/8 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
          >
            <Image
              src={avatar.src}
              alt={avatar.alt}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="text-left">
        <p className="font-hand text-[15px] leading-none text-[color:rgba(250,249,246,0.88)]">
          trusted by our clients
        </p>
        <p className="mt-1 text-[11px] leading-none tracking-[0.02em] text-[color:rgba(250,249,246,0.62)]">
          10+ brands grown
        </p>
      </div>
    </div>
  );
}

function HeroCountdownInline() {
  const reduceMotion = useReducedMotion();
  const [remainingMinutes, setRemainingMinutes] = useState(heroCountdownDurationMinutes);
  const [hasMounted, setHasMounted] = useState(false);
  const startedAtRef = useRef<number | null>(null);
  const intervalDelayRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const persistCountdown = (startedAt: number, nextRemainingMinutes: number) => {
    window.localStorage.setItem(
      heroCountdownStorageKey,
      JSON.stringify({
        startedAt,
        remainingMinutes: nextRemainingMinutes
      })
    );
  };

  const clearTimerLoop = () => {
    if (intervalDelayRef.current !== null) {
      window.clearTimeout(intervalDelayRef.current);
      intervalDelayRef.current = null;
    }

    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const syncCountdown = () => {
    const now = Date.now();

    if (startedAtRef.current === null) {
      let nextStartedAt = now;
      const savedCountdown = window.localStorage.getItem(heroCountdownStorageKey);

      if (savedCountdown) {
        try {
          const parsedCountdown = JSON.parse(savedCountdown) as {
            startedAt?: number;
          };

          if (
            typeof parsedCountdown.startedAt === "number" &&
            now >= parsedCountdown.startedAt &&
            now - parsedCountdown.startedAt < heroCountdownDurationSeconds * 1000
          ) {
            nextStartedAt = parsedCountdown.startedAt;
          }
        } catch {
          window.localStorage.removeItem(heroCountdownStorageKey);
        }
      }

      startedAtRef.current = nextStartedAt;
    }

    const elapsedMilliseconds = now - startedAtRef.current;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

    if (elapsedSeconds >= heroCountdownDurationSeconds) {
      window.localStorage.removeItem(heroCountdownStorageKey);
      startedAtRef.current = now;
      setRemainingMinutes(heroCountdownDurationMinutes);
      persistCountdown(now, heroCountdownDurationMinutes);
      return;
    }

    const nextRemainingMinutes = heroCountdownDurationMinutes - Math.floor(elapsedSeconds / 60);
    setRemainingMinutes((previousMinutes) =>
      previousMinutes === nextRemainingMinutes ? previousMinutes : nextRemainingMinutes
    );
    persistCountdown(startedAtRef.current, nextRemainingMinutes);
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) {
      return;
    }

    syncCountdown();

    const scheduleMinuteLoop = () => {
      if (startedAtRef.current === null) {
        return;
      }

      const elapsedMilliseconds = Date.now() - startedAtRef.current;
      const elapsedIntoCurrentMinute = elapsedMilliseconds % 60000;
      const nextMinuteBoundaryDelay =
        elapsedIntoCurrentMinute === 0 ? 60000 : 60000 - elapsedIntoCurrentMinute;

      intervalDelayRef.current = window.setTimeout(() => {
        syncCountdown();
        intervalRef.current = window.setInterval(() => {
          syncCountdown();
        }, 60000);
      }, nextMinuteBoundaryDelay);
    };

    scheduleMinuteLoop();

    return () => {
      clearTimerLoop();
    };
  }, [hasMounted]);

  if (!hasMounted) {
    return <span suppressHydrationWarning>{heroCountdownDurationMinutes}</span>;
  }

  return (
    <span
      suppressHydrationWarning
      className="relative inline-flex min-w-[1.3ch] overflow-visible align-baseline px-[0.02em] py-[0.08em] leading-[1.15]"
    >
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={remainingMinutes}
          initial={
            reduceMotion
              ? false
              : { y: 4, opacity: 0, clipPath: "inset(100% 0 0 0)" }
          }
          animate={
            reduceMotion
              ? undefined
              : { y: 0, opacity: 1, clipPath: "inset(0 0 0 0)" }
          }
          exit={
            reduceMotion
              ? undefined
              : { y: -4, opacity: 0, clipPath: "inset(0 0 100% 0)" }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
          }
          className="inline-block"
        >
          {remainingMinutes}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function HeroHeadline() {
  const reduceMotion = useReducedMotion();
  const [isCursorEnabled, setIsCursorEnabled] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(false);
  const [displayCharacter, setDisplayCharacter] = useState<CharacterCursor | null>(null);
  const [isCharacterVisible, setIsCharacterVisible] = useState(false);
  const cursorShellRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const switchTimeoutRef = useRef<number | null>(null);
  const isSwitchingRef = useRef(false);
  const isInsideRef = useRef(false);
  const cursorEnabledRef = useRef(false);
  const displayCharacterRef = useRef<CharacterCursor | null>(null);
  const pendingCharacterRef = useRef<CharacterCursor | null>(null);
  const targetPointRef = useRef({ x: -120, y: -120 });
  const currentPointRef = useRef({ x: -120, y: -120 });

  const paintCursor = (x: number, y: number) => {
    if (!cursorShellRef.current) {
      return;
    }

    cursorShellRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const stopCursorLoop = () => {
    if (animationFrameRef.current === null) {
      return;
    }

    window.cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
  };

  const clearSwitchTimeout = () => {
    if (switchTimeoutRef.current === null) {
      return;
    }

    window.clearTimeout(switchTimeoutRef.current);
    switchTimeoutRef.current = null;
  };

  const startCursorLoop = () => {
    if (animationFrameRef.current !== null || !isInsideRef.current) {
      return;
    }

    const tick = () => {
      if (!isInsideRef.current) {
        animationFrameRef.current = null;
        return;
      }

      const ease = reduceMotion ? 1 : 0.15;
      const dx = targetPointRef.current.x - currentPointRef.current.x;
      const dy = targetPointRef.current.y - currentPointRef.current.y;

      currentPointRef.current = {
        x: currentPointRef.current.x + dx * ease,
        y: currentPointRef.current.y + dy * ease
      };

      paintCursor(currentPointRef.current.x, currentPointRef.current.y);
      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);
  };

  const updatePointerPosition = (
    event: ReactPointerEvent<HTMLElement>,
    options?: { snap?: boolean }
  ) => {
    if (!cursorEnabledRef.current) {
      return;
    }

    const nextPoint = {
      x: event.clientX,
      y: event.clientY
    };

    targetPointRef.current = nextPoint;

    if (options?.snap || currentPointRef.current.x < 0 || currentPointRef.current.y < 0) {
      currentPointRef.current = nextPoint;
      paintCursor(nextPoint.x, nextPoint.y);
    }
  };

  const syncDisplayedCharacter = (character: CharacterCursor) => {
    displayCharacterRef.current = character;
    pendingCharacterRef.current = character;
    setDisplayCharacter(character);
  };

  const transitionToCharacter = (character: CharacterCursor) => {
    pendingCharacterRef.current = character;

    if (!displayCharacterRef.current) {
      syncDisplayedCharacter(character);
      setIsCharacterVisible(true);
      return;
    }

    if (displayCharacterRef.current === character && !isSwitchingRef.current) {
      setIsCharacterVisible(true);
      return;
    }

    if (reduceMotion) {
      clearSwitchTimeout();
      isSwitchingRef.current = false;
      syncDisplayedCharacter(character);
      setIsCharacterVisible(true);
      return;
    }

    if (isSwitchingRef.current) {
      return;
    }

    isSwitchingRef.current = true;
    setIsCharacterVisible(false);

    switchTimeoutRef.current = window.setTimeout(() => {
      const nextCharacter = pendingCharacterRef.current ?? character;
      syncDisplayedCharacter(nextCharacter);
      setIsCharacterVisible(true);
      isSwitchingRef.current = false;
      switchTimeoutRef.current = null;
    }, 200);
  };

  const resolveCharacterFromPosition = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return event.clientX < bounds.left + bounds.width / 2 ? "pinda" : "ranveer";
  };

  const updateActiveCharacterFromPosition = (
    event: ReactPointerEvent<HTMLDivElement>,
    options?: { snap?: boolean }
  ) => {
    updatePointerPosition(event, options);
    transitionToCharacter(resolveCharacterFromPosition(event));
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateCursorCapability = () => {
      const isEnabled = mediaQuery.matches;
      cursorEnabledRef.current = isEnabled;
      setIsCursorEnabled(isEnabled);
    };

    updateCursorCapability();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateCursorCapability);

      return () => {
        mediaQuery.removeEventListener("change", updateCursorCapability);
      };
    }

    mediaQuery.addListener(updateCursorCapability);

    return () => {
      mediaQuery.removeListener(updateCursorCapability);
    };
  }, []);

  useEffect(() => {
    if (!isCursorEnabled) {
      isInsideRef.current = false;
      clearSwitchTimeout();
      isSwitchingRef.current = false;
      displayCharacterRef.current = null;
      pendingCharacterRef.current = null;
      setIsCursorVisible(false);
      setDisplayCharacter(null);
      setIsCharacterVisible(false);
      targetPointRef.current = { x: -120, y: -120 };
      currentPointRef.current = { x: -120, y: -120 };
      paintCursor(-120, -120);
      stopCursorLoop();
      return;
    }

    Object.values(characterCursors).forEach(({ src }) => {
      const preloadedImage = new window.Image();
      preloadedImage.src = src;
      void preloadedImage.decode?.().catch(() => undefined);
    });
  }, [isCursorEnabled]);

  useEffect(() => {
    return () => {
      clearSwitchTimeout();
      stopCursorLoop();
    };
  }, []);

  return (
    <div
      className={`relative mx-auto flex w-full max-w-[760px] justify-center px-2 py-[24px] ${isCursorEnabled ? "cursor-none" : ""}`}
      onPointerEnter={(event) => {
        if (!cursorEnabledRef.current) {
          return;
        }

        isInsideRef.current = true;
        updatePointerPosition(event, { snap: true });
        const nextCharacter = resolveCharacterFromPosition(event);

        clearSwitchTimeout();
        isSwitchingRef.current = false;
        pendingCharacterRef.current = nextCharacter;
        syncDisplayedCharacter(nextCharacter);
        setIsCharacterVisible(true);
        setIsCursorVisible(true);
        startCursorLoop();
      }}
      onPointerMove={(event) => updateActiveCharacterFromPosition(event)}
      onPointerLeave={() => {
        isInsideRef.current = false;
        clearSwitchTimeout();
        isSwitchingRef.current = false;
        pendingCharacterRef.current = displayCharacterRef.current;
        setIsCharacterVisible(false);
        setIsCursorVisible(false);
        stopCursorLoop();
      }}
    >
      <motion.h1
        variants={itemVariants}
        className="font-heading max-w-[12ch] text-balance text-[clamp(3.25rem,7.1vw,6.35rem)] leading-[0.92] tracking-[-0.07em] text-[var(--foreground)]"
      >
        <span className="block">
          <span className="inline-block">
            Growth ki yaad
            <br />
          </span>
        </span>
        <span className="mt-1 block">
          <span className="bg-gradient-to-r from-[#faf9f6] via-[#f4d3a3] to-[#faf9f6] bg-clip-text text-transparent">
            nahi aayi,
          </span>
          <span className="text-[var(--foreground)]"> Jassi?</span>
        </span>
      </motion.h1>

      {isCursorEnabled ? (
        <div
          ref={cursorShellRef}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[10] will-change-transform"
          style={{ transform: "translate3d(-120px, -120px, 0)" }}
        >
          <div
            style={{
              transform:
                displayCharacter === "ranveer"
                  ? `translate3d(-${cursorImageSize - cursorFaceInset}px, -${cursorImageSize - cursorFaceInset}px, 0)`
                  : `translate3d(-${cursorFaceInset}px, -${cursorFaceInset}px, 0)`
            }}
          >
            <motion.div
              initial={false}
              animate={{
                opacity: isCursorVisible ? 1 : 0,
                scale: isCursorVisible ? 1 : 0.8
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
              }
              className="h-[180px] w-[180px] will-change-transform"
              style={{
                filter: "drop-shadow(0px 8px 24px rgba(0,0,0,0.5))"
              }}
            >
              <motion.div
                initial={false}
                animate={{ opacity: isCharacterVisible ? 1 : 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
                }
                className="h-full w-full bg-contain bg-center bg-no-repeat"
                style={{
                  backgroundImage: displayCharacter
                    ? `url(${characterCursors[displayCharacter].src})`
                    : undefined
                }}
              />
            </motion.div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const [activeService, setActiveService] = useState<Service>(services[0]);

  return (
    <main className="relative flex flex-1 items-center justify-center py-8 md:py-10 lg:py-2">
      <div className="relative min-h-[calc(100svh-8rem)] w-full overflow-hidden">
        <LoopLine
          className="-left-8 top-20 hidden h-56 w-72 lg:block"
          path="M20 130 C80 40, 150 36, 180 96 S280 170, 302 88"
        />
        <LoopLine
          className="-right-6 top-24 hidden h-56 w-80 lg:block"
          path="M18 92 C80 24, 124 20, 184 88 S280 168, 304 90"
        />
        <LoopLine
          className="bottom-24 left-0 hidden h-48 w-64 lg:block"
          path="M18 42 C70 112, 120 148, 186 102 S246 26, 302 86"
        />
        <LoopLine
          className="bottom-14 right-0 hidden h-48 w-64 lg:block"
          path="M24 98 C76 44, 136 24, 190 84 S260 164, 304 116"
        />

        <FlowerBadge className="left-[10%] top-[16%]" />
        <FlowerBadge className="right-[12%] top-[28%]" />
        <FlowerBadge className="right-[10%] bottom-[18%]" />

        <div className="liquid-card pointer-events-none absolute bottom-10 left-2 hidden h-28 w-28 rounded-[1.4rem] p-2 opacity-80 md:block lg:left-6 lg:h-36 lg:w-36">
          <div className="h-full w-full rounded-[1rem] border border-white/8 [background-image:linear-gradient(45deg,rgba(255,255,255,0.16)_12.5%,transparent_12.5%,transparent_50%,rgba(255,255,255,0.16)_50%,rgba(255,255,255,0.16)_62.5%,transparent_62.5%,transparent_100%)] [background-size:18px_18px] opacity-70" />
        </div>

        <div className="liquid-card pointer-events-none absolute right-4 top-[18%] hidden h-24 w-24 rounded-full md:block">
          <div className="absolute inset-[20%] rounded-full border border-white/18" />
          <div className="absolute left-[47%] top-[15%] h-[70%] w-px bg-white/18" />
          <div className="absolute left-[15%] top-[47%] h-px w-[70%] bg-white/18" />
        </div>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto flex min-h-[calc(100svh-8rem)] w-full max-w-[1120px] flex-col items-center justify-center pt-24 pb-12 text-center md:pt-28 md:pb-16 lg:pt-32 lg:pb-18"
        >
          <HeroHeadline />

          <motion.p
            variants={itemVariants}
            className="mt-3 max-w-[46rem] text-balance text-[1.05rem] leading-8 text-[var(--muted)] md:mt-4 md:text-[1.18rem]"
          >
            Give me <HeroCountdownInline /> minutes with your brand and I'll show you what's
            been missing.
          </motion.p>

          <motion.div variants={itemVariants}>
            <HeroSocialProof />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 md:mt-9"
          >
            <AuditButton size="hero" />

            <Link
              href="/services"
              className="relative text-sm text-[var(--muted)] transition duration-200 hover:text-[var(--foreground)]"
            >
              See what we shape
              <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-white/50 to-transparent" />
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex w-full flex-wrap items-center justify-center gap-3"
          >
            {services.map((service) => {
              const isActive = activeService.key === service.key;

              return (
                <button
                  key={service.key}
                  type="button"
                  onClick={() => setActiveService(service)}
                  className={`rounded-full border px-4 py-2.5 text-sm transition duration-200 ${
                    isActive
                      ? "border-white/14 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(242,236,226,0.92))] text-black shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
                      : "glass-pill text-[var(--muted)] hover:border-white/18 hover:bg-white/8 hover:text-[var(--foreground)]"
                  }`}
                >
                  {service.label}
                </button>
              );
            })}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="hero-visual-card relative mt-8 w-full max-w-[820px] overflow-hidden rounded-[2rem] border border-white/12 p-4 md:p-6"
          >
            <div className="pointer-events-none absolute inset-x-[18%] top-0 h-36 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_72%)] blur-3xl" />

            <div className="relative flex flex-wrap items-center justify-between gap-2">
              <span className="glass-pill rounded-full px-4 py-2 text-xs text-[var(--muted)]">
                Selected focus
              </span>
              <span className="glass-pill rounded-full px-4 py-2 text-xs text-[var(--muted-soft)]">
                Tap a pillar to shift the story
              </span>
            </div>

            <div className="relative mt-5 grid gap-4 md:grid-cols-[110px_minmax(0,1fr)] md:items-start">
              <div className="liquid-card relative flex h-[110px] w-[110px] items-center justify-center rounded-[1.6rem]">
                <div className="absolute inset-4 rounded-full border border-white/14" />
                <div className="absolute inset-[28%] rounded-full border border-white/10" />
                <div className="relative h-14 w-14 overflow-hidden rounded-full shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
                  <Image
                    src="/images/logo.png"
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="liquid-card min-h-[300px] rounded-[1.6rem] px-5 py-5 text-left md:min-h-[280px] md:px-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.key}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex min-h-[250px] flex-col md:min-h-[230px]"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--accent)]">
                      {activeService.label}
                    </p>
                    <h2 className="font-heading mt-3 max-w-[18ch] text-pretty text-2xl tracking-[-0.05em] text-[var(--foreground)] md:text-[2rem]">
                      {activeService.title}
                    </h2>
                    <p className="mt-3 max-w-[42ch] text-pretty text-sm leading-7 text-[var(--muted)] md:text-base">
                      {activeService.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {activeService.details.map((detail) => (
                        <span
                          key={detail}
                          className="glass-pill rounded-full px-3 py-2 text-[0.72rem] uppercase tracking-[0.14em] text-[var(--muted-soft)]"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
