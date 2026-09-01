import type { Tool_accent } from '../config/tools';
import { tool_principles, tool_questions, tools_catalog } from '../config/tools';
import styles from './tools_showcase.module.css';

const accent_class_names: Record<Tool_accent, string> = {
  peach: styles.accent_peach,
  lavender: styles.accent_lavender,
  mint: styles.accent_mint,
};

export function Tools_showcase({ github_url }: { github_url: string }) {
  return (
    <main id="main_content" className={styles.tools_main}>
      <section id="tools_overview" className={styles.hero} aria-labelledby="tools_heading">
        <div className={styles.hero_copy}>
          <p className={styles.eyebrow}><span className={styles.status_dot} /> INDEPENDENT TOOLS. SHARED DIRECTION.</p>
          <h1 id="tools_heading">Your tools.<br />Your machines.<br /><em>Your workflow.</em></h1>
          <p className={styles.hero_description}>
            A small collection of software for connecting infrastructure, routing AI, and making room for focused work.
            Built to keep you in control.
          </p>
          <div className={styles.hero_actions}>
            <a className={styles.primary_link} href="#products">Explore the products <span aria-hidden="true">↓</span></a>
            <a className={styles.text_link} href={github_url} target="_blank" rel="noopener noreferrer">
              Follow the development <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className={styles.hero_note}>LOCAL-FIRST THINKING <span aria-hidden="true">·</span> INDEPENDENTLY BUILT</p>
        </div>

        <aside className={styles.concept_window}
          aria-label="Conceptual overview of three independent products, not a live integration">
          <div className={styles.window_bar}>
            <span className={styles.window_dots} aria-hidden="true"><i /><i /><i /></span>
            <span>the connected toolkit</span>
            <span aria-hidden="true">□</span>
          </div>
          <div className={styles.window_content}>
            <div className={styles.window_heading}>
              <span>THREE TOOLS. THREE LAYERS.</span>
              <span className={styles.concept_badge}>CONCEPT MAP</span>
            </div>
            <div className={styles.layer_stack}>
              {tools_catalog.map((product, product_index) => (
                <div key={product.id}>
                  <a className={`${styles.concept_layer} ${accent_class_names[product.accent]}`}
                    href={`#${product.id}`}>
                    <span className={styles.layer_code} aria-hidden="true">{product.short_code}</span>
                    <span>
                      <small>{product.layer}</small>
                      <strong>{product.name}</strong>
                    </span>
                    <span className={styles.layer_arrow} aria-hidden="true">↘</span>
                  </a>
                  {product_index < tools_catalog.length - 1 && (
                    <div className={styles.layer_connector} aria-hidden="true">
                      <span />
                      {product_index === 0 ? 'machines / tools' : 'tools / workflows'}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className={styles.window_footer}><span aria-hidden="true">&gt;_</span> Separate projects. A common philosophy.</p>
          </div>
        </aside>
      </section>

      <section id="products" className={styles.products_section} aria-labelledby="products_heading">
        <div className={styles.section_heading}>
          <div>
            <p className={styles.eyebrow}>THE TOOLKIT / 001</p>
            <h2 id="products_heading">Small tools.<br /><em>More possibilities.</em></h2>
          </div>
          <p>Different problems.<br />The same respect for your workflow.</p>
        </div>

        <div className={styles.product_list}>
          {tools_catalog.map((product, product_index) => (
            <article id={product.id} className={`${styles.product_card} ${accent_class_names[product.accent]}`}
              key={product.id}>
              <header className={styles.product_header}>
                <div className={styles.product_identity}>
                  <span className={styles.product_code} aria-hidden="true">{product.short_code}</span>
                  <div>
                    <p>0{product_index + 1} / {product.category}</p>
                    <h3>{product.name}</h3>
                  </div>
                </div>
                <span className={styles.status_badge}>{product.status}</span>
              </header>

              <div className={styles.product_summary}>
                <p>{product.description}</p>
                <ul aria-label={`${product.name} topics`}>
                  {product.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>

              <div className={styles.product_details}>
                <div className={styles.product_intro}>
                  <p className={styles.detail_label}>A CLOSER LOOK</p>
                  <h4>{product.headline}</h4>
                  <p>{product.detail}</p>
                  <p className={styles.audience_note}>{product.audience}</p>
                  {product.repository_url ? (
                    <a className={styles.text_link} href={product.repository_url} target="_blank"
                      rel="noopener noreferrer">Explore the repository <span aria-hidden="true">↗</span></a>
                  ) : (
                    <span className={styles.availability_note}>Public repository not linked here.</span>
                  )}
                </div>
                <ol className={styles.capability_list}>
                  {product.capabilities.map((capability, capability_index) => (
                    <li key={capability.title}>
                      <span aria-hidden="true">0{capability_index + 1}</span>
                      <div><h5>{capability.title}</h5><p>{capability.description}</p></div>
                    </li>
                  ))}
                </ol>
              </div>

              <p className={styles.product_caveat}><strong>Current boundary</strong><span>{product.caveat}</span></p>
            </article>
          ))}
        </div>
      </section>

      <section id="principles" className={styles.principles_section} aria-labelledby="principles_heading">
        <div className={styles.section_heading}>
          <div>
            <p className={styles.eyebrow}>THE COMMON THREAD / 002</p>
            <h2 id="principles_heading">Software that fits<br /><em>the way you build.</em></h2>
          </div>
          <div className={styles.section_aside_copy}>
            <p>Keep tools understandable. Make boundaries explicit. Let each project do its own job well.</p>
            <p>
              Infrastructure, intelligence, and workspace are different layers. These projects explore each one with a
              shared preference for local control, clear ownership, and reviewable work.
            </p>
          </div>
        </div>
        <div className={styles.principle_grid}>
          {tool_principles.map((principle) => (
            <article key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="questions" className={styles.questions_section} aria-labelledby="questions_heading">
        <div className={styles.question_intro}>
          <p className={styles.eyebrow}>GOOD TO KNOW / 003</p>
          <h2 id="questions_heading">A few useful<br /><em>details.</em></h2>
          <p>Clear expectations before you dive in.</p>
        </div>
        <div className={styles.question_list}>
          {tool_questions.map((item, question_index) => (
            <details key={item.question} open={question_index === 0}>
              <summary><span>0{question_index + 1}</span>{item.question}<i aria-hidden="true">+</i></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.closing_section}>
        <div>
          <p className={styles.eyebrow}>ALWAYS A WORK IN PROGRESS</p>
          <h2>Built with curiosity.<br /><em>Made to be useful.</em></h2>
        </div>
        <a className={styles.primary_link} href={github_url} target="_blank" rel="noopener noreferrer">
          See what comes next <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
