import Image from 'next/image';
import Link from 'next/link';
import { Profile_schema } from '../components/profile_schema';
import { Publication_list } from '../components/publication_list';
import { Project_gallery } from '../components/project_gallery';
import { Research_project_list } from '../components/research_project_list';
import { Skills_matrix } from '../components/skills_matrix';
import { Site_header } from '../components/site_header';
import { github_url, profile } from '../config/profile';

function institution(organization: string) {
  if (/seed|bytedance/i.test(organization)) {
    return { logo: '/institutions/seed.png', name: 'ByteDance Seed', chinese: '字节跳动 · Seed', url: 'https://seed.bytedance.com/en/' };
  }
  if (/tsinghua|iiis/i.test(organization)) {
    return { logo: '/institutions/iiis.png', name: 'Tsinghua University · IIIS', chinese: '清华大学 · 交叉信息研究院', url: 'https://iiis.tsinghua.edu.cn/en/' };
  }
  return { logo: '/institutions/ustc-sgy.png', name: 'USTC · School of the Gifted Young', chinese: '中国科学技术大学 · 少年班学院', url: 'https://sgy.ustc.edu.cn/main.htm' };
}

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
            <div className="intro_topline"><p className="eyebrow">A PERSONAL NOTEBOOK</p><span>Research & engineering</span></div>
            <h2 id="intro_heading">Quantum systems.<br /><em>Useful software.</em></h2>
            <p>I work across quantum memories, physical inference, and the tools that make research easier to do. This is a collection of my experiments, papers, and software.</p>
          </section>
          <section className="experience_section" id="experience" aria-labelledby="experience_heading">
            <div className="section_heading compact_heading">
              <h2 id="experience_heading">Education & experience <span lang="zh-CN">经历</span></h2>
              <span className="section_index">01</span>
            </div>
            <div className="affiliation_grid">
              {profile.experience.map((entry) => {
                const org = institution(entry.organization);
                return (
                  <article className="affiliation_card" key={entry.organization}>
                    <div className="affiliation_top"><a href={org.url} aria-label={org.name} target="_blank" rel="noopener noreferrer"><Image src={org.logo} alt={`${org.name} logo`} width={220} height={48} className="institution_logo" /></a><span>{entry.period}</span></div>
                    <h3>{org.name}</h3>
                    <p className="affiliation_chinese" lang="zh-CN">{org.chinese}</p>
                    <p className="affiliation_role">{entry.title}</p>
                    <p className="affiliation_description">{entry.description}</p>
                  </article>
                );
              })}
            </div>
          </section>
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
