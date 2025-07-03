import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-test-instruction',
  imports: [SharedModule],
  templateUrl: './test-instruction.component.html',
  styleUrl: './test-instruction.component.scss'
})
export class TestInstructionComponent {
  testId: string | null = null;
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { testId: string };
    if (state && state.testId) {
      this.testId = state.testId;
    }
  }

  startTest() {
    if (this.testId) {
      this.router.navigate([`/test-live`, this.testId]);
    }
  }
}
