import { profile, github_url } from '../config/profile';
import { Site_header } from '../components/site_header';
import { Project_gallery } from '../components/project_gallery';

export default function Cv_page() {
  const contact_url = profile.email ? `mailto:${encodeURIComponent(profile.email)}` : github_url;

  return (
    <div className="site_shell">
      <a className="skip_link" href="#main_content">Skip to content</a>
      <Site_header display_name={profile.display_name} monogram={profile.monogram} />
      <main id="main_content">
        <div id="home" />
        <section className="hero" id="about" aria-labelledby="hero_heading">
          <div className="hero_copy">
            <p className="eyebrow"><span className="status_dot" /> DEVELOPER · RESEARCHER · BUILDER</p>
            <h1 id="hero_heading">Hi, I’m {profile.display_name}.<br />I turn ideas into<br /><em>useful things.</em></h1>
            <p className="hero_description">{profile.summary}</p>
            <div className="hero_actions">
              <a className="button button_primary" href="#projects">Explore my work <span aria-hidden="true">↗</span></a>
              <a className="text_link" href={github_url} target="_blank" rel="noopener noreferrer">Find me on GitHub <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero_footnote"><span className="small_line" /> ALWAYS LEARNING. ALWAYS MAKING.</div>
          </div>
          <aside className="profile_card" aria-label="Profile at a glance">
            <div className="card_topline"><span>PROFILE / 01</span><span className="profile_spark" aria-hidden="true">✳</span></div>
            <div className="profile_art" aria-hidden="true">
              <div className="orbit orbit_one" /><div className="orbit orbit_two" />
              <span className="profile_letter">{profile.monogram}</span>
              <span className="art_caption">A WORK IN PROGRESS,<br />IN THE BEST WAY.</span>
            </div>
            <div className="profile_caption"><div><h2>{profile.display_name}</h2><p>{profile.role}</p></div><span className="profile_badge" aria-hidden="true">↗</span></div>
            <dl className="profile_details">
              <div><dt>Focus</dt><dd>Software & research</dd></div>
              <div><dt>On the web</dt><dd><a href={github_url} target="_blank" rel="noopener noreferrer">@{profile.github_username}</a></dd></div>
              <div><dt>Approach</dt><dd>Build. Learn. Improve.</dd></div>
            </dl>
          </aside>
        </section>
        <div className="focus_strip">
          <span className="eyebrow">AT THE INTERSECTION OF</span><span>Thoughtful engineering</span>
          <span className="strip_star" aria-hidden="true">✳</span><span>Scientific curiosity</span>
          <span className="strip_star" aria-hidden="true">✳</span><span>Useful software</span>
        </div>
        <section className="content_section" id="experience" aria-labelledby="experience_heading">
          <div className="section_heading">
            <p className="eyebrow">01 / THE JOURNEY</p>
            <h2 id="experience_heading">Experience &<br /><em>perspective.</em></h2>
            <p className="section_aside">The work, the thinking,<br />and the things I keep learning.</p>
          </div>
          <div className="experience_content">
            <p className="experience_lead">I like working where ideas<br className="desktop_break" /> meet implementation.</p>
            <div className="timeline">
              {profile.experience.map((entry) => (
                <article className="timeline_entry" key={entry.title + entry.organization}>
                  <span className="timeline_marker" aria-hidden="true" />
                  <p className="timeline_period">{entry.period}</p>
                  <h3>{entry.title}</h3>
                  <p className="timeline_organization">{entry.organization}</p>
                  <p className="timeline_description">{entry.description}</p>
                </article>
              ))}
            </div>
            {profile.education.length > 0 && (
              <div className="education_group">
                <h3 className="eyebrow">EDUCATION & TRAINING</h3>
                {profile.education.map((entry) => (
                  <article className="education_entry" key={entry.title + entry.organization}>
                    <p className="timeline_period">{entry.period}</p><h4>{entry.title}</h4>
                    <p className="timeline_organization">{entry.organization}</p>
                    <p className="timeline_description">{entry.description}</p>
                  </article>
                ))}
              </div>
            )}
            <div className="focus_areas">
              <p className="eyebrow">AREAS OF FOCUS</p>
              <ul>{profile.focus_areas.map((area) => <li key={area}>{area}</li>)}</ul>
            </div>
            {!profile.is_complete && <p className="draft_note"><span className="status_dot" /> Profile draft · Career details and education to be added.</p>}
          </div>
        </section>
        <section className="projects_section" id="projects" aria-labelledby="projects_heading">
          <div className="projects_heading_row">
            <div className="section_heading"><p className="eyebrow">02 / SELECTED REPOSITORIES</p><h2 id="projects_heading">Ideas, out<br /><em>in the open.</em></h2></div>
            <p className="projects_intro">A few repositories from my GitHub.<br />Explore the code, context, and experiments.</p>
          </div>
          <Project_gallery projects={profile.projects} />
          <a className="all_projects_link text_link" href={github_url + '?tab=repositories'} target="_blank" rel="noopener noreferrer">More on GitHub <span aria-hidden="true">↗</span></a>
        </section>
        <section className="contact_section" id="contact" aria-labelledby="contact_heading">
          <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
          <h2 id="contact_heading">Let’s make<br /><em>something worthwhile.</em></h2>
          <p className="contact_description">A question, an idea, or a shared curiosity — start a conversation.</p>
          <a className="button button_light" href={contact_url} target={profile.email ? undefined : '_blank'} rel={profile.email ? undefined : 'noopener noreferrer'}>
            {profile.email ? 'Say hello' : 'Find me on GitHub'} <span aria-hidden="true">↗</span>
          </a>
          <span className="contact_flower" aria-hidden="true">✳</span>
        </section>
      </main>
      <footer className="site_footer">
        <span>{profile.display_name}<span className="wordmark_dot">.</span><span className="footer_caption">A small corner of the internet.</span></span>
        <span className="footer_platform">Made for GitHub Pages</span>
        <a href="#home">Back to top ↑</a>
      </footer>
      <p className="print_identity">{profile.site_url} · {github_url}{profile.email ? ` · ${profile.email}` : ''}</p>
    </div>
  );
}

