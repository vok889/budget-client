import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ModalModule.forRoot()),
    importProvidersFrom(AlertModule.forRoot()) //add for login
  ]
};
