import { formatTime, formatCurrency } from '../format';

describe('formatTime', () => {
  it('formats formats hours', () => {
    expect(formatTime(60)).toContain('1h');
  });

  it('adds zero minutes', () => {
    expect(formatTime(120)).toContain(' 0min');
  });

  it('formats minutes', () => {
    expect(formatTime(59)).toContain('59min');
  });

  it('does not show zero hour', () => {
    expect(formatTime(59)).not.toContain('h');
  });
});

describe('formatCurrency', () => {
  it('formats with zero cents', () => {
    expect(formatCurrency(1)).toContain(',00');
  });

  it('formats with cent values', () => {
    expect(formatCurrency(0.99)).toContain(',99');
  });

  it('separates thousands', () => {
    expect(formatCurrency(1000000)).toContain('1.000.000');
  });

  it('adds the dollar sign', () => {
    expect(formatCurrency(1)).toContain('$');
  });
});
