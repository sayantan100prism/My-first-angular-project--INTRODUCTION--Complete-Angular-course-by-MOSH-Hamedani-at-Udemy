import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Interface representing a GitHub user profile
 * Used to display user information on the portfolio
 */
export interface GithubUser {
  login: string;             // GitHub username
  id: number;                // User ID in GitHub system
  avatar_url: string;        // URL to user's profile picture
  name: string;              // User's display name
  bio: string;               // User's biography/description
  public_repos: number;      // Count of public repositories
  followers: number;         // Count of followers
  following: number;         // Count of users being followed
  html_url: string;          // URL to user's GitHub profile
  blog: string;              // User's blog/website URL
  location: string;          // User's location information
}

/**
 * Interface representing a GitHub repository
 * Used to display repository information in the projects section
 */
export interface GithubRepo {
  id: number;                // Repository ID
  name: string;              // Repository name
  description: string;       // Repository description
  html_url: string;          // URL to the repository
  homepage: string;          // URL to project homepage (if any)
  stargazers_count: number;  // Number of stars
  forks_count: number;       // Number of forks
  language: string;          // Primary programming language
  created_at: string;        // Creation date
  updated_at: string;        // Last update date
  topics: string[];          // Array of repository topics/tags
}

/**
 * Service responsible for interacting with the GitHub API
 * Can be customized to use any GitHub username
 */
@Injectable({
  providedIn: 'root'
})
export class GithubService {
  // Base URL for GitHub API - no need to change this
  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  /**
   * Fetch a user's GitHub profile information
   * @param username - The GitHub username to fetch data for
   * @returns Observable of GitHub user profile data
   */
  getUserProfile(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(`${this.apiUrl}/users/${username}`);
  }

  /**
   * Fetch a user's repositories, sorted by most recently updated
   * @param username - The GitHub username to fetch repositories for
   * @returns Observable of GitHub repositories
   */
  getUserRepos(username: string): Observable<GithubRepo[]> {
    // Gets 10 most recently updated repositories
    // You can modify per_page parameter for more or fewer repos
    return this.http.get<GithubRepo[]>(`${this.apiUrl}/users/${username}/repos?sort=updated&per_page=10`);
  }

  /**
   * Fetch details for a specific repository
   * @param username - The owner's GitHub username
   * @param repoName - The repository name
   * @returns Observable of detailed repository information
   */
  getRepoDetails(username: string, repoName: string): Observable<GithubRepo> {
    return this.http.get<GithubRepo>(`${this.apiUrl}/repos/${username}/${repoName}`);
  }
}