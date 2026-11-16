import type { Tool_accent } from '../config/tools';
import { tool_principles, tool_questions, tools_catalog } from '../config/tools';
import { Project_visual } from './project_visual';
import styles from './tools_showcase.module.css';

const accent_class_names: Record<Tool_accent, string> = {
  peach: styles.accent_peach,
  lavender: styles.accent_lavender,
  mint: styles.accent_mint,
};

export function Tools_showcase({ github_url, display_name }: { github_url: string; display_name: string }) {
  return (
    <main id="main_content" className={styles.tools_main}>
      <section id="tools_overview" className={styles.hero} aria-labelledby="tools_heading">
        <div className={styles.hero_copy}>
          <p className={styles.eyebrow}><span className={styles.status_dot} /> SOFTWARE / TOOLS / EXPERIMENTS</p>
          <h1 id="tools_heading">A small toolkit.<br /><em>Connected work.</em></h1>
          <p className={styles.hero_description}>
            Projects for machine coordination, model routing, and coding-agent workflows. Explore what each tool does, how it fits, and its current development stage.
          </p>
          <div className={styles.hero_actions}>
            <a className={styles.primary_link} href="#products">Explore the products <span aria-hidden="true">↓</span></a>
            <a className={styles.text_link} href={github_url} target="_blank" rel="noopener noreferrer">
              Follow the development <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className={styles.hero_note}>BY {display_name.toUpperCase()} <span aria-hidden="true">·</span> BEIJING</p>
        </div>

        <aside className={styles.concept_window}
          aria-label="Explore the three software projects">
          <div className={styles.window_bar}>
            <span className={styles.window_dots} aria-hidden="true"><i /><i /><i /></span>
            <span>project index</span>
            <span aria-hidden="true">□</span>
          </div>
          <div className={styles.window_content}>
            <div className={styles.window_heading}>
              <span>IN THIS TOOLKIT</span>
              <span className={styles.concept_badge}>DIRECTORY</span>
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
            <p className={styles.window_footer}><span aria-hidden="true">&gt;_</span> Infrastructure / routing / workspace</p>
          </div>
        </aside>
      </section>

      <section id="products" className={styles.products_section} aria-labelledby="products_heading">
        <span id="product_details" aria-hidden="true" />
        <span id="engineering" aria-hidden="true" />
        <div className={styles.section_heading}>
          <div>
            <p className={styles.eyebrow}>THE TOOLKIT / 001</p>
            <h2 id="products_heading">The projects.</h2>
          </div>
          <p>A closer look at the tools and their development.</p>
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

              <div className={styles.product_visual}>
                <Project_visual project_id={product.id} featured />
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
                    <span className={styles.availability_note}>Research & development project</span>
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

              <p className={styles.product_caveat}><strong>Development stage</strong><span>{product.caveat}</span></p>
            </article>
          ))}
        </div>
      </section>

      <span id="philosophy" aria-hidden="true" />
      <section id="principles" className={styles.principles_section} aria-labelledby="principles_heading">
        <div className={styles.section_heading}>
          <div>
            <p className={styles.eyebrow}>THE COMMON THREAD / 002</p>
            <h2 id="principles_heading">Working principles.</h2>
          </div>
          <div className={styles.section_aside_copy}>
            <p>Understandable tools, clear ownership, and work you can inspect.</p>
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
          <h2 id="questions_heading">Practical details.</h2>
          <p>Setup, scope, and getting started.</p>
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
          <p className={styles.eyebrow}>SOURCE & DEVELOPMENT</p>
          <h2>Follow the work.</h2>
        </div>
        <a className={styles.primary_link} href={github_url} target="_blank" rel="noopener noreferrer">
          Explore GitHub <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
