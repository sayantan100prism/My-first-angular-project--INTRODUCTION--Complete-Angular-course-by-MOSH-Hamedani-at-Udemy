import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  blog: string;
  location: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  created_at: string;
  updated_at: string;
  topics: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUserProfile(username: string): Observable<GithubUser> {
    return this.http.get<GithubUser>(`${this.apiUrl}/users/${username}`);
  }

  getUserRepos(username: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(`${this.apiUrl}/users/${username}/repos?sort=updated&per_page=10`);
  }

  getRepoDetails(username: string, repoName: string): Observable<GithubRepo> {
    return this.http.get<GithubRepo>(`${this.apiUrl}/repos/${username}/${repoName}`);
  }
}
