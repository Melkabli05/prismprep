export interface DiffLine {
  text: string;
  type: 'unchanged' | 'added' | 'removed';
}

/**
 * Line-by-line diff between two strings.
 * Lines present in `b` not in `a` = 'added'.
 * Lines in `a` not in `b` = 'removed'.
 * Lines present in both = 'unchanged'.
 */
export function diffLines(a: string, b: string): DiffLine[] {
  const linesA = a.split('\n');
  const linesB = b.split('\n');
  const result: DiffLine[] = [];

  const maxLen = Math.max(linesA.length, linesB.length);
  for (let i = 0; i < maxLen; i++) {
    const lineA = linesA[i] ?? '';
    const lineB = linesB[i] ?? '';

    if (!linesA[i]) {
      result.push({ text: lineB, type: 'added' });
    } else if (!linesB[i]) {
      result.push({ text: lineA, type: 'removed' });
    } else if (lineA === lineB) {
      result.push({ text: lineA, type: 'unchanged' });
    } else {
      result.push({ text: lineA, type: 'removed' });
      result.push({ text: lineB, type: 'added' });
    }
  }

  return result;
}
