import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SpotifyInterceptor } from './app/interceptors/spotify.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([SpotifyInterceptor])),
  ]
}).catch(err => console.error(err));
