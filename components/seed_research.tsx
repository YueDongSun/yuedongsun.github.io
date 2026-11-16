import Image from 'next/image';
import { Experience_scene } from './research_scenes';
import styles from './seed_research.module.css';

export function Seed_research() {
  return (
    <section className={styles.seedSection} id="seed" aria-labelledby="seed_heading">
      <div className={styles.topline}>
        <a href="https://seed.bytedance.com/en/" target="_blank" rel="noopener noreferrer" aria-label="ByteDance Seed"><Image src="/institutions/seed.png" alt="ByteDance Seed" width={180} height={24} className={styles.seedLogo} /></a>
        <span>STEM × REINFORCEMENT LEARNING</span>
      </div>
      <div className={styles.heading}>
        <h2 id="seed_heading">Reinforcement learning<br /><em>for STEM.</em></h2>
        <p>Working across data, algorithms, and benchmarks for STEM reinforcement learning.</p>
      </div>
      <Experience_scene kind="stem_learning" />
      <div className={styles.focusAreas}>
        <div><span>01 / DATA</span><h3>Make expertise learnable.</h3><p>STEM tasks, data, and feedback.</p></div>
        <div><span>02 / ALGORITHMS</span><h3>Improve how models learn.</h3><p>Reinforcement learning methods.</p></div>
        <div><span>03 / BENCHMARKS</span><h3>Measure what matters.</h3><p>Scientific reasoning and evaluation.</p></div>
      </div>
    </section>
  );
}
