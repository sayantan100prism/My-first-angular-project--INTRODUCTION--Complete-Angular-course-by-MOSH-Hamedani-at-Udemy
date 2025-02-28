import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { 
    return this.contactForm.controls; 
  }

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
