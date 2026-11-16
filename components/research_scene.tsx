'use client';

import { useEffect as use_effect, useId as use_id, useRef as use_ref, useState as use_state } from 'react';
import type { CSSProperties as Css_properties } from 'react';
import { Stem_scene } from './scenes/stem_scene';
import { Memory_scene } from './scenes/memory_scene';
import { Optics_scene } from './scenes/optics_scene';
import styles from './research_scene.module.css';

export type Scene_kind = 'seed' | 'tsinghua' | 'ustc';

// One clock per scene. Every event layer uses this duration, with its sequence
// expressed as percentages in the corresponding scene's CSS module.
const scene_details = {
  seed: {
    title: 'Scientific reasoning, evaluation, and another attempt',
    description: 'An open geometric construction gives rise to three related candidate contours. One is compared with a reference; the hatched discrepancy sends feedback around a return ribbon. A subsequent contour changes shape, while a small discrepancy remains. A conceptual learning cycle.',
    caption: 'A geometric problem opens into candidate solutions. Evaluation returns feedback that shapes the next attempt.',
    duration: 14,
    stages: ['Frame a problem', 'Explore solutions', 'Evaluate', 'Revise'],
    Artwork: Stem_scene,
  },
  tsinghua: {
    title: 'Spatial modes and an optical link between memory nodes',
    description: 'A perspective field of volumetric optical modes contains one selected waist. An incoming wave packet converges into it, leaves a localized stored excitation, and is followed by an optical wavefront train along a curved link to a distant ensemble. Conceptual geometry, rather than an apparatus drawing or measured entanglement result.',
    caption: 'One spatial mode receives a light pulse, holds a localized excitation, and connects optically to a remote memory node.',
    duration: 12,
    stages: ['Address a mode', 'Store light', 'Retrieve', 'Connect'],
    Artwork: Memory_scene,
  },
  ustc: {
    title: 'Optical excitation and the response of a localized site',
    description: 'A finite optical wave packet approaches a localized site inside a faceted medium. A connected two-level construction rises into its excited state. After a pause, the site produces an outgoing optical response and returns to its lower state. A conceptual light–matter interaction, with no measured energies or apparatus dimensions.',
    caption: 'An incident pulse excites a localized site. The energy-level transition is followed by an optical response.',
    duration: 12,
    stages: ['Incident pulse', 'Excitation', 'Response', 'Relaxation'],
    Artwork: Optics_scene,
  },
} as const;

/** Editable SVG artwork with a static-first, visibility-aware CSS timeline. */
export function Research_scene({ kind, active = true, className = '' }: { kind: Scene_kind; active?: boolean; className?: string }) {
  const canvas_ref = use_ref<HTMLDivElement>(null);
  const instance_id = use_id().replace(/:/g, '');
  const [ready, set_ready] = use_state(false);
  const [in_view, set_in_view] = use_state(false);
  const [started, set_started] = use_state(false);
  const [page_visible, set_page_visible] = use_state(true);
  const [reduced, set_reduced] = use_state(true);
  const [paused, set_paused] = use_state(false);
  const [replay, set_replay] = use_state(0);
  const details = scene_details[kind];
  const Artwork = details.Artwork;
  const prefix = `scene-${kind}-${instance_id}`;

  use_effect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync_preference = () => set_reduced(media.matches);
    const sync_visibility = () => set_page_visible(document.visibilityState === 'visible');
    sync_preference();
    sync_visibility();
    media.addEventListener('change', sync_preference);
    document.addEventListener('visibilitychange', sync_visibility);

    const observer = new IntersectionObserver(([entry]) => {
      set_ready(true);
      const visible = entry.isIntersecting && entry.intersectionRatio >= 0.15;
      set_in_view(visible);
      if (visible) set_started(true);
    }, { threshold: [0, 0.15] });
    if (canvas_ref.current) observer.observe(canvas_ref.current);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', sync_preference);
      document.removeEventListener('visibilitychange', sync_visibility);
    };
  }, []);

  const animated = ready && started && !reduced;
  const playing = animated && active && in_view && page_visible && !paused;
  const scene_style = { '--scene-duration': `${details.duration}s` } as Css_properties;

  return (
    <figure className={`${styles.scene} ${className}`} style={scene_style}
      data-scene={kind} data-animated={animated} data-playing={playing} data-reduced-motion={reduced}
      aria-labelledby={`${prefix}-caption`}>
      <div ref={canvas_ref} className={styles.canvas}>
        <svg key={replay} className={styles.artwork} viewBox="0 0 1000 560" role="img" focusable="false"
          aria-labelledby={`${prefix}-title ${prefix}-description`}>
          <title id={`${prefix}-title`}>{details.title}</title>
          <desc id={`${prefix}-description`}>{details.description}</desc>
          <Artwork prefix={prefix} />
        </svg>
      </div>
      <figcaption id={`${prefix}-caption`} className={styles.caption}>
        <ol className={styles.stages} aria-label="Visual sequence">
          {details.stages.map((stage, index) => <li key={stage}><span aria-hidden="true">0{index + 1}</span>{stage}</li>)}
        </ol>
        <div className={styles.captionBody}>
          <p>{details.caption} <span className={styles.concept}>Conceptual illustration.</span></p>
          {ready && !reduced ? <div className={styles.controls}>
            <button type="button" aria-label={`${paused ? 'Play' : 'Pause'} ${details.title}`}
              onClick={() => set_paused((current) => !current)}>
              <svg viewBox="0 0 16 16" aria-hidden="true">{paused ? <path d="m5 3 8 5-8 5Z" /> : <path d="M5 3v10M11 3v10" />}</svg>
              {paused ? 'Play' : 'Pause'}
            </button>
            <button type="button" aria-label={`Replay ${details.title}`} onClick={() => { set_replay((current) => current + 1); set_paused(false); }}>
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 6a5 5 0 1 1 .1 4M3 2v4h4" /></svg>
              Replay
            </button>
          </div> : ready ? <span className={styles.motionNote}>Still view · reduced motion</span> : null}
        </div>
      </figcaption>
    </figure>
  );
}
