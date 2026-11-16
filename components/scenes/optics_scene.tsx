import styles from './optics_scene.module.css';

// The host is a conceptual oblique crystal, not an experimental apparatus.
// Move the site and every optical/level leader together when changing the geometry.
const site = { x: 510, y: 282 };
const basis = { u: [35, 18], v: [-35, 18], w: [0, -40] };

function lattice_point(i: number, j: number, k: number) {
  return [site.x + basis.u[0] * i + basis.v[0] * j, site.y + basis.u[1] * i + basis.v[1] * j + basis.w[1] * k];
}

function Host_lattice() {
  const bonds: Array<[number[], number[]]> = [];
  const points: number[][] = [];
  for (let k = -1; k <= 1; k++) {
    for (let j = -1; j <= 1; j++) {
      for (let i = -1; i <= 1; i++) {
        const point = lattice_point(i, j, k);
        if (i < 1) bonds.push([point, lattice_point(i + 1, j, k)]);
        if (j < 1) bonds.push([point, lattice_point(i, j + 1, k)]);
        if (k < 1) bonds.push([point, lattice_point(i, j, k + 1)]);
        if (i || j || k) points.push(point);
      }
    }
  }
  return (
    <g className={styles.lattice}>
      {bonds.map(([a, b], index) => <path key={`bond-${index}`} d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]}`} />)}
      {points.map(([x, y], index) => <circle key={`host-${index}`} cx={x} cy={y} r="2.4" />)}
    </g>
  );
}

/** All moving elements share the parent's cycle; the CSS percentages form one story. */
export function Optics_scene({ prefix }: { prefix: string }) {
  return (
    <g className={styles.scene} data-scene-art="optics">
      <defs>
        <linearGradient id={`${prefix}-crystal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--scene-highlight)" stopOpacity=".56" />
          <stop offset=".57" stopColor="var(--scene-plane)" stopOpacity=".18" />
          <stop offset="1" stopColor="var(--scene-mid)" stopOpacity=".12" />
        </linearGradient>
        <linearGradient id={`${prefix}-incident`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--scene-ink)" stopOpacity="0" />
          <stop offset=".6" stopColor="var(--scene-ink)" stopOpacity=".035" />
          <stop offset="1" stopColor="var(--scene-ink)" stopOpacity=".12" />
        </linearGradient>
        <radialGradient id={`${prefix}-site`}>
          <stop offset="0" stopColor="var(--scene-ink)" stopOpacity=".2" />
          <stop offset="1" stopColor="var(--scene-ink)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${prefix}-shadow`}>
          <stop offset="0" stopColor="var(--scene-ink)" stopOpacity=".065" />
          <stop offset="1" stopColor="var(--scene-ink)" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${prefix}-incident-clip`}>
          <path d="M63 220 C235 231 387 270 510 282 C385 296 233 333 63 344 Z" />
        </clipPath>
      </defs>

      {/* A restrained contact shadow and the back face establish a single spatial object. */}
      <ellipse cx="520" cy="444" rx="165" ry="26" fill={`url(#${prefix}-shadow)`} />
      <g className={styles.crystalBack}>
        <path d="M414 169 L529 104 L650 166 L650 307 L535 374 L414 311 Z" />
        <path d="M529 104 L529 244 L650 307 M529 244 L414 311" />
      </g>
      <path className={styles.topFacet} d="M380 214 L495 149 L529 104 L414 169 Z" />
      <path className={styles.topFacet} d="M495 149 L616 211 L650 166 L529 104 Z" />
      <path className={styles.sideFacet} d="M616 211 L650 166 L650 307 L616 352 Z" />
      <path className={styles.sideFacet} d="M616 352 L650 307 L535 374 L501 419 Z" />
      <path className={styles.crystalFace} fill={`url(#${prefix}-crystal)`} d="M380 214 L495 149 L616 211 L616 352 L501 419 L380 356 Z" />
      <g className={styles.facetLines}>
        <path d="M380 214 L501 278 L616 211 M501 278 L501 419" />
        <path d="M495 149 L501 278 M380 356 L501 278 L616 352" />
        <path d="M392 220 L392 346 M398 224 L398 349 M604 221 L604 340 M610 217 L610 344" />
      </g>
      <Host_lattice />

      {/* Faint envelope boundaries explain propagation even in the resting frame. */}
      <path className={styles.incidentEnvelope} fill={`url(#${prefix}-incident)`} d="M69 228 C248 242 381 268 510 282 C381 295 248 323 69 336 Z" />
      <g className={styles.guides}>
        <path d="M70 228 C248 242 381 268 510 282 M70 336 C248 323 381 295 510 282" />
        <path d="M510 282 C633 236 758 185 913 139 M510 282 C644 273 787 253 913 238" />
      </g>
      <g className={styles.incidentGhost}>
        <path d="M103 239 Q82 282 103 325 M166 244 Q147 282 166 320 M229 254 Q213 282 229 311" />
      </g>
      <g clipPath={`url(#${prefix}-incident-clip)`}>
        <g transform={`translate(${site.x} ${site.y})`}>
          <g className={styles.incidentPacket}>
            {Array.from({ length: 8 }, (_, index) => {
              const x = -386 + index * 23;
              const height = 47 - index * 2.8;
              return <path key={index} d={`M${x} ${-height} Q${x - 21} 0 ${x} ${height}`} opacity={.34 + Math.sin((index + 1) / 9 * Math.PI) * .66} />;
            })}
          </g>
        </g>
      </g>

      {/* The site is a lattice substitution, not a free-floating atom pictogram. */}
      <g transform={`translate(${site.x} ${site.y})`}>
        <circle className={styles.siteAura} r="53" fill={`url(#${prefix}-site)`} />
        <g className={styles.siteShell}>
          <path d="M0 -23 L20 -11 L20 12 L0 24 L-20 12 L-20 -11 Z" />
          <path d="M0 -23 V-11 M20 12 L11 6 M-20 12 L-11 6" />
        </g>
        <circle className={styles.siteUnderlay} r="9" />
        <circle className={styles.siteCore} r="5.5" />
        <path className={styles.siteResponse} d="M-32 -18 Q0 -40 32 -18 M-32 18 Q0 40 32 18" />
      </g>

      {/* Response wavefronts open along the outgoing cone after the state transition. */}
      <g transform={`translate(${site.x} ${site.y}) rotate(-16)`}>
        <g className={styles.responseGhost}>
          <path d="M236 -33 Q253 0 236 33 M301 -41 Q323 0 301 41 M366 -49 Q393 0 366 49" />
        </g>
        <g className={styles.responsePacket}>
          {Array.from({ length: 7 }, (_, index) => {
            const x = 186 + index * 27;
            const height = 26 + index * 3.6;
            return <path key={index} d={`M${x} ${-height} Q${x + height * .48} 0 ${x} ${height}`} opacity={.3 + Math.sin((index + 1) / 8 * Math.PI) * .7} />;
          })}
        </g>
      </g>

      {/* The leader ties the unscaled two-level picture to this exact local site. */}
      <path className={styles.levelLeader} d="M531 295 L675 365 L729 365" />
      <circle className={styles.leaderEnd} cx="729" cy="365" r="2.4" />
      <g className={styles.levels}>
        <path className={styles.upperLevel} d="M755 350 H905" />
        <path className={styles.lowerLevel} d="M755 430 H905" />
        <path className={styles.levelTicks} d="M755 346 V354 M905 346 V354 M755 426 V434 M905 426 V434" />
        <g className={styles.excitationArrow}>
          <path d="M781 419 V363 M777 369 L781 362 L785 369" />
        </g>
        <g className={styles.responseArrow}>
          <path d="M876 363 V419 M872 413 L876 420 L880 413" />
        </g>
        <g className={styles.occupation}>
          <circle className={styles.occupationGround} cx="828" cy="430" r="8" />
          <circle cx="828" cy="430" r="4.5" />
        </g>
      </g>
    </g>
  );
}
