// Section navigation state
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TestService } from '../test.service';
import { SharedModule } from '../shared/shared.module';

@Component({
   standalone: true,
 selector: 'app-test-live',
  imports: [SharedModule, RouterModule],
  templateUrl: './test-live.component.html',
  styleUrl: './test-live.component.scss'
})
export class TestLiveComponent {
  // Helper for nav status in template
  getNavStatus(sectionIdx: number, qIdx: number): string {
    if (!this.visited || !this.visited[sectionIdx] || !this.visited[sectionIdx][qIdx]) return 'not-visited';
    if (this.marked && this.marked[sectionIdx] && this.marked[sectionIdx][qIdx] && this.answers && this.answers[sectionIdx] && this.answers[sectionIdx][qIdx]) return 'marked-answered';
    if (this.marked && this.marked[sectionIdx] && this.marked[sectionIdx][qIdx]) return 'marked';
    if (this.answers && this.answers[sectionIdx] && this.answers[sectionIdx][qIdx]) return 'answered';
    return 'not-answered';
  }
  submitSection() {
    if (this.currentSectionIndex < this.test.length - 1) {
      this.currentSectionIndex++;
      this.currentQuestionIndex = 0;
    } else {
      alert('You have completed all sections. Please click Submit Test to finish.');
    }
  }
  public currentSectionIndex = 0;
  public currentQuestionIndex = 0;

  public switchSection(index: number): void {
    this.currentSectionIndex = index;
    this.currentQuestionIndex = 0;
  }

  // ...existing code...
  // Remove submitSection for previous version
  test: any[] = [];
  answers: string[][] = [];
  marked: boolean[][] = [];
  visited: boolean[][] = [];
  timer: number = 0;
  interval: any;

  constructor(private route: ActivatedRoute, private router: Router, private testService: TestService) {}

  ngOnInit(): void {
    const testId = this.route.snapshot.paramMap.get('id');
    if (!testId) return;
    // Always load all sections for the test UI
    this.test = this.testService.tests;
    this.answers = this.test.map((section: any) => Array(section.questions.length).fill(null));
    this.marked = this.test.map((section: any) => Array(section.questions.length).fill(false));
    this.visited = this.test.map((section: any) => Array(section.questions.length).fill(false));
    this.timer = this.test[0]?.duration || 0;

    this.interval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.submit();
      }
    }, 1000);
  }

  navigate(index: number) {
    this.currentQuestionIndex = index;
    this.visited[this.currentSectionIndex][index] = true;
  }

  markForReviewAndNext() {
    this.marked[this.currentSectionIndex][this.currentQuestionIndex] = true;
    this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;
    if (this.test && this.test[this.currentSectionIndex] && this.currentQuestionIndex < this.test[this.currentSectionIndex].questions.length - 1) {
      this.currentQuestionIndex++;
      this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;
    }
  }

  clearResponse() {
    this.answers[this.currentSectionIndex][this.currentQuestionIndex] = '';
    this.marked[this.currentSectionIndex][this.currentQuestionIndex] = false;
    this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;
  }

  saveAndNext() {
    // Optionally, you could add logic to save the answer to a backend here
    // For now, just move to the next question
    this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;
    if (this.test && this.test[this.currentSectionIndex] && this.currentQuestionIndex < this.test[this.currentSectionIndex].questions.length - 1) {
      this.currentQuestionIndex++;
      this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;
    }
  }

  get totalQuestions(): number {
    if (!this.test || !this.test[this.currentSectionIndex]) return 0;
    return this.test[this.currentSectionIndex].questions.length;
  }

  get answeredCount(): number {
    if (!this.answers[this.currentSectionIndex]) return 0;
    return this.answers[this.currentSectionIndex].filter(a => a !== null && a !== undefined && a !== '').length;
  }

  get markedCount(): number {
    return this.marked.filter(m => m).length;
  }

  // Removed extraQuestions getter as it is not needed in the reverted logic

  submit() {
    clearInterval(this.interval);
    // Prepare stats for each section
    const sectionStats = this.test.map((section, sIdx) => {
      const total = section.questions.length;
      let answered = 0, notAnswered = 0, marked = 0, notVisited = 0;
      for (let i = 0; i < total; i++) {
        const ans = this.answers[sIdx][i];
        if (ans && ans !== '') answered++;
        else notAnswered++;
        if (this.marked[sIdx][i]) marked++;
        if (!this.visited[sIdx][i]) notVisited++;
      }
      return {
        section: section.title,
        total,
        answered,
        notAnswered,
        marked,
        notVisited
      };
    });
    this.router.navigate(['/test-result'], {
      state: {
        test: this.test,
        answers: this.answers,
        sectionStats
      }
    });
  }
  
  
}
