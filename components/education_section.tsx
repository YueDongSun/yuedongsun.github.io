import type { Cv_entry } from '../lib/profile_contract';

export function Education_section({ entries }: { entries: Cv_entry[] }) {
  return (
    <div className="education_group">
      <p className="eyebrow">EDUCATION & TRAINING</p>
      <div className="education_rows">
        {entries.map((entry) => (
          <article className="education_entry" key={`${entry.title}-${entry.organization}`}>
            <p className="timeline_period">{entry.period}</p>
            <h3>{entry.title}</h3>
            <p className="timeline_organization">{entry.organization}</p>
            <p className="timeline_description">{entry.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
