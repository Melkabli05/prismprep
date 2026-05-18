import { signal, type Signal } from '@angular/core';

function deserializeSet<T>(stored: string, initial: Set<T>): Set<T> {
  try {
    const parsed = JSON.parse(stored);
    if (initial instanceof Set && Array.isArray(parsed)) {
      return new Set(parsed) as unknown as Set<T>;
    }
    return parsed as Set<T>;
  } catch {
    return initial;
  }
}

function deserializeRecord<T>(stored: string, initial: Record<string, T>): Record<string, T> {
  try {
    return JSON.parse(stored) as Record<string, T>;
  } catch {
    return initial;
  }
}

export function localStorageSignal<T>(key: string, initial: T): Signal<T> {
  const initialValue = (() => {
    if (typeof window === 'undefined') return initial;
    try {
      const item = localStorage.getItem(key);
      if (item) {
        if (initial instanceof Set) {
          return deserializeSet(item, initial);
        }
        if (typeof initial === 'object' && initial !== null && !Array.isArray(initial)) {
          return deserializeRecord(item, initial as Record<string, unknown>) as T;
        }
        return JSON.parse(item) as T;
      }
      return initial;
    } catch {
      return initial;
    }
  })();

  const sig = signal<T>(initialValue);

  return sig;
}

export function setLocalStorage<T>(key: string, value: T): void {
  try {
    const toStore = value instanceof Set ? Array.from(value) : value;
    localStorage.setItem(key, JSON.stringify(toStore));
  } catch {
    // localStorage not available or quota exceeded
  }
}