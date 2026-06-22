// anim.jsx — Toolkit de animações de scroll da landing page.
// Componentes reutilizáveis baseados em IntersectionObserver:
//   <Reveal>   — revela (fade + slide) o conteúdo quando entra na viewport.
//   <CountUp>  — anima um número de 0 até o alvo quando entra na viewport.
// Tudo respeita prefers-reduced-motion (acessibilidade): sem motion, aparece direto.
import * as React from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Hook: dispara `true` na primeira vez que o elemento entra na viewport.
export function useInView(options) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  const opts = options || {};
  const threshold = opts.threshold != null ? opts.threshold : 0.15;
  const rootMargin = opts.rootMargin || "0px 0px -10% 0px";

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}

// <Reveal> — envolve o conteúdo e o revela com fade + deslize quando visível.
// Props: as (tag, default "div"), delay (ms), y/x (deslocamento px), duration (ms),
//        scale (0..1 inicial), threshold, style, className.
export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  duration = 720,
  threshold = 0.15,
  style,
  className,
  ...rest
}) {
  const [ref, inView] = useInView({ threshold });
  const Tag = as;
  const hiddenTransform =
    `translate3d(${x}px, ${y}px, 0)` + (scale !== 1 ? ` scale(${scale})` : "");
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "translate3d(0,0,0)" : hiddenTransform,
        transition:
          `opacity ${duration}ms ${EASE} ${delay}ms, ` +
          `transform ${duration}ms ${EASE} ${delay}ms`,
        willChange: "opacity, transform",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Formata um número no padrão pt-BR (milhar com "." e decimal com ",").
function formatPtBr(n, decimals) {
  const fixed = decimals > 0 ? n.toFixed(decimals) : String(Math.round(n));
  const parts = fixed.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return decimals > 0 ? parts.join(",") : parts[0];
}

// <CountUp> — anima de `from` até `to` ao entrar na viewport.
// Props: to, from (0), duration (ms), decimals, prefix, suffix, style, className.
export function CountUp({
  to,
  from = 0,
  duration = 1700,
  decimals = 0,
  prefix = "",
  suffix = "",
  style,
  className,
}) {
  const [ref, inView] = useInView({ threshold: 0.6 });
  const [value, setValue] = React.useState(from);
  const rafRef = React.useRef(0);
  const startedRef = React.useRef(false);

  React.useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    if (prefersReducedMotion()) {
      setValue(to);
      return;
    }

    const t0 =
      typeof performance !== "undefined" && performance.now
        ? performance.now()
        : Date.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const elapsed = now - t0;
      const p = Math.min(1, elapsed / duration);
      setValue(from + (to - from) * easeOutCubic(p));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(to);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, to, from, duration]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums", ...style }}
    >
      {prefix}
      {formatPtBr(value, decimals)}
      {suffix}
    </span>
  );
}
