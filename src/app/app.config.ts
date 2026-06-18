import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LucideAngularModule, icons } from 'lucide-angular';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@core/config/supabase.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(LucideAngularModule.pick(icons)),
    { provide: SUPABASE_URL, useValue: environment.supabaseUrl },
    { provide: SUPABASE_ANON_KEY, useValue: environment.supabaseAnonKey },
  ],
};
