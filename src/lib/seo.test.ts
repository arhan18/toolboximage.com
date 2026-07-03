import { describe, it, expect } from 'vitest';
import { faqSchema, breadcrumbSchema, softwareAppSchema, howToSchema, websiteSchema } from './seo';

describe('faqSchema', () => {
  it('returns valid FAQPage schema', () => {
    const result = faqSchema([
      { q: 'Q1', a: 'A1' },
      { q: 'Q2', a: 'A2' },
    ]);
    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('FAQPage');
    expect(result.mainEntity).toHaveLength(2);
    expect(result.mainEntity[0].name).toBe('Q1');
    expect(result.mainEntity[0].acceptedAnswer.text).toBe('A1');
  });

  it('returns empty mainEntity for empty input', () => {
    const result = faqSchema([]);
    expect(result.mainEntity).toHaveLength(0);
  });
});

describe('breadcrumbSchema', () => {
  it('returns valid BreadcrumbList schema', () => {
    const result = breadcrumbSchema([
      { name: 'Home', href: '/' },
      { name: 'Tools', href: '/image-tools/' },
    ]);
    expect(result['@type']).toBe('BreadcrumbList');
    expect(result.itemListElement).toHaveLength(2);
    expect(result.itemListElement[0].position).toBe(1);
    expect(result.itemListElement[0].name).toBe('Home');
    expect(result.itemListElement[0].item).toBe('https://toolboximage.com/');
  });

  it('assigns sequential positions', () => {
    const items = [
      { name: 'A', href: '/a' },
      { name: 'B', href: '/b' },
      { name: 'C', href: '/c' },
    ];
    const result = breadcrumbSchema(items);
    expect(result.itemListElement[0].position).toBe(1);
    expect(result.itemListElement[1].position).toBe(2);
    expect(result.itemListElement[2].position).toBe(3);
  });
});

describe('softwareAppSchema', () => {
  it('returns valid SoftwareApplication schema', () => {
    const result = softwareAppSchema({
      name: 'Test App',
      description: 'A test app',
      url: 'https://example.com/app',
    });
    expect(result['@type']).toBe('SoftwareApplication');
    expect(result.name).toBe('Test App');
    expect(result.description).toBe('A test app');
    expect(result.url).toBe('https://example.com/app');
    expect(result.applicationCategory).toBe('MultimediaApplication');
    expect(result.operatingSystem).toBe('Any');
  });
});

describe('websiteSchema', () => {
  it('returns valid WebSite schema with SearchAction', () => {
    const result = websiteSchema();
    expect(result['@type']).toBe('WebSite');
    expect(result.name).toBe('ToolBox Image');
    expect(result.potentialAction['@type']).toBe('SearchAction');
    expect(result.potentialAction.target['@type']).toBe('EntryPoint');
    expect(result.potentialAction.target.urlTemplate).toContain('/search?q=');
    expect(result.potentialAction['query-input']).toBe('required name=search_term_string');
    expect(result.inLanguage).toBe('en-US');
  });
});

describe('howToSchema', () => {
  it('returns valid HowTo schema from steps', () => {
    const steps = [
      { name: 'Step 1', text: 'Do this' },
      { name: 'Step 2', text: 'Do that' },
    ];
    const result = howToSchema(steps);
    expect(result['@type']).toBe('HowTo');
    expect(result.step).toHaveLength(2);
    expect(result.step[0].name).toBe('Step 1');
    expect(result.step[0].text).toBe('Do this');
    expect(result.step[1].position).toBe(2);
    expect(result.step[1].name).toBe('Step 2');
  });
});
