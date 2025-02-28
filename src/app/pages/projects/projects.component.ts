import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GithubService, GithubRepo } from '../../services/github.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  providers: [GithubService]
})
export class ProjectsComponent implements OnInit {
  githubUsername: string = 'sayantan007pal'; // Sayantan's GitHub username
  repositories: GithubRepo[] = [];
  loading: boolean = false;
  error: string | null = null;
  
  // Language colors for visualization
  languageColors: { [key: string]: string } = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C#': '#178600',
    'PHP': '#4F5D95',
    'Go': '#00ADD8',
    'Ruby': '#701516',
    'Swift': '#ffac45',
    'Kotlin': '#F18E33',
    'Rust': '#dea584',
    'C++': '#f34b7d',
    'C': '#555555'
  };

  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.fetchRepositories();
  }

  fetchRepositories(): void {
    if (!this.githubUsername.trim()) {
      this.error = 'Please enter a GitHub username';
      return;
    }

    this.loading = true;
    this.error = null;
    
    this.githubService.getUserRepos(this.githubUsername).subscribe({
      next: (repos) => {
        this.repositories = repos;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error fetching repositories. Please check the username and try again.';
        this.loading = false;
        this.repositories = [];
        console.error('GitHub API error:', err);
      }
    });
  }

  getLanguageColor(language: string): string {
    return this.languageColors[language] || '#858585'; // Default color for unknown languages
  }
}
