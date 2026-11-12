import styles from './project_visual.module.css';

type Visual_kind = 'worktrees' | 'gateway' | 'optics' | 'crystal' | 'circuit' | 'qec' | 'monitor' | 'reading' | 'mesh';
type Visual_tone = 'terracotta' | 'sage' | 'slate';

interface Visual_spec {
  kind: Visual_kind;
  tone: Visual_tone;
  caption: string;
  description: string;
  alt: string;
}

const visual_specs: Record<string, Visual_spec> = {
  vibemux: {
    kind: 'worktrees', tone: 'sage', caption: 'Separate changes. Review together.',
    description: 'A task branches into independent workspaces; their diffs and checks meet at review.',
    alt: 'A task branches into worktree A and worktree B. Both worktrees lead to a review of diffs and checks.',
  },
  ai_agent_gateway: {
    kind: 'gateway', tone: 'slate', caption: 'One entry point. Explicit routes.',
    description: 'Coding tools use one local gateway to reach a chosen provider, with an ordered fallback route.',
    alt: 'CLI, IDE and app clients connect to a local gateway, which routes to a primary provider or a fallback provider.',
  },
  qoptics_inference_bench: {
    kind: 'optics', tone: 'terracotta', caption: 'From photon counts to parameters.',
    description: 'Infer physical parameters from synthetic observations and compare with a reference solution.',
    alt: 'Synthetic photon count data enters an inference task. Estimated parameters are compared with a reference solution.',
  },
  rare_earth_cf_bench: {
    kind: 'crystal', tone: 'sage', caption: 'From an ion site to an effective spin.',
    description: 'Build the crystal-field Hamiltonian and project a low-energy subspace into effective spin tensors.',
    alt: 'An ion in a crystal site defines a Hamiltonian. Low-energy projection yields g, A and Q tensors.',
  },
  qcircuit_bench: {
    kind: 'circuit', tone: 'slate', caption: 'Design a circuit. Check its behavior.',
    description: 'Run a proposed circuit in a simulator and assess fidelity alongside resource use.',
    alt: 'A quantum circuit with gates is passed to a simulator, then evaluated for fidelity and resource cost.',
  },
  qec_bench: {
    kind: 'qec', tone: 'terracotta', caption: 'Turn error signals into a decoding task.',
    description: 'Evaluate a decoder through logical error rates under a specified shot budget.',
    alt: 'Syndrome observations pass to a decoder and then an evaluation of logical error rate.',
  },
  codex_state_monitor: {
    kind: 'monitor', tone: 'slate', caption: 'Make response metadata inspectable.',
    description: 'Read response events, compare requested and served model metadata, and keep a diagnostic record.',
    alt: 'SSE response events are inspected for requested and served model metadata, then recorded as JSONL.',
  },
  zotero_arxiv_daily: {
    kind: 'reading', tone: 'sage', caption: 'A literature library becomes a reading list.',
    description: 'Use a Zotero library to rank new arXiv papers and assemble a focused reading list.',
    alt: 'A Zotero library and new arXiv papers feed a relevance-ranking step that produces a reading list.',
  },
  tailnet_mesh: {
    kind: 'mesh', tone: 'terracotta', caption: 'Bring your machines into one workspace.',
    description: 'Connect a laptop, workstation, compute node, and file services through a private tailnet.',
    alt: 'A private tailnet links a laptop, workstation, compute node and file services for coordinated work.',
  },
};

function Arrow({ from, to, y, dashed = false }: { from: number; to: number; y: number; dashed?: boolean }) {
  return <g className={dashed ? styles.dashed : styles.connector}>
    <path d={`M ${from} ${y} H ${to - 5}`} />
    <path className={styles.arrow_head} d={`M ${to - 9} ${y - 3} L ${to - 5} ${y} L ${to - 9} ${y + 3}`} />
  </g>;
}

function Node_box({ x, y, width, height = 48, label, detail, accent = false }: {
  x: number; y: number; width: number; height?: number; label: string; detail?: string; accent?: boolean;
}) {
  return <g>
    <rect className={accent ? styles.accent_node : styles.node} x={x} y={y} width={width} height={height} rx="7" />
    <text className={styles.node_label} x={x + width / 2} y={y + height / 2 + (detail ? -3 : 4)} textAnchor="middle">{label}</text>
    {detail && <text className={styles.small_label} x={x + width / 2} y={y + height / 2 + 13} textAnchor="middle">{detail}</text>}
  </g>;
}

function Workflow_art({ kind }: { kind: Visual_kind }) {
  switch (kind) {
    case 'worktrees':
      return <>
        <path className={styles.connector} d="M 88 70 H 104 V 35 H 123 M 104 70 V 105 H 123 M 224 35 H 239 V 70 H 258 M 224 105 H 239 V 70" />
        <Node_box x={10} y={45} width={78} height={50} label="Task" detail="brief + repo" />
        <Node_box x={123} y={12} width={101} height={46} label="Worktree A" detail="changes" accent />
        <Node_box x={123} y={82} width={101} height={46} label="Worktree B" detail="changes" accent />
        <Node_box x={258} y={45} width={92} height={50} label="Review" detail="diffs + checks" />
        <circle className={styles.junction} cx="104" cy="70" r="3" />
        <circle className={styles.junction} cx="239" cy="70" r="3" />
        <path className={styles.connector} d="M 252 67 L 256 70 L 252 73" />
      </>;
    case 'gateway':
      return <>
        <path className={styles.connector} d="M 82 28 H 107 V 70 H 136 M 82 70 H 136 M 82 112 H 107 V 70 M 224 70 H 246 V 40 H 269 M 246 70 V 101 H 269" />
        <Node_box x={14} y={14} width={68} height={28} label="CLI" />
        <Node_box x={14} y={56} width={68} height={28} label="IDE" />
        <Node_box x={14} y={98} width={68} height={28} label="App" />
        <Node_box x={136} y={43} width={88} height={54} label="Gateway" detail="local routes" accent />
        <Node_box x={269} y={22} width={77} height={36} label="Primary" />
        <Node_box x={269} y={83} width={77} height={36} label="Fallback" />
        <path className={styles.dashed} d="M 308 60 V 79 M 305 74 L 308 79 L 311 74" />
        <circle className={styles.junction} cx="107" cy="70" r="3" />
        <circle className={styles.junction} cx="246" cy="70" r="3" />
      </>;
    case 'optics':
      return <>
        <path className={styles.axis} d="M 20 32 V 97 H 98" />
        {[22, 42, 30, 55, 36].map((height, index) => <rect className={index % 2 === 0 ? styles.data_bar : styles.secondary_bar} key={index} x={29 + index * 13} y={96 - height} width="8" height={height} rx="2" />)}
        <text className={styles.small_label} x="59" y="116" textAnchor="middle">Synthetic counts</text>
        <Arrow from={102} to={137} y={66} />
        <Node_box x={139} y={40} width={85} height={53} label="Infer θ" detail="physical model" accent />
        <Arrow from={225} to={264} y={66} />
        <rect className={styles.node} x="265" y="20" width="82" height="90" rx="7" />
        <text className={styles.parameter_label} x="279" y="45">θ₁</text>
        <text className={styles.parameter_label} x="279" y="70">θ₂</text>
        <text className={styles.parameter_label} x="279" y="95">θ₃</text>
        <path className={styles.parameter_line} d="M 298 41 H 331 M 298 66 H 331 M 298 91 H 331" />
        <text className={styles.small_label} x="306" y="128" textAnchor="middle">Reference check</text>
      </>;
    case 'crystal':
      return <>
        <path className={styles.connector} d="M 26 43 L 56 25 L 87 43 L 87 79 L 56 98 L 26 79 Z M 26 43 L 56 61 L 87 43 M 56 61 V 98 M 56 25 V 61 M 26 79 L 56 61 L 87 79" />
        {[[26,43],[56,25],[87,43],[87,79],[56,98],[26,79]].map(([x,y]) => <circle className={styles.lattice_dot} key={`${x}-${y}`} cx={x} cy={y} r="4" />)}
        <circle className={styles.ion} cx="56" cy="61" r="8" />
        <text className={styles.small_label} x="56" y="121" textAnchor="middle">Ion + crystal site</text>
        <Arrow from={95} to={132} y={65} />
        <rect className={styles.accent_node} x="134" y="27" width="96" height="76" rx="7" />
        <text className={styles.formula} x="182" y="49" textAnchor="middle">H</text>
        <text className={styles.small_label} x="182" y="70" textAnchor="middle">free ion + crystal</text>
        <text className={styles.small_label} x="182" y="87" textAnchor="middle">Zeeman + hyperfine</text>
        <Arrow from={231} to={269} y={65} />
        <path className={styles.energy_levels} d="M 277 32 H 338 M 277 43 H 338 M 277 79 H 338 M 277 90 H 338" />
        <path className={styles.dashed} d="M 307 47 V 74" />
        <text className={styles.small_label} x="307" y="17" textAnchor="middle">Project</text>
        <text className={styles.tensor_label} x="307" y="117" textAnchor="middle">g · A · Q</text>
      </>;
    case 'circuit':
      return <>
        <path className={styles.wire} d="M 13 36 H 112 M 13 65 H 112 M 13 94 H 112" />
        <rect className={styles.accent_node} x="25" y="25" width="23" height="23" rx="3" />
        <text className={styles.node_label} x="36.5" y="41" textAnchor="middle">H</text>
        <path className={styles.gate_wire} d="M 77 36 V 65" />
        <circle className={styles.junction} cx="77" cy="36" r="3" />
        <circle className={styles.gate} cx="77" cy="65" r="8" />
        <path className={styles.gate_wire} d="M 72 65 H 82 M 77 60 V 70" />
        <rect className={styles.node} x="53" y="83" width="26" height="23" rx="3" />
        <text className={styles.small_label} x="66" y="99" textAnchor="middle">Rz</text>
        <text className={styles.small_label} x="63" y="125" textAnchor="middle">Circuit code</text>
        <Arrow from={113} to={139} y={65} />
        <Node_box x={141} y={39} width={82} height={53} label="Simulate" detail="state evolution" accent />
        <Arrow from={225} to={261} y={65} />
        <Node_box x={263} y={39} width={86} height={53} label="Evaluate" detail="fidelity + cost" />
      </>;
    case 'qec':
      return <>
        <path className={styles.connector} d="M 29 30 H 91 M 29 61 H 91 M 29 92 H 91 M 29 30 V 92 M 60 30 V 92 M 91 30 V 92" />
        {[[29,30],[60,30],[91,30],[29,61],[60,61],[91,61],[29,92],[60,92],[91,92]].map(([x,y], index) => <circle className={index === 2 || index === 4 ? styles.ion : styles.syndrome_dot} key={`${x}-${y}`} cx={x} cy={y} r={index === 2 || index === 4 ? 6 : 4} />)}
        <text className={styles.small_label} x="60" y="118" textAnchor="middle">Syndrome data</text>
        <Arrow from={101} to={141} y={61} />
        <Node_box x={143} y={36} width={80} height={52} label="Decode" detail="error model" accent />
        <Arrow from={224} to={261} y={61} />
        <Node_box x={263} y={36} width={85} height={52} label="Evaluate" detail="logical error" />
        <text className={styles.small_label} x="247" y="115" textAnchor="middle">specified seeds + shot budget</text>
      </>;
    case 'monitor':
      return <>
        {[35, 65, 95].map((y, index) => <g key={y}><circle className={index === 1 ? styles.ion : styles.lattice_dot} cx="27" cy={y} r="4" /><path className={styles.stream_line} d={`M 40 ${y} H ${91 - index * 7}`} /></g>)}
        <path className={styles.dashed} d="M 27 42 V 58 M 27 72 V 88" />
        <text className={styles.small_label} x="59" y="121" textAnchor="middle">SSE response</text>
        <Arrow from={101} to={132} y={65} />
        <rect className={styles.accent_node} x="134" y="25" width="100" height="80" rx="7" />
        <text className={styles.small_label} x="184" y="46" textAnchor="middle">requested model</text>
        <path className={styles.compare_arrow} d="M 168 61 H 200 M 194 57 L 200 61 L 194 65 M 200 72 H 168 M 174 68 L 168 72 L 174 76" />
        <text className={styles.small_label} x="184" y="94" textAnchor="middle">served model</text>
        <Arrow from={235} to={267} y={65} />
        <Node_box x={269} y={39} width={78} height={52} label="Record" detail="JSONL" />
      </>;
    case 'reading':
      return <>
        <rect className={styles.node} x="20" y="16" width="11" height="39" rx="2" />
        <rect className={styles.accent_node} x="35" y="12" width="13" height="43" rx="2" />
        <rect className={styles.sage_node} x="52" y="21" width="12" height="34" rx="2" />
        <path className={styles.connector} d="M 17 57 H 72" />
        <text className={styles.small_label} x="46" y="74" textAnchor="middle">Zotero</text>
        <path className={styles.document_back} d="M 27 89 H 62 V 117 H 27 Z" />
        <rect className={styles.node} x="34" y="84" width="35" height="28" rx="2" />
        <path className={styles.document_lines} d="M 40 92 H 62 M 40 99 H 58 M 40 105 H 60" />
        <text className={styles.small_label} x="51" y="132" textAnchor="middle">arXiv</text>
        <path className={styles.connector} d="M 80 39 H 107 V 70 H 143 M 80 101 H 107 V 70" />
        <circle className={styles.junction} cx="107" cy="70" r="3" />
        <Node_box x={145} y={44} width={81} height={52} label="Rank" detail="research fit" accent />
        <Arrow from={228} to={267} y={70} />
        <rect className={styles.node} x="271" y="28" width="68" height="78" rx="6" />
        {[46, 65, 84].map((y) => <g key={y}><rect className={styles.sage_node} x="282" y={y - 5} width="9" height="9" rx="2" /><path className={styles.document_lines} d={`M 297 ${y} H 328`} /></g>)}
        <text className={styles.small_label} x="305" y="126" textAnchor="middle">Reading list</text>
      </>;
    case 'mesh':
      return <>
        <path className={styles.mesh_link} d="M 77 35 L 151 65 M 78 104 L 151 75 M 209 65 L 282 35 M 209 75 L 282 105" />
        <circle className={styles.mesh_boundary} cx="180" cy="70" r="44" />
        <circle className={styles.accent_node} cx="180" cy="70" r="32" />
        <text className={styles.node_label} x="180" y="67" textAnchor="middle">Tailnet</text>
        <text className={styles.small_label} x="180" y="83" textAnchor="middle">SSH · jobs</text>
        <rect className={styles.node} x="31" y="13" width="43" height="29" rx="4" />
        <path className={styles.device_line} d="M 25 47 H 80 M 45 42 V 47 M 62 42 V 47" />
        <text className={styles.small_label} x="53" y="64" textAnchor="middle">Laptop</text>
        <rect className={styles.node} x="35" y="84" width="34" height="32" rx="4" />
        <path className={styles.device_line} d="M 42 94 H 61 M 42 102 H 61" />
        <circle className={styles.junction} cx="60" cy="110" r="2" />
        <text className={styles.small_label} x="53" y="134" textAnchor="middle">Workstation</text>
        <rect className={styles.slate_node} x="287" y="14" width="42" height="32" rx="4" />
        <rect className={styles.node} x="297" y="21" width="22" height="18" rx="2" />
        <path className={styles.device_line} d="M 303 11 V 17 M 313 11 V 17 M 303 43 V 49 M 313 43 V 49" />
        <text className={styles.small_label} x="308" y="64" textAnchor="middle">Compute</text>
        <rect className={styles.node} x="286" y="84" width="43" height="31" rx="5" />
        <path className={styles.device_line} d="M 287 95 H 328 M 287 105 H 328" />
        <circle className={styles.junction} cx="322" cy="90" r="1.5" />
        <circle className={styles.junction} cx="322" cy="100" r="1.5" />
        <text className={styles.small_label} x="308" y="134" textAnchor="middle">Files</text>
      </>;
  }
}

export function Project_visual({ project_id, featured = false }: { project_id: string; featured?: boolean }) {
  const spec = visual_specs[project_id === 'cc' ? 'ai_agent_gateway' : project_id];
  if (!spec) return null;

  return (
    <figure className={`${styles.visual} ${styles[spec.tone]} ${featured ? styles.featured : ''}`}>
      <div className={styles.sketch_label}>Workflow sketch</div>
      <svg className={styles.canvas} viewBox="0 0 360 144" role="img" aria-label={spec.alt} focusable="false">
        <Workflow_art kind={spec.kind} />
      </svg>
      <figcaption className={styles.caption}>
        <strong>{spec.caption}</strong>
        {featured && <span>{spec.description}</span>}
      </figcaption>
    </figure>
  );
}
