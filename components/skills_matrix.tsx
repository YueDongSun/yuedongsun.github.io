import type { Technical_skills } from '../lib/profile_contract';

const skill_groups: Array<{ key: keyof Technical_skills; label: string; description: string }> = [
  { key: 'software', label: 'Software', description: 'Languages & tooling' },
  { key: 'systems', label: 'Systems', description: 'Infrastructure & operations' },
  { key: 'research', label: 'Research', description: 'Computation & control' },
  { key: 'optical', label: 'Optical', description: 'Experimental practice' },
];

export function Skills_matrix({ skills, languages }: { skills: Technical_skills; languages: string[] }) {
  return (
    <div className="skills_matrix">
      {skill_groups.map(({ key, label, description }) => (
        <article className="skill_group" key={key}>
          <div className="skill_group_header"><p className="eyebrow">{label.toUpperCase()}</p><span>{description}</span></div>
          <ul>{skills[key].map((skill) => <li key={skill}>{skill}</li>)}</ul>
        </article>
      ))}
      <article className="skill_group spoken_languages">
        <div className="skill_group_header"><p className="eyebrow">LANGUAGES</p><span>Communication</span></div>
        <ul>{languages.map((language) => <li key={language}>{language}</li>)}</ul>
      </article>
    </div>
  );
}
