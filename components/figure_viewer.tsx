'use client';

import Image from 'next/image';
import { useId as use_id, useRef as use_ref } from 'react';
import styles from './research_visuals.module.css';

interface Figure_viewer_props {
  src: string;
  preview_src?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  title?: string;
  source_url?: string;
  source_label?: string;
  compact?: boolean;
  className?: string;
  sizes?: string;
}

/** A visible preview with a full-size, keyboard-accessible native image dialog. */
export function Figure_viewer({ src, preview_src, alt, caption, width, height, title, source_url, source_label, compact = false, className = '', sizes = '(max-width: 700px) 50vw, 280px' }: Figure_viewer_props) {
  const dialog_ref = use_ref<HTMLDialogElement>(null);
  const trigger_ref = use_ref<HTMLAnchorElement>(null);
  const figure_id = use_id();
  const heading_id = `${figure_id}-heading`;
  const caption_id = `${figure_id}-caption`;

  return (
    <figure className={`${styles.figure} ${className}`}>
      <a ref={trigger_ref} className={styles.thumbnail} href={src} target="_blank" rel="noopener noreferrer" aria-label={`Enlarge figure: ${alt}`} aria-haspopup="dialog" aria-controls={figure_id}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          const dialog = dialog_ref.current;
          if (dialog && typeof dialog.showModal === 'function') {
            event.preventDefault();
            dialog.showModal();
          }
        }}>
        <Image src={preview_src ?? src} alt={alt} width={width} height={height} sizes={sizes} className={styles.previewImage} loading="lazy" />
        <span className={styles.enlargeLabel} aria-hidden="true"><span>View figure</span> ⤢</span>
      </a>
      <figcaption className={compact ? styles.visuallyHidden : styles.caption}>
        {caption}
        {source_url ? <a className={styles.sourceLink} href={source_url} target="_blank" rel="noopener noreferrer">{source_label || 'Figure source'} ↗</a> : source_label ? <span className={styles.sourceLabel}>{source_label}</span> : null}
      </figcaption>
      <dialog ref={dialog_ref} id={figure_id} className={styles.lightbox} aria-labelledby={heading_id} aria-describedby={caption_id} onClose={() => trigger_ref.current?.focus()}>
        <div className={styles.lightboxHeader}>
          <h3 id={heading_id}>{title || 'Research figure'}</h3>
          <button type="button" aria-label="Close enlarged figure" onClick={() => dialog_ref.current?.close()}>Close <span aria-hidden="true">×</span></button>
        </div>
        <div className={styles.fullImageFrame}><Image src={src} alt={alt} width={width} height={height} sizes="90vw" className={styles.fullImage} /></div>
        <div className={styles.lightboxFooter}>
          <p id={caption_id}>{caption}</p>
          <div>
            {source_url ? <a href={source_url} target="_blank" rel="noopener noreferrer">{source_label || 'Figure source'} ↗</a> : source_label ? <span>{source_label}</span> : null}
            <a href={src} target="_blank" rel="noopener noreferrer">Open original image ↗</a>
          </div>
        </div>
      </dialog>
    </figure>
  );
}
