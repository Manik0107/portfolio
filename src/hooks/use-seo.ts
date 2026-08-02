import { useEffect } from 'react';

interface SeoOptions {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  jsonLd?: object[];
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function injectJsonLd(entries: object[]) {
  document.head.querySelectorAll('script[data-seo-jsonld]').forEach((s) => s.remove());
  for (const entry of entries) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-jsonld', '');
    script.textContent = JSON.stringify(entry);
    document.head.appendChild(script);
  }
}

export function useSeo({
  title,
  description,
  canonical,
  image,
  type = 'website',
  noindex = false,
  jsonLd = [],
}: SeoOptions) {
  useEffect(() => {
    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:site_name', 'Manik Manavenddra Portfolio');
    if (image) {
      upsertMeta('property', 'og:image', image);
      upsertMeta('property', 'og:image:alt', `${title} - Manik Manavenddra`);
    }

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    if (image) upsertMeta('name', 'twitter:image', image);

    injectJsonLd(jsonLd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonical, image, type, noindex, JSON.stringify(jsonLd)]);
}
