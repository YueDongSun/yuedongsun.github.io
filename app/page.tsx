import { Contact_details } from '../components/contact_details';
import { Education_section } from '../components/education_section';
import { Publication_list } from '../components/publication_list';
import { Project_gallery } from '../components/project_gallery';
import { Research_project_list } from '../components/research_project_list';
import { Skills_matrix } from '../components/skills_matrix';
import { Site_header } from '../components/site_header';
import { github_url, profile } from '../config/profile';

export default function Cv_page() {
  const primary_education = profile.education[0];

  return (
    <div className="site_shell">
      <a className="skip_link" href="#main_content">Skip to content</a>
      <Site_header display_name={profile.display_name} monogram={profile.monogram} />
      <main id="main_content">
        <div id="home" />
        <section className="hero" id="about" aria-labelledby="hero_heading">
          <div className="hero_copy">
            <p className="eyebrow"><span className="status_dot" /> QUANTUM OPTICS · AI FOR SCIENCE · SOFTWARE</p>
            <h1 id="hero_heading">Building bridges<br />between <em>physics</em><br />and software.</h1>
            <p className="hero_description">{profile.summary}</p>
            <div className="hero_actions">
              <a className="button button_primary" href="#research">Explore the research <span aria-hidden="true">↗</span></a>
              <a className="text_link" href={github_url} target="_blank" rel="noopener noreferrer">Open source work <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero_footnote"><span className="small_line" /> {profile.availability.toUpperCase()}</div>
          </div>
          <aside className="profile_card" aria-label="Profile at a glance">
            <div className="card_topline"><span>PROFILE / 01</span><span className="profile_spark" aria-hidden="true">✳</span></div>
            <div className="profile_art" aria-hidden="true">
              <div className="orbit orbit_one" /><div className="orbit orbit_two" />
              <span className="profile_letter">{profile.monogram}</span>
              <span className="art_caption">NO PHOTO,<br />JUST IDEAS.</span>
            </div>
            <div className="profile_caption"><div><h2>{profile.display_name}</h2><p>{profile.role}</p></div><span className="profile_badge" aria-hidden="true">↗</span></div>
            <dl className="profile_details">
              <div><dt>Research</dt><dd>{profile.focus_areas.slice(0, 2).join(' · ')}</dd></div>
              <div><dt>Training</dt><dd>{primary_education?.title.replace(' in Quantum Optics and Quantum Information', '') ?? 'Research & software'}</dd></div>
              <div><dt>Based in</dt><dd>{primary_education?.organization.split(' · ')[0].replace('Tsinghua University, ', '') ?? 'Independent practice'}</dd></div>
            </dl>
          </aside>
        </section>
        <div className="focus_strip">
          <span className="eyebrow">AT THE INTERSECTION OF</span><span>Experimental physics</span>
          <span className="strip_star" aria-hidden="true">✳</span><span>Learning systems</span>
          <span className="strip_star" aria-hidden="true">✳</span><span>Useful software</span>
        </div>
        <section className="content_section" id="experience" aria-labelledby="experience_heading">
          <div className="section_heading">
            <p className="eyebrow">01 / THE JOURNEY</p>
            <h2 id="experience_heading">Research &<br /><em>perspective.</em></h2>
            <p className="section_aside">From atoms to agent systems,<br />the through-line is curiosity.</p>
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
            <Education_section entries={profile.education} />
            <div className="focus_areas">
              <p className="eyebrow">AREAS OF FOCUS</p>
              <ul>{profile.focus_areas.map((area) => <li key={area}>{area}</li>)}</ul>
            </div>
          </div>
        </section>
        <section className="content_section research_section" id="research" aria-labelledby="research_heading">
          <div className="section_heading">
            <p className="eyebrow">02 / RESEARCH PORTFOLIO</p>
            <h2 id="research_heading">Questions,<br />made <em>measurable.</em></h2>
            <p className="section_aside">Six projects across quantum<br />networks, control, and learning.</p>
          </div>
          <Research_project_list projects={profile.research_projects} />
        </section>
        <section className="projects_section" id="projects" aria-labelledby="projects_heading">
          <div className="projects_heading_row">
            <div className="section_heading"><p className="eyebrow">03 / SELECTED REPOSITORIES</p><h2 id="projects_heading">Ideas, out<br /><em>in the open.</em></h2></div>
            <p className="projects_intro">A few public repositories across agent tooling and quantum software. Explore the code, context, and experiments.</p>
          </div>
          <Project_gallery projects={profile.projects} />
          <a className="all_projects_link text_link" href={github_url + '?tab=repositories'} target="_blank" rel="noopener noreferrer">More on GitHub <span aria-hidden="true">↗</span></a>
        </section>
        <section className="content_section publications_section" id="publications" aria-labelledby="publications_heading">
          <div className="section_heading">
            <p className="eyebrow">04 / PUBLICATIONS</p>
            <h2 id="publications_heading">Work that<br /><em>travels.</em></h2>
            <p className="section_aside">From work in preparation<br />to published results.</p>
          </div>
          <Publication_list publications={profile.publications} />
        </section>
        <section className="content_section skills_section" id="skills" aria-labelledby="skills_heading">
          <div className="section_heading">
            <p className="eyebrow">05 / TOOLKIT</p>
            <h2 id="skills_heading">A practical<br /><em>toolkit.</em></h2>
            <p className="section_aside">Tools are a means to<br />make better questions answerable.</p>
          </div>
          <Skills_matrix skills={profile.technical_skills} languages={profile.languages} />
        </section>
        <section className="contact_section" id="contact" aria-labelledby="contact_heading">
          <p className="eyebrow">HAVE SOMETHING IN MIND?</p>
          <h2 id="contact_heading">Let’s make<br /><em>something worthwhile.</em></h2>
          <p className="contact_description">{profile.availability}. A question, an idea, or a shared curiosity — start a conversation.</p>
          <Contact_details contact={profile.contact_details} github_username={profile.github_username} github_url={github_url} availability={profile.availability} />
          <span className="contact_flower" aria-hidden="true">✳</span>
        </section>
      </main>
      <footer className="site_footer">
        <span>{profile.display_name}<span className="wordmark_dot">.</span><span className="footer_caption">A small corner of the internet.</span></span>
        <span className="footer_platform">No portrait. Just the work.</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  );
}
