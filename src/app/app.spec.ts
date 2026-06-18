import { TestBed } from '@angular/core/testing';
import { importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { App } from './app';
import { provideSupabase } from '@core/config/supabase.config';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LucideAngularModule, icons } from 'lucide-angular';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        importProvidersFrom(LucideAngularModule.pick(icons)),
        provideBrowserGlobalErrorListeners(),
        provideSupabase('https://example.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YW1wbGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTYyMTkzMCwiZXhwIjoxOTU1MTk3OTMwfQ.fake'),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the app root', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    // App renders a router-progress-bar and conditionally a loader or router-outlet
    expect(compiled.querySelector('app-router-progress-bar')).toBeTruthy();
    expect(compiled.querySelector('a.skip-link')).toBeTruthy();
  });
});
