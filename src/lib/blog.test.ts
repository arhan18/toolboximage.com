import { describe, it, expect } from 'vitest';
import { formatDate } from './blog';

describe('formatDate', () => {
  it('formats with en-US locale by default', () => {
    const result = formatDate('2025-06-15');
    expect(result).toContain('June');
    expect(result).toContain('15');
    expect(result).toContain('2025');
  });

  it('formats with Spanish locale', () => {
    const result = formatDate('2025-06-15', 'es');
    expect(result).toContain('junio');
  });

  it('formats with French locale', () => {
    const result = formatDate('2025-06-15', 'fr');
    expect(result).toContain('juin');
  });

  it('formats with German locale', () => {
    const result = formatDate('2025-06-15', 'de');
    expect(result).toContain('Juni');
  });

  it('formats with Japanese locale', () => {
    const result = formatDate('2025-06-15', 'ja');
    expect(result).toContain('6');
    expect(result).toContain('2025');
  });

  it('formats with Hindi locale', () => {
    const result = formatDate('2025-06-15', 'hi');
    expect(result).toContain('2025');
  });

  it('falls back to en-US for unknown locale', () => {
    const result = formatDate('2025-06-15', 'xx');
    expect(result).toContain('June');
  });
});
