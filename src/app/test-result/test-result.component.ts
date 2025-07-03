import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
    standalone: true,
selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  imports: [SharedModule],
  styleUrl: './test-result.component.scss'
})
export class TestResultComponent {
  test: any[] = [];
  answers: string[][] = [];
  sectionStats: any[] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { test: any[]; answers: string[][]; sectionStats: any[] };

    this.test = state?.test || [];
    this.answers = state?.answers || [];
    this.sectionStats = state?.sectionStats || [];
  }
}
