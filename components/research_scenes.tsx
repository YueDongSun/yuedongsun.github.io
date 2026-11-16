'use client';

import { useEffect as use_effect, useId as use_id, useRef as use_ref, useState as use_state } from 'react';
import type { ReactNode, RefObject } from 'react';
import styles from './research_scenes.module.css';

type Scene_kind = 'stem_learning' | 'quantum_network' | 'optical_transition';

interface Scene_copy {
  title: string;
  description: string;
  stages: Array<{ index: string; label: string }>;
  caption: string;
}

const scene_copy: Record<Scene_kind, Scene_copy> = {
  stem_learning: {
    title: 'STEM reinforcement-learning loop',
    description: 'A conceptual diagram. STEM tasks enter a loop of attempt, feedback, and update, then the next task is selected. No scores or benchmark results are shown.',
    stages: [
      { index: '01', label: 'STEM tasks enter as prompts.' },
      { index: '02', label: 'Attempt, feedback, and update cycle.' },
      { index: '03', label: 'A check marks the next selection.' },
    ],
    caption: 'Conceptual schematic of a learning loop. Stages are qualitative; no measured rewards are shown.',
  },
  quantum_network: {
    title: 'Addressed modes, propagation, and network edges',
    description: 'A conceptual diagram. Cells in a mode array are addressed in turn, a field travels along a channel, and edges link three network nodes. This is not a laboratory layout.',
    stages: [
      { index: '01', label: 'An addressed mode array.' },
      { index: '02', label: 'A field moving along a channel.' },
      { index: '03', label: 'Edges between network nodes.' },
    ],
    caption: 'Conceptual schematic of modes, propagation, and links. Geometry is not to scale and shows no measured rates.',
  },
  optical_transition: {
    title: 'Rays, a two-level transition, and an ion site',
    description: 'A conceptual diagram. Parallel rays pass a lens, a marker moves between two energy levels, and one site is marked in a lattice. No spectrum or device dimensions are shown.',
    stages: [
      { index: '01', label: 'Rays gathered by a lens.' },
      { index: '02', label: 'A transition between two levels.' },
      { index: '03', label: 'One site marked in a lattice.' },
    ],
    caption: 'Conceptual schematic of optics and a two-level motif. Not a measured spectrum or a fabricated device.',
  },
};

function use_scene_playback(): { scene_ref: RefObject<HTMLElement | null>; playing: boolean } {
  const scene_ref = use_ref<HTMLElement>(null);
  const [playing, set_playing] = use_state(false);

  use_effect(() => {
    const scene = scene_ref.current;
    if (!scene || !('IntersectionObserver' in window)) {
      set_playing(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      set_playing(entry.isIntersecting);
    }, { threshold: 0.2 });
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  return { scene_ref, playing };
}

function Scene_frame({ kind, children }: { kind: Scene_kind; children: ReactNode }) {
  const { scene_ref, playing } = use_scene_playback();
  const title_id = use_id();
  const description_id = use_id();
  const copy = scene_copy[kind];

  return (
    <figure ref={scene_ref} className={styles.scene} data-playing={playing ? 'true' : 'false'}>
      <svg className={styles.canvas} viewBox="0 0 960 320" role="img" aria-labelledby={`${title_id} ${description_id}`}>
        <title id={title_id}>{copy.title}</title>
        <desc id={description_id}>{copy.description}</desc>
        <g aria-hidden="true">{children}</g>
      </svg>
      <ol className={styles.stages}>
        {copy.stages.map((stage) => (
          <li key={stage.index}><span>{stage.index}</span>{stage.label}</li>
        ))}
      </ol>
      <figcaption className={styles.caption}>{copy.caption}</figcaption>
    </figure>
  );
}

function Stem_art() {
  const loop = 'M430 58 H620 A62 62 0 0 1 682 120 V184 A62 62 0 0 1 620 246 H430 A62 62 0 0 1 368 184 V120 A62 62 0 0 1 430 58';
  return (
    <>
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <rect className={row === 0 ? styles.panel_active : styles.panel} x="36" y={36 + row * 84} width="236" height="68" rx="8" />
          <path className={styles.rule} d={`M58 ${62 + row * 84} H${196 - row * 28}`} />
          <path className={styles.rule_short} d={`M58 ${78 + row * 84} H${160 - row * 18}`} />
        </g>
      ))}
      <path className={styles.track} d={loop} pathLength="100" />
      <path className={styles.runner} d={loop} pathLength="100" />
      <path className={styles.rule_short} d="M368 152 H286" />
      <circle className={styles.node} cx="525" cy="58" r="7" />
      <circle className={styles.node_on} cx="682" cy="152" r="7" />
      <circle className={styles.node} cx="525" cy="246" r="7" />
      <circle className={styles.node} cx="368" cy="152" r="7" />
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <path className={row === 0 ? styles.rule : styles.rule_short} d={`M760 ${108 + row * 48} H${860 - row * 36}`} />
          <circle className={row === 0 ? styles.mark : styles.mark_idle} cx="888" cy={108 + row * 48} r={row === 0 ? 6 : 5.5} />
        </g>
      ))}
    </>
  );
}

function Network_art() {
  return (
    <>
      {Array.from({ length: 20 }, (_, index) => {
        const column = index % 5;
        const row = Math.floor(index / 5);
        return (
          <rect
            key={index}
            className={styles.cell}
            data-held={index === 7 ? '' : undefined}
            x={40 + column * 46}
            y={52 + row * 46}
            width="34"
            height="34"
            rx="4"
            style={{ animationDelay: `${index * 0.4}s` }}
          />
        );
      })}
      <path className={styles.channel} d="M280 144 H690" pathLength="100" />
      <path className={styles.photon} d="M280 144 H690" pathLength="100" />
      <circle className={styles.node} cx="760" cy="88" r="16" />
      <circle className={styles.node_on} cx="820" cy="176" r="18" />
      <circle className={styles.node} cx="900" cy="104" r="14" />
      <path className={styles.edge} d="M774 98 L806 160" pathLength="100" />
      <path className={styles.edge} d="M836 164 L890 116" pathLength="100" style={{ animationDelay: '-0.7s' }} />
      <path className={styles.edge} d="M776 88 H886" pathLength="100" style={{ animationDelay: '-1.3s' }} />
      <path className={styles.channel} d="M690 144 L804 166" />
    </>
  );
}

function Optics_art() {
  const lattice = [
    [760, 160],
    [796, 160], [778, 191], [742, 191], [724, 160], [742, 129], [778, 129],
    [832, 160], [814, 191], [796, 222], [760, 222], [724, 222], [706, 191], [688, 160], [706, 129], [724, 98], [760, 98], [796, 98], [814, 129],
  ];
  return (
    <>
      <path className={styles.divider} d="M320 36 V284 M640 36 V284" />
      <path className={styles.ray_dim} d="M36 112 H150 M36 160 H150 M36 208 H150" />
      <path className={styles.ray_dim} d="M168 112 L292 160 M168 160 H292 M168 208 L292 160" />
      <path className={styles.ray} d="M168 112 L292 160" pathLength="100" />
      <path className={styles.ray} d="M168 160 H292" pathLength="100" style={{ animationDelay: '-0.6s' }} />
      <path className={styles.ray} d="M168 208 L292 160" pathLength="100" style={{ animationDelay: '-1.2s' }} />
      <ellipse className={styles.lens} cx="158" cy="160" rx="16" ry="62" />
      <path className={styles.level} d="M390 108 H590" />
      <path className={styles.level} d="M390 214 H590" />
      <path className={styles.level_dim} d="M490 214 V108" />
      <path className={styles.transition} d="M490 214 V108" pathLength="100" />
      <path className={styles.level_dim} d="M490 108 C540 96 560 78 600 84" />
      <path className={styles.ray} d="M490 108 C540 96 560 78 600 84" pathLength="100" style={{ animationDelay: '-1.1s' }} />
      {lattice.map(([cx, cy]) => <circle key={`${cx}-${cy}`} className={styles.lattice} cx={cx} cy={cy} r="8" />)}
      <circle className={styles.ion} cx="760" cy="160" r="9" />
    </>
  );
}

export function Experience_scene({ kind }: { kind: Scene_kind }) {
  if (kind === 'stem_learning') {
    return <Scene_frame kind={kind}><Stem_art /></Scene_frame>;
  }
  if (kind === 'quantum_network') {
    return <Scene_frame kind={kind}><Network_art /></Scene_frame>;
  }
  return <Scene_frame kind={kind}><Optics_art /></Scene_frame>;
}
