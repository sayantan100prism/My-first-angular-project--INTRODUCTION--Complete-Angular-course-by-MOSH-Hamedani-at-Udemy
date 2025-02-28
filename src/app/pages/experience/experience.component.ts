import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkedinService, Experience, Education, Certification, Project } from '../../services/linkedin.service';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  workExperience: Experience[] = [];
  education: Education[] = [];
  certifications: Certification[] = [];
  achievements: string[] = [];
  projects: Project[] = [];
  
  skillCategories: SkillCategory[] = [
    {
      name: 'Data Science & ML',
      skills: [
        { name: 'Python', level: 92 },
        { name: 'Machine Learning', level: 88 },
        { name: 'Data Science', level: 85 },
        { name: 'Pandas', level: 90 },
        { name: 'NumPy', level: 88 },
        { name: 'Scikit-learn', level: 85 }
      ]
    },
    {
      name: 'Web Development',
      skills: [
        { name: 'Angular', level: 82 },
        { name: 'TypeScript', level: 80 },
        { name: 'Node.js', level: 78 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML/CSS', level: 83 },
        { name: 'Backend Development', level: 79 }
      ]
    },
    {
      name: 'Hardware & FPGA',
      skills: [
        { name: 'Verilog', level: 90 },
        { name: 'FPGA Design', level: 85 },
        { name: 'System Verilog', level: 87 },
        { name: 'Vivado', level: 88 },
        { name: 'C/C++', level: 80 }
      ]
    },
    {
      name: 'Tools & Other Skills',
      skills: [
        { name: 'Git/GitHub', level: 85 },
        { name: 'Statistical Analysis', level: 82 },
        { name: 'TensorFlow/PyTorch', level: 78 },
        { name: 'AWS', level: 75 },
        { name: 'SQL', level: 80 },
        { name: 'Data Visualization', level: 85 }
      ]
    }
  ];

  constructor(private linkedinService: LinkedinService) {
    this.linkedinService.getProfile().subscribe(profile => {
      if (profile) {
        this.workExperience = profile.experience;
        this.education = profile.education;
        if (profile.certifications) {
          this.certifications = profile.certifications;
        }
        if (profile.achievements) {
          this.achievements = profile.achievements;
        }
        if (profile.projects) {
          this.projects = profile.projects;
        }
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
}
