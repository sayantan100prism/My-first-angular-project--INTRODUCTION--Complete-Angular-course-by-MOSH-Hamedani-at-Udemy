import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'] // corrected property name
})
export class FooterComponent implements OnInit {
  currentYear: number = 2025;

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }
}
