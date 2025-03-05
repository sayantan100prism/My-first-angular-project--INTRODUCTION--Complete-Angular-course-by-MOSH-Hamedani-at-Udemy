import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ContactComponent } from './pages/contact/contact.component';

/**
 * Application routes configuration
 * 
 * This defines the navigation structure of the portfolio website:
 * - Home: Main landing page with profile information
 * - Projects: Portfolio of work and projects
 * - Experience: Detailed work history and experience
 * - Contact: Contact form and information
 * 
 * The wildcard route ('**') redirects any unknown routes back to home page
 */
export const routes: Routes = [
  { path: '', component: HomeComponent },        // Home page (default route)
  { path: 'projects', component: ProjectsComponent },  // Projects page
  { path: 'experience', component: ExperienceComponent }, // Experience page
  { path: 'contact', component: ContactComponent },   // Contact page
  { path: '**', redirectTo: '' }                // Redirect unknown routes to home
];