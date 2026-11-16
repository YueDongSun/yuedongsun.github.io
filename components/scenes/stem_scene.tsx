import styles from './stem_scene.module.css';

// This uncalibrated geometric surface is a visual problem, not a model result.
// u runs along the arch; v provides the shallow perspective extrusion.
function surface_point(u: number, v: number) {
  const rise = 112;
  return [130 + u * 190 + v * 46, 314 - Math.sin(u * Math.PI) * rise + v * 44 - u * 20];
}

function surface_curve(v: number, reverse = false) {
  return Array.from({ length: 33 }, (_, index) => {
    const [x, y] = surface_point(reverse ? 1 - index / 32 : index / 32, v);
    return `${index ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
  }).join(' ');
}

function Problem_surface() {
  return <g>
    <path d={`${surface_curve(0)} L366 338 ${surface_curve(1, true).replace('M', 'L')} Z`} className={styles.surfaceFill} />
    {Array.from({ length: 9 }, (_, index) => <path key={index} d={surface_curve(index / 8)} className={index === 0 || index === 8 ? styles.surfaceEdge : styles.surfaceRule} />)}
    {Array.from({ length: 13 }, (_, index) => {
      const a = surface_point(index / 12, 0);
      const b = surface_point(index / 12, 1);
      return <path key={index} d={`M${a.join(' ')} L${b.join(' ')}`} className={styles.surfaceRule} />;
    })}
    <path d={surface_curve(0.45)} className={styles.problemContour} />
  </g>;
}

/** 14 s: problem 0–14%; candidates 14–34%; comparison 34–49%;
 * feedback 49–67%; new attempt 67–81%; rest 81–93%; reset 93–100%.
 * Candidate origins and comparison paths below are the main geometry controls. */
export function Stem_scene({ prefix }: { prefix: string }) {
  const candidates = [
    { x: 422, y: 188, path: 'M0 20 C29 -51 94 -63 145 -1', className: styles.optionOne },
    { x: 446, y: 277, path: 'M0 20 C31 -29 96 -66 145 -1', className: styles.optionTwo },
    { x: 419, y: 363, path: 'M0 20 C31 -67 96 -30 145 -1', className: styles.optionThree },
  ];
  return <>
    <defs>
      <linearGradient id={`${prefix}-surface`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="var(--scene-highlight)" /><stop offset="1" stopColor="var(--scene-plane)" />
      </linearGradient>
      <pattern id={`${prefix}-hatch`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)">
        <path d="M0 0V7" stroke="var(--scene-mid)" strokeWidth="1.3" />
      </pattern>
      <linearGradient id={`${prefix}-ribbon`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="var(--scene-faint)" stopOpacity=".22" /><stop offset="1" stopColor="var(--scene-faint)" stopOpacity=".04" />
      </linearGradient>
    </defs>
    <g className={styles.engraving}>
      {/* A fixed construction provides a visual anchor through the entire loop. */}
      <path d="M92 346 304 404 389 347 M130 314 113 363 M320 294 351 358 M176 358 154 388 M366 338 378 365" className={styles.construction} />
      <path d="M113 363 351 358 378 365 154 388Z" className={styles.ground} />
      <path d="M119 363 351 358 M154 388 378 365" className={styles.construction} />
      <g style={{ fill: `url(#${prefix}-surface)` }}>
        <Problem_surface />
      </g>
      <g className={styles.constraints}>
        {[[151, 334], [341, 314], [246, 222]].map(([x, y], index) => <g key={index}>
          <path d={`M${x - 6} ${y}h12 M${x} ${y - 6}v12`} />
          <circle cx={x} cy={y} r="3.5" />
        </g>)}
      </g>

      {/* Related contours branch out of the same question in shallow depth. */}
      <g className={styles.branchGuides}>
        <path d="M350 278 C374 245 380 214 422 208" />
        <path d="M350 298 C392 293 410 295 446 297" />
        <path d="M359 317 C386 341 385 365 419 383" />
      </g>
      <g className={styles.candidates}>
        {candidates.map((candidate) => <g key={candidate.y} className={candidate.className} transform={`translate(${candidate.x} ${candidate.y})`}>
          <path d={`${candidate.path} l10 13 C98 -37 39 -38 10 33Z`} className={styles.candidatePlane} />
          <path d={candidate.path} className={styles.candidateBack} transform="translate(10 13)" />
          <g className={candidate.y === 277 ? styles.original : undefined}>
            <path d={candidate.path} pathLength="1" className={styles.candidateContour} />
          </g>
          {candidate.y === 277 ? <g className={styles.revision}>
            <path d="M0 20 C31 -46 96 -60 145 -1" className={styles.revisedContour} />
            <path d="M10 33 C41 -33 106 -47 155 12" className={styles.candidateBack} />
          </g> : null}
          <path d="M0 20 10 33 M145 -1 155 12" className={styles.candidateEdge} />
          <path d="M-7 40 166 17" className={styles.candidateBaseline} />
        </g>)}
      </g>
      <path d="M601 275 C632 277 650 292 680 307" className={styles.comparisonGuide} />
      <path d="M601 275 C632 277 650 292 680 307" pathLength="1" className={styles.comparisonArrival} />

      {/* A comparison aperture, with visible residual area rather than a score. */}
      <ellipse cx="788" cy="269" rx="128" ry="116" transform="rotate(-22 788 269)" className={styles.apertureOuter} />
      <ellipse cx="788" cy="269" rx="112" ry="102" transform="rotate(-22 788 269)" className={styles.apertureInner} />
      <path d="M680 307 876 264 M718 334 735 199 M783 323 800 179 M844 305 859 207" className={styles.comparisonConstruction} />
      <path d="M680 307 C710 189 808 178 875 264" className={styles.referenceContour} />
      <g className={styles.evaluation}>
        <path d="M680 307 C711 241 812 205 875 264 C808 178 710 189 680 307Z" fill={`url(#${prefix}-hatch)`} className={styles.residual} />
        <path d="M680 307 C711 241 812 205 875 264" className={styles.evaluatedContour} />
        <path d="M750 237 752 218 M781 232 783 215 M812 235 814 220" className={styles.residualTicks} />
      </g>
      <path d="M680 307 C711 225 811 200 875 264" className={styles.nextComparison} />
      <g className={styles.fixedPoints}>
        <circle cx="680" cy="307" r="4" /><circle cx="875" cy="264" r="4" />
      </g>

      {/* Feedback originates at the comparison and revises the foreground candidate; the problem stays fixed. */}
      <path d="M819 319 C884 391 791 442 641 444 C485 449 409 400 463 321 L478 327 C432 403 494 457 643 462 C804 461 906 395 832 316Z" fill={`url(#${prefix}-ribbon)`} />
      <path d="M826 320 C895 393 799 452 642 453 C488 456 420 402 470 324" className={styles.returnGuide} />
      <path d="M826 320 C895 393 799 452 642 453 C488 456 420 402 470 324" pathLength="1" className={styles.feedback} />
      <path d="m470 324 -2 18 m2-18 -16 8" className={styles.returnArrow} />
      <path d="M470 324 C477 302 486 280 502 258" pathLength="1" className={styles.reviseArrival} />
    </g>
  </>;
}
