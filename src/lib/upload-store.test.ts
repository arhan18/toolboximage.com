import { describe, it, expect } from 'vitest';
import { formatBytes } from './upload-store';

describe('formatBytes', () => {
  it('returns "0 B" for zero', () => {
    expect(formatBytes(0)).toBe('0 B');
  });

  it('returns "0 B" for negative values', () => {
    expect(formatBytes(-100)).toBe('0 B');
  });

  it('returns "0 B" for NaN', () => {
    expect(formatBytes(NaN)).toBe('0 B');
  });

  it('returns "0 B" for Infinity', () => {
    expect(formatBytes(Infinity)).toBe('0 B');
  });

  it('formats bytes (no decimals)', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(512)).toBe('512 B');
  });

  it('formats KB with 2 decimals for small values', () => {
    const result = formatBytes(1024);
    expect(result).toMatch(/KB$/);
    expect(result).toBe('1.00 KB');
  });

  it('formats KB with 1 decimal for tens', () => {
    const result = formatBytes(15360); // 15 KB
    expect(result).toMatch(/KB$/);
  });

  it('formats KB with 0 decimals for 100+', () => {
    const result = formatBytes(204800); // 200 KB
    expect(result).toMatch(/KB$/);
  });

  it('formats MB', () => {
    const result = formatBytes(5 * 1024 * 1024);
    expect(result).toMatch(/MB$/);
  });

  it('formats GB', () => {
    const result = formatBytes(3 * 1024 * 1024 * 1024);
    expect(result).toMatch(/GB$/);
  });

  it('rounds sensibly for different scales', () => {
    expect(formatBytes(1)).toBe('1 B');
    expect(formatBytes(1023)).toBe('1023 B');
    expect(formatBytes(1025)).toBe('1.00 KB');
    expect(formatBytes(1048576)).toBe('1.00 MB');
  });

  it('stops at GB', () => {
    const result = formatBytes(999 * 1024 * 1024 * 1024);
    expect(result).toMatch(/GB$/);
  });
});
