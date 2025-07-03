import { Component } from '@angular/core';
import { TestService } from '../test.service';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
   standalone: true,
 selector: 'app-test-list',
  imports: [SharedModule],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.scss'
})
export class TestListComponent {
  constructor(private testService: TestService, private router: Router) {}

  tests: any[] = [];

  ngOnInit() {
    this.tests = this.testService.tests;
  }

  startTest(id: string) {
    this.router.navigate(['/test-instruction'], { state: { testId: id } });
  }
  }

