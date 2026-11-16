'use client';

import Link from 'next/link';
import { useEffect as use_effect, useRef as use_ref, useState as use_state } from 'react';
type Site_page = 'home' | 'tools';

interface Navigation_item {
  href: string;
  label: string;
  section_id?: string;
  compact_hidden?: boolean;
}

const home_navigation_items: Navigation_item[] = [
  { href: '#about', section_id: 'about', label: 'About' },
  { href: '#experience', section_id: 'experience', label: 'Experience' },
  { href: '#research', section_id: 'research', label: 'Research' },
  { href: '#publications', section_id: 'publications', label: 'Papers' },
  { href: '#projects', section_id: 'projects', label: 'Projects' },
  { href: '/tools/', label: 'Tools' },

];

const tools_navigation_items: Navigation_item[] = [
  { href: '/', label: 'Home' },
  { href: '#tools_overview', section_id: 'tools_overview', label: 'Overview' },
  { href: '#products', section_id: 'products', label: 'Products' },
  { href: '#principles', section_id: 'principles', label: 'Principles' },
  { href: '#questions', section_id: 'questions', label: 'FAQ' },
];

// Keep this breakpoint aligned with the mobile header in app/globals.css.
const mobile_navigation_query = '(max-width: 900px)';

export function Site_header({
  display_name,
  current_page = 'home',
}: {
  display_name: string;
  current_page?: Site_page;
}) {
  const navigation_items = current_page === 'tools' ? tools_navigation_items : home_navigation_items;
  const first_section = current_page === 'tools' ? 'tools_overview' : 'about';
  const [active_section, set_active_section] = use_state(first_section);
  const [menu_open, set_menu_open] = use_state(false);
  const header_ref = use_ref<HTMLElement>(null);

  use_effect(() => {
    if (!('IntersectionObserver' in window)) return;
    const section_observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) set_active_section(entry.target.id);
      }
    }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
    for (const { section_id } of navigation_items) {
      if (!section_id) continue;
      const section_element = document.getElementById(section_id);
      if (section_element) section_observer.observe(section_element);
    }
    return () => section_observer.disconnect();
  }, [current_page, navigation_items]);

  use_effect(() => {
    const media_query = window.matchMedia(mobile_navigation_query);
    function close_on_desktop() {
      if (!media_query.matches) set_menu_open(false);
    }
    media_query.addEventListener('change', close_on_desktop);
    return () => media_query.removeEventListener('change', close_on_desktop);
  }, []);

  use_effect(() => {
    if (!menu_open) return;
    function close_on_escape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        set_menu_open(false);
        document.getElementById('menu_toggle')?.focus();
      }
    }
    function close_on_outside_click(event: PointerEvent) {
      if (event.target instanceof Node && !header_ref.current?.contains(event.target)) set_menu_open(false);
    }
    window.addEventListener('keydown', close_on_escape);
    document.addEventListener('pointerdown', close_on_outside_click);
    return () => {
      window.removeEventListener('keydown', close_on_escape);
      document.removeEventListener('pointerdown', close_on_outside_click);
    };
  }, [menu_open]);

  use_effect(() => {
    // Browsers may suppress closed details in print regardless of their CSS.
    let print_snapshot: Array<{ element: HTMLDetailsElement; open: boolean }> | null = null;
    function expand_for_print() {
      if (print_snapshot) return;
      print_snapshot = Array.from(document.querySelectorAll<HTMLDetailsElement>('main details'),
        (element) => ({ element, open: element.open }));
      print_snapshot.forEach(({ element }) => { element.open = true; });
    }
    function restore_after_print() {
      print_snapshot?.forEach(({ element, open }) => { element.open = open; });
      print_snapshot = null;
    }
    window.addEventListener('beforeprint', expand_for_print);
    window.addEventListener('afterprint', restore_after_print);
    return () => {
      window.removeEventListener('beforeprint', expand_for_print);
      window.removeEventListener('afterprint', restore_after_print);
      restore_after_print();
    };
  }, []);

  return (
    <header className="site_header" ref={header_ref}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) set_menu_open(false);
      }}>
      <Link className="wordmark" href={current_page === 'tools' ? '/' : '#home'} aria-label={`${display_name} home`}
        onClick={() => { set_menu_open(false); set_active_section(first_section); }}>
        <span className="wordmark_name">{display_name}</span>
      </Link>
      <button type="button" className="menu_button" id="menu_toggle" aria-controls="main_navigation"
        aria-expanded={menu_open} aria-label={menu_open ? 'Close navigation' : 'Open navigation'}
        onClick={() => set_menu_open(!menu_open)}>{menu_open ? 'Close −' : 'Menu +'}</button>
      <nav id="main_navigation" className={menu_open ? 'menu_open' : ''} aria-label="Main navigation">
        {navigation_items.map(({ href, label, section_id, compact_hidden }) => {
          const is_active = section_id === active_section;
          const class_name = [is_active ? 'nav_active' : '', compact_hidden ? 'nav_compact_hidden' : '']
            .filter(Boolean).join(' ') || undefined;
          const content = <>{label}{section_id === 'contact' && <span aria-hidden="true"> ↗</span>}</>;
          return section_id ? (
            <a key={href} href={href} className={class_name}
              aria-current={is_active ? 'location' : undefined}
              onClick={() => { set_menu_open(false); set_active_section(section_id); }}>
              {content}
            </a>
          ) : (
            <Link key={href} href={href} className={class_name} onClick={() => set_menu_open(false)}>
              {content}
            </Link>
          );
        })}
      </nav>
      <button type="button" className="print_button" onClick={() => window.print()}
        aria-label={current_page === 'tools' ? 'Print this page or save it as a PDF' : 'Print CV or save it as a PDF'}>
        {current_page === 'tools' ? 'Print page' : 'Print CV'} <span aria-hidden="true">↓</span>
      </button>
    </header>
  );
}
