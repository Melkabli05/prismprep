import { signal, type WritableSignal } from '@angular/core';

function loadFromStorage<T>(key: string, initial: T): T {
  if (typeof window === 'undefined') return initial;
  try {
    const item = localStorage.getItem(key);
    if (!item) return initial;
    const parsed = JSON.parse(item);
    if (initial instanceof Set && Array.isArray(parsed)) {
      return new Set(parsed) as unknown as T;
    }
    if (typeof initial === 'object' && initial !== null && !Array.isArray(initial)) {
      return parsed as T;
    }
    return parsed as T;
  } catch {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.warn(`[Prism] Failed to parse localStorage key "${key}", using initial value`);
    }
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
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.warn(`[Prism] Failed to write localStorage key "${key}"`);
    }
  }
}
