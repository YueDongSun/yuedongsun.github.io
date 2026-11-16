import styles from './memory_scene.module.css';

// The lattice is illustrative. Its six-by-six sampling describes spatial depth,
// not the number of modes in an experiment. Edit the two basis vectors to change
// the perspective; the selected position is shared with the optical paths below.
const mode_count = 6;
const lattice = Array.from({ length: mode_count * mode_count }, (_, index) => {
  const column = index % mode_count;
  const row = Math.floor(index / mode_count);
  return {
    column,
    row,
    x: 190 + (column + 0.5) * 42 + (row + 0.5) * 40,
    y: 330 + (column + 0.5) * 19.5 - (row + 0.5) * 21,
  };
}).sort((left, right) => left.y - right.y);

function Mode_waist({ selected = false }: { selected?: boolean }) {
  return (
    <g className={selected ? styles.selectedWaist : styles.modeWaist}>
      <path className={styles.waistFill} d="M -12 -41 C -8 -30 -7 -28 -7 -23 C -7 -18 -10 -12 -13 -7 A 13 5 0 0 0 13 -7 C 10 -12 7 -18 7 -23 C 7 -28 8 -30 12 -41 Z" />
      <path d="M -12 -41 C -8 -30 -7 -28 -7 -23 C -7 -18 -10 -12 -13 -7 M 12 -41 C 8 -30 7 -28 7 -23 C 7 -18 10 -12 13 -7" />
      <ellipse cx="0" cy="-41" rx="12" ry="4.4" />
      <ellipse className={styles.waistMiddle} cx="0" cy="-23" rx="7" ry="2.8" />
      <ellipse cx="0" cy="-7" rx="13" ry="5" />
      <path className={styles.modeAxis} d="M 0 -48 V 1" />
    </g>
  );
}

/**
 * One 12 s cycle, driven entirely by the parent's --scene-duration:
 * 0–12% anticipate/address; 12–31% incident packet; 31–49% local hold;
 * 49–78% retrieval/propagation; 78–91% remote resting response; 91–100% reset.
 * The unanimated composition is a complete poster with all three optical stages.
 */
export function Memory_scene({ prefix }: { prefix: string }) {
  const plane_id = `${prefix}-memory-plane`;
  const ribbon_id = `${prefix}-memory-ribbon`;
  const waist_id = `${prefix}-memory-waist`;

  return (
    <>
      <defs>
        <linearGradient id={plane_id} x1="0" y1="0" x2="0.55" y2="1">
          <stop offset="0" stopColor="var(--scene-paper)" />
          <stop offset="1" stopColor="var(--scene-plane)" />
        </linearGradient>
        <linearGradient id={ribbon_id} x1="437" y1="321" x2="829" y2="144" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--scene-ink)" stopOpacity="0.06" />
          <stop offset="0.48" stopColor="var(--scene-ink)" stopOpacity="0.1" />
          <stop offset="1" stopColor="var(--scene-ink)" stopOpacity="0.03" />
        </linearGradient>
        <radialGradient id={waist_id}>
          <stop offset="0" stopColor="var(--scene-ink)" stopOpacity="0.2" />
          <stop offset="1" stopColor="var(--scene-ink)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className={styles.scene}>
        {/* The distant memory is smaller and higher in the same projection. */}
        <path className={styles.remoteShadow} d="M 741 205 L 828 247 L 924 198 L 837 159 Z" />
        <path className={styles.remoteSide} d="M 749 193 L 827 230 L 913 187 V 197 L 827 240 L 749 203 Z" />
        <path className={styles.remotePlane} fill={`url(#${plane_id})`} d="M 749 193 L 835 150 L 913 187 L 827 230 Z" />
        <path className={styles.remoteEtch} d="M 767 193 L 835 159 L 894 187 L 827 221 Z M 749 193 L 827 230 V 240 M 827 230 L 913 187" />
        <g className={styles.remoteVolume}>
          <path className={styles.remoteFill} d="M 797 126 C 805 139 810 152 803 180 A 27 10 0 0 0 857 180 C 850 152 855 139 863 126 Z" />
          <ellipse cx="830" cy="126" rx="33" ry="12" />
          <path d="M 797 126 C 805 139 810 152 803 180 M 863 126 C 855 139 850 152 857 180" />
          <ellipse className={styles.remoteSection} cx="830" cy="152" rx="22" ry="8" />
          <ellipse cx="830" cy="180" rx="27" ry="10" />
          <path className={styles.remoteAxis} d="M 830 104 V 197" />
          <ellipse className={styles.remoteBase} cx="830" cy="194" rx="44" ry="17" />
        </g>

        {/* A thin engraved support plane gives every mode an unambiguous depth. */}
        <path className={styles.groundShadow} d="M 177 350 L 440 478 L 704 338 L 439 218 Z" />
        <path className={styles.slabSide} d="M 190 330 L 442 447 L 682 321 V 335 L 442 461 L 190 344 Z" />
        <path className={styles.slabPlane} fill={`url(#${plane_id})`} d="M 190 330 L 430 204 L 682 321 L 442 447 Z" />
        <path className={styles.slabEdge} d="M 190 330 L 442 447 L 682 321 M 442 447 V 461 M 190 337 L 442 454 L 682 328" />
        <path className={styles.inset} d="M 212 329 L 430 215 L 660 322 L 442 436 Z" />
        {Array.from({ length: 5 }, (_, index) => {
          const step = index + 1;
          return <g key={step} className={styles.registration}>
            <path d={`M ${190 + step * 42} ${330 + step * 19.5} l 7 -3.7 M ${442 + step * 40} ${447 - step * 21} l -7 -3.2`} />
            <path d={`M ${190 + step * 40} ${330 - step * 21} l 7 3.2 M ${430 + step * 42} ${204 + step * 19.5} l -7 3.7`} />
          </g>;
        })}
        <g className={styles.address}>
          <path pathLength="100" d="M 290 277.5 L 542 394.5 M 337 398.25 L 577 272.25" />
          <ellipse cx="437" cy="345.75" rx="25" ry="11" />
        </g>
        {lattice.map(({ column, row, x, y }) => (
          <g key={`${column}-${row}`} transform={`translate(${x} ${y})`}>
            <ellipse className={styles.modeFoot} cx="0" cy="0" rx="18" ry="7" />
            <Mode_waist selected={column === 3 && row === 2} />
          </g>
        ))}

        {/* Incident wavefronts converge on the selected spatial address. */}
        <path className={styles.incidentEnvelope} d="M 82 177 C 214 202 345 275 437 321 C 319 295 190 278 68 249 Z" />
        <path className={styles.incidentGuide} d="M 82 177 C 214 202 345 275 437 321 M 68 249 C 190 278 319 295 437 321" />
        <path className={styles.incidentAxis} d="M 73 215 L 437 321" />
        <g className={styles.incidentPacket}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <ellipse key={index} cx={-index * 15} cy="0" rx={4.4 + index * 0.3} ry={17 + index * 2.1} opacity={1 - index * 0.11} />
          ))}
        </g>
        <g className={styles.localHold}>
          <ellipse fill={`url(#${waist_id})`} className={styles.holdField} cx="437" cy="325" rx="40" ry="32" />
          <ellipse className={styles.holdRing} cx="437" cy="305" rx="18" ry="7" />
          <ellipse className={styles.holdRing} cx="437" cy="325" rx="12" ry="5" />
          <ellipse className={styles.holdRing} cx="437" cy="339" rx="18" ry="7" />
          <path className={styles.holdContour} d="M 419 305 C 429 313 430 318 425 325 C 430 331 426 336 419 339 M 455 305 C 445 313 444 318 449 325 C 444 331 448 336 455 339" />
        </g>

        {/* The optical corridor is a broad spatial arc, never a network edge. */}
        <path className={styles.opticalRibbon} fill={`url(#${ribbon_id})`} d="M 431 320 C 441 150 653 60 835 132 L 823 156 C 651 94 463 179 443 322 Z" />
        <path className={styles.ribbonEdge} d="M 431 320 C 441 150 653 60 835 132 M 443 322 C 463 179 651 94 823 156" />
        <path className={styles.ribbonAxis} d="M 437 321 C 451 164 652 76 829 144" />
        <path className={styles.ribbonInner} d="M 434 320 C 446 157 652 68 832 138 M 440 322 C 457 172 652 85 826 150" />
        <g className={styles.networkPacket}>
          {[-24, -12, 0, 12, 24].map((position, index) => (
            <ellipse key={position} cx={position} cy="0" rx="3.5" ry={11 + Math.sin(index * Math.PI / 4) * 3} opacity={0.35 + Math.sin(index * Math.PI / 4) * 0.65} />
          ))}
        </g>
        <g className={styles.remoteResponse}>
          <ellipse fill={`url(#${waist_id})`} className={styles.holdField} cx="830" cy="152" rx="45" ry="39" />
          <ellipse cx="830" cy="126" rx="33" ry="12" />
          <ellipse cx="830" cy="152" rx="22" ry="8" />
          <ellipse cx="830" cy="180" rx="27" ry="10" />
          <path d="M 797 126 C 805 139 810 152 803 180 M 863 126 C 855 139 850 152 857 180" />
        </g>
      </g>
    </>
  );
}
