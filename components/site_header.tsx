'use client';

import { useEffect as use_effect, useState as use_state } from 'react';

const navigation_items = [
  { section_id: 'about', label: 'About' },
  { section_id: 'experience', label: 'Experience' },
  { section_id: 'projects', label: 'Projects' },
  { section_id: 'contact', label: 'Contact' },
];

export function Site_header({ display_name, monogram }: { display_name: string; monogram: string }) {
  const [active_section, set_active_section] = use_state('about');
  const [menu_open, set_menu_open] = use_state(false);

  use_effect(() => {
    if (!('IntersectionObserver' in window)) return;
    const section_observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) set_active_section(entry.target.id);
      }
    }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
    for (const { section_id } of navigation_items) {
      const section_element = document.getElementById(section_id);
      if (section_element) section_observer.observe(section_element);
    }
    return () => section_observer.disconnect();
  }, []);

  use_effect(() => {
    if (!menu_open) return;
    function close_on_escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        set_menu_open(false);
        document.getElementById('menu_toggle')?.focus();
      }
    }
    window.addEventListener('keydown', close_on_escape);
    return () => window.removeEventListener('keydown', close_on_escape);
  }, [menu_open]);

  return (
    <header className="site_header">
      <a className="wordmark" href="#home" aria-label={`${display_name} home`}>
        <span className="brand_mark" aria-hidden="true">{monogram}</span>
        <span>{display_name}<span className="wordmark_dot">.</span></span>
      </a>
      <nav id="main_navigation" className={menu_open ? 'menu_open' : ''} aria-label="Main navigation">
        {navigation_items.map(({ section_id, label }) => (
          <a key={section_id} href={`#${section_id}`}
            className={active_section === section_id ? 'nav_active' : undefined}
            aria-current={active_section === section_id ? 'location' : undefined}
            onClick={() => { set_menu_open(false); set_active_section(section_id); }}>
            {label}{section_id === 'contact' && <span aria-hidden="true"> ↗</span>}
          </a>
        ))}
      </nav>
      <button type="button" className="print_button" onClick={() => window.print()}
        aria-label="Print CV or save it as a PDF">Print CV <span aria-hidden="true">↓</span></button>
      <button type="button" className="menu_button" id="menu_toggle" aria-controls="main_navigation"
        aria-expanded={menu_open} aria-label={menu_open ? 'Close navigation' : 'Open navigation'}
        onClick={() => set_menu_open(!menu_open)}>{menu_open ? 'Close −' : 'Menu +'}</button>
    </header>
  );
}
