/**
 * Blog registry — single source of truth for posts.
 * Renders to /blog/index.astro and /blog/[slug].astro.
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO 8601
  author: string;
  tag: 'engineering' | 'design' | 'announcement';
  readMinutes: number;
}

export const posts: BlogPost[] = [
  {
    slug: 'why-client-side',
    title: 'Why we built ToolBox Image to run entirely in your browser',
    description:
      'A walkthrough of the architecture behind a privacy-first image toolkit — and why the browser turned out to be the right place for it.',
    date: '2026-06-22',
    author: 'ToolBox Image team',
    tag: 'engineering',
    readMinutes: 6,
  },
  {
    slug: 'image-compression-basics',
    title: 'How image compression actually works (in 5 minutes)',
    description:
      'JPEG, WebP, AVIF — what they do, what they trade off, and how to pick the right encoder for the job.',
    date: '2026-06-15',
    author: 'ToolBox Image team',
    tag: 'engineering',
    readMinutes: 5,
  },
  {
    slug: 'designing-the-compressor',
    title: 'Designing the Compressor: details that mattered',
    description:
      'Notes from the design process — how we made a tool that feels fast and respectful of your files.',
    date: '2026-06-08',
    author: 'ToolBox Image team',
    tag: 'design',
    readMinutes: 4,
  },
  {
    slug: 'introducing-toolboximage',
    title: 'Introducing ToolBox Image v1.0',
    description:
      'The Compressor is live. Here is what we are building next and why.',
    date: '2026-06-01',
    author: 'ToolBox Image team',
    tag: 'announcement',
    readMinutes: 3,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
