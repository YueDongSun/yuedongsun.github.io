'use client';

import Image from 'next/image';
import { useEffect as use_effect, useRef as use_ref, useState as use_state } from 'react';
import type { KeyboardEvent as Keyboard_event } from 'react';
import type { Cv_entry } from '../lib/profile_contract';
import { Figure_viewer } from './figure_viewer';
import styles from './experience_stories.module.css';

type Experience_key = 'seed' | 'tsinghua' | 'ustc';

interface Experience_story {
  id: Experience_key;
  matches: RegExp;
  name: string;
  chinese: string;
  logo: string;
  url: string;
  image: string;
  alt: string;
  caption: string;
  kicker: string;
  heading: [string, string];
  directions: Array<{ label: string; title: string; detail: string }>;
}

const stories: Experience_story[] = [
  {
    id: 'seed', matches: /seed|bytedance/i, name: 'ByteDance Seed', chinese: '字节跳动 · Seed',
    logo: '/institutions/seed.png', url: 'https://seed.bytedance.com/en/',
    image: '/seed/seed-stem-rl-v1.webp',
    alt: 'A concept illustration connecting STEM knowledge, training data, reinforcement-learning algorithms, and evaluation benchmarks.',
    caption: 'STEM reinforcement learning · concept illustration',
    kicker: 'STEM × REINFORCEMENT LEARNING', heading: ['Reinforcement learning', 'for STEM.'],
    directions: [
      { label: 'DATA', title: 'Make expertise learnable.', detail: 'STEM tasks, data, and feedback.' },
      { label: 'ALGORITHMS', title: 'Improve how models learn.', detail: 'Reinforcement learning methods.' },
      { label: 'BENCHMARKS', title: 'Measure what matters.', detail: 'Scientific reasoning and evaluation.' },
    ],
  },
  {
    id: 'tsinghua', matches: /tsinghua|iiis/i, name: 'Tsinghua University · IIIS', chinese: '清华大学 · 交叉信息研究院',
    logo: '/institutions/iiis.png', url: 'https://iiis.tsinghua.edu.cn/en/',
    image: '/experience/tsinghua-quantum-networks-v1.webp',
    alt: 'A concept illustration of cold-atom quantum memories, optical connections, and a quantum network.',
    caption: 'Quantum memories and networks · concept illustration',
    kicker: 'QUANTUM MEMORIES × NETWORKS', heading: ['Quantum memories.', 'Quantum networks.'],
    directions: [
      { label: 'MEMORIES', title: 'Address many modes.', detail: 'AOD-addressed cold-atom ensembles.' },
      { label: 'NETWORKS', title: 'Connect quantum systems.', detail: 'Entanglement distribution and quantum relays.' },
      { label: 'CONTROL', title: 'Bring experiments together.', detail: 'Experimental control, modelling, and analysis.' },
    ],
  },
  {
    id: 'ustc', matches: /ustc|science and technology|gifted young/i, name: 'USTC · School of the Gifted Young', chinese: '中国科学技术大学 · 少年班学院',
    logo: '/institutions/ustc-sgy.png', url: 'https://sgy.ustc.edu.cn/main.htm',
    image: '/experience/ustc-quantum-foundations-v1.webp',
    alt: 'A concept illustration of physics foundations, quantum optics, crystalline materials, and scientific computation.',
    caption: 'Physics foundations and quantum optics · concept illustration',
    kicker: 'PHYSICS × OPTICS × COMPUTATION', heading: ['Physics, from', 'first principles.'],
    directions: [
      { label: 'FOUNDATIONS', title: 'Learn the language of physics.', detail: 'Mathematics, quantum mechanics, and optics.' },
      { label: 'MATERIALS', title: 'Explore light and matter.', detail: 'Rare-earth quantum memories and photonic interfaces.' },
      { label: 'COMPUTATION', title: 'Turn models into experiments.', detail: 'Computational physics and scientific software.' },
    ],
  },
];

function key_from_hash(): Experience_key | null {
  const hash = window.location.hash.slice(1).toLowerCase();
  return stories.some((story) => story.id === hash) ? hash as Experience_key : null;
}

export function Experience_stories({ entries }: { entries: Cv_entry[] }) {
  const [active, set_active] = use_state<Experience_key>('seed');
  const [vertical, set_vertical] = use_state(false);
  const [scroll_request, set_scroll_request] = use_state<{ id: Experience_key; revision: number } | null>(null);
  const tabs = use_ref<Partial<Record<Experience_key, HTMLButtonElement | null>>>({});
  const cards = stories.flatMap((story) => {
    const entry = entries.find((candidate) => story.matches.test(candidate.organization));
    return entry ? [{ ...story, entry }] : [];
  });

  use_effect(() => {
    function sync_hash() {
      const id = key_from_hash();
      if (!id) return;
      set_active(id);
      set_scroll_request((current) => ({ id, revision: (current?.revision ?? 0) + 1 }));
    }
    function sync_orientation(event: MediaQueryListEvent | MediaQueryList) {
      set_vertical(event.matches);
    }
    const media = window.matchMedia('(max-width: 760px)');
    sync_orientation(media);
    sync_hash();
    media.addEventListener('change', sync_orientation);
    window.addEventListener('hashchange', sync_hash);
    window.addEventListener('popstate', sync_hash);
    return () => {
      media.removeEventListener('change', sync_orientation);
      window.removeEventListener('hashchange', sync_hash);
      window.removeEventListener('popstate', sync_hash);
    };
  }, []);

  use_effect(() => {
    if (!scroll_request || scroll_request.id !== active) return;
    const frame = window.requestAnimationFrame(() => document.getElementById(scroll_request.id)?.scrollIntoView({ block: 'start' }));
    return () => window.cancelAnimationFrame(frame);
  }, [active, scroll_request]);

  function select_story(id: Experience_key, focus = false, scroll = false) {
    set_active(id);
    set_scroll_request(scroll ? { id, revision: (scroll_request?.revision ?? 0) + 1 } : null);
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#${id}`);
    if (focus) tabs.current[id]?.focus();
  }

  function move_tab(event: Keyboard_event<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % cards.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + cards.length) % cards.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = cards.length - 1;
    else return;
    event.preventDefault();
    select_story(cards[next].id, true);
  }

  return (
    <section className="experience_section" id="experience" aria-labelledby="experience_heading">
      <div className="section_heading compact_heading"><h2 id="experience_heading">Education & experience <span lang="zh-CN">经历</span></h2><span className="section_index">01</span></div>
      <div className={styles.tabList} role="tablist" aria-label="Education and experience stories" aria-orientation={vertical ? 'vertical' : 'horizontal'}>
        {cards.map((story, index) => (
          <button key={story.id} ref={(element) => { tabs.current[story.id] = element; }} type="button" role="tab" id={`experience-tab-${story.id}`} aria-label={story.name} aria-selected={active === story.id} aria-controls={story.id} tabIndex={active === story.id ? 0 : -1} className={styles.experienceCard} onClick={() => select_story(story.id, false, true)} onKeyDown={(event) => move_tab(event, index)}>
            <span className={styles.cardTop}><Image src={story.logo} alt="" width={220} height={48} className={styles.cardLogo} /><span>{story.entry.period}</span></span>
            <span className={styles.cardName}>{story.name}</span>
            <span className={styles.cardChinese} lang="zh-CN">{story.chinese}</span>
            <span className={styles.cardRole}>{story.entry.title}</span>
            <span className={styles.cardDescription}>{story.entry.description}</span>
            <span className={styles.cardAction}>{active === story.id ? 'Current story' : 'Explore this chapter'}<span aria-hidden="true">{active === story.id ? '●' : '↓'}</span></span>
          </button>
        ))}
      </div>
      {cards.map((story) => (
        <section key={story.id} id={story.id} role="tabpanel" aria-labelledby={`experience-tab-${story.id}`} tabIndex={0} hidden={active !== story.id} className={styles.storyPanel}>
          <div className={styles.storyTopline}><a href={story.url} target="_blank" rel="noopener noreferrer" aria-label={`${story.name} official website`}><Image src={story.logo} alt={story.name} width={250} height={46} className={styles.storyLogo} /></a><span>{story.kicker}</span></div>
          <p className={styles.storyPeriod}>{story.entry.period} <span>·</span> {story.entry.title}</p>
          <div className={styles.storyHeading}><h2>{story.heading[0]}<br /><em>{story.heading[1]}</em></h2><p>{story.entry.description}</p></div>
          <Figure_viewer src={story.image} alt={story.alt} caption={story.caption} title={story.heading.join(' ')} width={1672} height={941} compact className={styles.illustration} sizes="(max-width: 700px) 100vw, 1120px" />
          <div className={styles.focusAreas}>{story.directions.map((direction, index) => <div key={direction.label}><span>{String(index + 1).padStart(2, '0')} / {direction.label}</span><h3>{direction.title}</h3><p>{direction.detail}</p></div>)}</div>
          <p className={styles.imageNote}>{story.caption}</p>
        </section>
      ))}
    </section>
  );
}
