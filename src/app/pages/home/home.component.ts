import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GithubService, GithubUser, GithubRepo } from '../../services/github.service';
import { LinkedinService, LinkedinProfile } from '../../services/linkedin.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [GithubService]
})
export class HomeComponent implements OnInit {
  githubUsername: string = 'sayantan007pal'; // Sayantan's GitHub username
  profile: LinkedinProfile | null = null;
  githubProfile: GithubUser | null = null;
  githubRepos: GithubRepo[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private githubService: GithubService,
    private linkedinService: LinkedinService
  ) {}

  ngOnInit(): void {
    this.linkedinService.getProfile().subscribe(profile => {
      this.profile = profile;
    });

    this.fetchGithubData();
  }

  fetchGithubData(): void {
    this.loading = true;
    this.error = null;

    this.githubService.getUserProfile(this.githubUsername).subscribe({
      next: (user) => {
        this.githubProfile = user;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading GitHub profile. Please try again later.';
        this.loading = false;
        console.error('GitHub API error:', err);
      }
    });

    this.githubService.getUserRepos(this.githubUsername).subscribe({
      next: (repos) => {
        this.githubRepos = repos;
      },
      error: (err) => {
        console.error('GitHub Repos API error:', err);
      }
    });
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long'
    });
  }

  // Method to update GitHub username (could be called from a form)
  updateGithubUsername(username: string): void {
    this.githubUsername = username;
    this.fetchGithubData();
  }
}
