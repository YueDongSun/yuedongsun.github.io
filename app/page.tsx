import Link from 'next/link';
import { Profile_schema } from '../components/profile_schema';
import { Publication_list } from '../components/publication_list';
import { Project_gallery } from '../components/project_gallery';
import { Research_project_list } from '../components/research_project_list';
import { Skills_matrix } from '../components/skills_matrix';
import { Site_header } from '../components/site_header';
import { Experience_stories } from '../components/experience_stories';
import { github_url, profile } from '../config/profile';

export default function Cv_page() {
  return (
    <div className="site_shell">
      <Profile_schema />
      <a className="skip_link" href="#main_content">Skip to content</a>
      <Site_header display_name={profile.display_name} />
      <div id="home" />
      <main id="main_content" className="portfolio_layout">
        <aside className="profile_sidebar" aria-label="About Yuedong Sun">
          <div className="profile_sidebar_inner">
            <div className="identity_monogram" aria-hidden="true">ys<span>↗</span></div>
            <p className="eyebrow">PHYSICS / SYSTEMS / SOFTWARE</p>
            <h1>{profile.display_name}</h1>
            <p className="chinese_name" lang="zh-CN">孙跃东 <span>· {profile.nickname}</span></p>
            <p className="profile_role">{profile.role}</p>
            <p className="profile_bio">{profile.summary}</p>
            <div className="profile_links">
              <a href={github_url} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
              <a href={profile.contact_details.scholar_url} target="_blank" rel="noopener noreferrer">Google Scholar <span aria-hidden="true">↗</span></a>
            </div>
            <div className="sidebar_block">
              <p className="eyebrow">CURRENTLY</p>
              <p className="current_status"><span className="status_dot" />{profile.availability}</p>
            </div>
            <div className="sidebar_block">
              <p className="eyebrow">EDUCATION</p>
              {profile.education.map((entry) => (
                <div className="sidebar_education" key={entry.title}>
                  <span>{entry.period}</span>
                  <strong>{entry.title}</strong>
                  <p>{/tsinghua/i.test(entry.organization) ? 'Tsinghua University · IIIS' : 'USTC · School of the Gifted Young'}</p>
                </div>
              ))}
            </div>
            <div className="sidebar_block sidebar_topics">
              <p className="eyebrow">INTERESTS</p>
              <ul>{profile.focus_areas.map((area) => <li key={area}>{area}</li>)}</ul>
            </div>
            <p className="sidebar_location">Beijing, China <span>UTC +8</span></p>
          </div>
        </aside>
        <div className="portfolio_content">
          <section className="introduction" id="about" aria-labelledby="intro_heading">
            <div className="intro_topline"><p className="eyebrow">PHYSICS, LEARNING & ENGINEERING</p><span>Research & engineering</span></div>
            <h2 id="intro_heading">Quantum systems.<br /><em>Useful software.</em></h2>
            <p>I work across quantum memories, STEM reinforcement learning, and the tools that make research easier to do. Explore my experiments, published work, and software.</p>
          </section>
          <Experience_stories entries={profile.experience} />
          <section className="content_section research_section" id="research" aria-labelledby="research_heading">
            <div className="section_heading">
              <div><p className="eyebrow">EXPERIMENTS & QUESTIONS</p><h2 id="research_heading">Research <span lang="zh-CN">研究</span></h2></div>
              <span className="section_index">02</span>
            </div>
            <Research_project_list projects={profile.research_projects} />
          </section>
          <section className="content_section publications_section" id="publications" aria-labelledby="publications_heading">
            <div className="section_heading">
              <div><p className="eyebrow">PAPERS & PREPRINTS</p><h2 id="publications_heading">Publications <span lang="zh-CN">论文</span></h2></div>
              <a className="small_link" href={profile.contact_details.scholar_url} target="_blank" rel="noopener noreferrer">Google Scholar ↗</a>
            </div>
            <Publication_list publications={profile.publications} />
          </section>
          <section className="content_section projects_section" id="projects" aria-labelledby="projects_heading">
            <span id="engineering" aria-hidden="true" />
            <div className="section_heading">
              <div><p className="eyebrow">CODE, TOOLS & EXPERIMENTS</p><h2 id="projects_heading">Selected projects <span lang="zh-CN">项目</span></h2></div>
              <Link className="small_link" href="/tools/">Tools in detail ↗</Link>
            </div>
            <Project_gallery projects={profile.projects} />
            <a className="all_projects_link small_link" href={`${github_url}?tab=repositories`} target="_blank" rel="noopener noreferrer">Browse all repositories ↗</a>
          </section>
          <section className="content_section skills_section" id="skills" aria-labelledby="skills_heading">
            <div className="section_heading"><div><p className="eyebrow">IN THE LAB & AT THE KEYBOARD</p><h2 id="skills_heading">Working toolkit <span lang="zh-CN">工具</span></h2></div><span className="section_index">05</span></div>
            <Skills_matrix skills={profile.technical_skills} languages={profile.languages} />
          </section>
          <section className="contact_section" id="contact" aria-labelledby="contact_heading">
            <div><p className="eyebrow">GET IN TOUCH</p><h2 id="contact_heading">Let’s compare notes.</h2><p>Quantum networks, scientific software, and ideas worth building.</p></div>
            <div className="contact_links"><a href={github_url} target="_blank" rel="noopener noreferrer">Find me on GitHub ↗</a><a href={profile.contact_details.scholar_url} target="_blank" rel="noopener noreferrer">Research on Google Scholar ↗</a></div>
          </section>
        </div>
      </main>
      <footer className="site_footer"><span>{profile.display_name} <span lang="zh-CN">/ 孙跃东</span></span><span className="footer_caption">Physics, code, and ongoing questions.</span><a href="#home">Back to top ↑</a></footer>
    </div>
  );
}
