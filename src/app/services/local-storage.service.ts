import { signal, type WritableSignal } from '@angular/core';

function loadFromStorage<T>(key: string, initial: T): T {
  if (typeof window === 'undefined') return initial;
  try {
    const item = localStorage.getItem(key);
    if (!item) return initial;
    if (initial instanceof Set) {
      const parsed = JSON.parse(item);
      return Array.isArray(parsed) ? new Set(parsed) as unknown as T : initial;
    }
    if (typeof initial === 'object' && initial !== null && !Array.isArray(initial)) {
      return JSON.parse(item) as T;
    }
    return JSON.parse(item) as T;
  } catch {
    return initial;
  }
}

export function localStorageSignal<T>(key: string, initial: T): WritableSignal<T> {
  return signal<T>(loadFromStorage(key, initial)) as WritableSignal<T>;
}

export function setLocalStorage<T>(key: string, value: T): void {
  try {
    const toStore = value instanceof Set ? Array.from(value) : value;
    localStorage.setItem(key, JSON.stringify(toStore));
  } catch {
    // localStorage not available or quota exceeded
  }
}
