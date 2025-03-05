import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LinkedinService, LinkedinProfile } from '../../services/linkedin.service';

/**
 * Contact Component
 * Displays contact information and a contact form
 */
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  loading = false;
  success = false;
  error: string | null = null;
  profile: LinkedinProfile | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private linkedinService: LinkedinService
  ) {}

  ngOnInit(): void {
    // Initialize contact form
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });

    // Get profile information to display contact details
    this.linkedinService.getProfile().subscribe(profile => {
      this.profile = profile;
    });
  }

  // Convenience getter for easy access to form fields
  get f() { 
    return this.contactForm.controls; 
  }

  /**
   * Extract profile name from URL
   * @param url - The profile URL (LinkedIn, GitHub, Kaggle, etc.)
   * @returns The username part of the URL
   */
  getProfileName(url: string | undefined): string {
    if (!url) return '';
    
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  /**
   * Handle form submission
   * In a real application, this would send the form data to a server
   */
  onSubmit(): void {
    this.submitted = true;
    this.success = false;
    this.error = null;

    // Stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    this.loading = true;

    // Simulate API call
    setTimeout(() => {
      this.loading = false;
      this.success = true;
      
      // Reset form
      this.contactForm.reset();
      this.submitted = false;
      
      // Log form values (would be sent to server in real application)
      console.log('Form submitted:', this.contactForm.value);
    }, 1500);
  }
}