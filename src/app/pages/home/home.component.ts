import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GithubService, GithubUser, GithubRepo } from '../../services/github.service';
import { LinkedinService, LinkedinProfile } from '../../services/linkedin.service';
import { HttpClientModule } from '@angular/common/http';

/**
 * HomeComponent displays the main landing page of the portfolio
 * Includes sections for profile, skills, GitHub activity, and experience
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [GithubService]
})
export class HomeComponent implements OnInit {
  /**
   * CUSTOMIZE HERE: Replace with your own GitHub username
   * This is used to fetch your GitHub profile and repositories
   */
  githubUsername: string = 'sayantan007pal';
  
  // State variables
  profile: LinkedinProfile | null = null;
  githubProfile: GithubUser | null = null;
  githubRepos: GithubRepo[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private githubService: GithubService,
    private linkedinService: LinkedinService
  ) {}

  /**
   * Initialize component and fetch data from services
   */
  ngOnInit(): void {
    // Get LinkedIn profile data
    this.linkedinService.getProfile().subscribe(profile => {
      this.profile = profile;
    });

    // Fetch GitHub data (profile and repositories)
    this.fetchGithubData();
  }

  /**
   * Fetch GitHub profile and repository data
   * Uses the GitHub API via the GithubService
   */
  fetchGithubData(): void {
    this.loading = true;
    this.error = null;

    // Fetch GitHub profile
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

    // Fetch GitHub repositories
    this.githubService.getUserRepos(this.githubUsername).subscribe({
      next: (repos) => {
        this.githubRepos = repos;
      },
      error: (err) => {
        console.error('GitHub Repos API error:', err);
      }
    });
  }

  /**
   * Format dates for display in the experience timeline
   * @param dateStr - Date string in YYYY-MM format
   * @returns Formatted date string (e.g., "January 2023")
   */
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long'
    });
  }

  /**
   * Get a safe excerpt of the profile summary
   * @returns A truncated version of the profile summary with ellipsis
   */
  getSummaryExcerpt(): string {
    if (!this.profile || !this.profile.summary) {
      return 'Software developer with expertise in multiple technologies.';
    }
    
    return this.profile.summary.substring(0, 100) + '...';
  }

  /**
   * Update GitHub username and fetch new data
   * This could be used with a form to allow changing the displayed GitHub profile
   * @param username - New GitHub username to fetch data for
   */
  updateGithubUsername(username: string): void {
    this.githubUsername = username;
    this.fetchGithubData();
  }
}