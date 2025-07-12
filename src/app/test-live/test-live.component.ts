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
  readonly LOCAL_STORAGE_KEY = 'liveTestProgress';

  test: any[] = [];
  answers: string[][] = [];
  marked: boolean[][] = [];
  visited: boolean[][] = [];
  timer: number = 0;
  interval: any;
  reviewMode: boolean = false;
  currentSectionIndex = 0;
  currentQuestionIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService
  ) {}

  onAnswerChange(): void {
    if (this.visited && this.visited[this.currentSectionIndex]) {
      this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;
    }
    this.saveProgressToLocalStorage();
  }

// Place this method inside the TestLiveComponent class

  resetAllAnswers(): void {
    if (!this.test || !this.test.length) return;
    this.answers = this.test.map((section: any) => Array(section.questions.length).fill(''));
    this.marked = this.test.map((section: any) => Array(section.questions.length).fill(false));
    this.visited = this.test.map((section: any) => Array(section.questions.length).fill(false));
    this.currentSectionIndex = 0;
    this.currentQuestionIndex = 0;
    // Remove progress from localStorage if available
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem(this.LOCAL_STORAGE_KEY);
      window.localStorage.removeItem('reviewModeData');
    }
  }

  ngOnInit(): void {
    const testId = this.route.snapshot.paramMap.get('id');
    let nav = this.router.getCurrentNavigation();
    let state = nav?.extras.state as any;
    // Always clear progress and review data before starting a new test
    // if (window && window.localStorage) {
    //   localStorage.removeItem('reviewModeData');
    //   localStorage.removeItem(this.LOCAL_STORAGE_KEY);
    // }
    // Fallback to localStorage for review mode (in case of reload)
    if (!state && window && window.localStorage) {
      try {
        const reviewData = JSON.parse(localStorage.getItem('reviewModeData') || 'null');
        if (reviewData && reviewData.reviewMode) {
          state = reviewData;
        }
      } catch {}
    }
    if (state && state.reviewMode) {
      this.reviewMode = true;
      this.test = state.test;
      this.answers = state.answers;
      // Save to localStorage for reloads
      if (window && window.localStorage) {
        localStorage.setItem('reviewModeData', JSON.stringify(state));
      }
    } else {
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
      // Save initial state to localStorage
      if (window && window.localStorage) {
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify({
          answers: this.answers,
          visited: this.visited,
          marked: this.marked,
          currentSectionIndex: this.currentSectionIndex,
          currentQuestionIndex: this.currentQuestionIndex,
          timer: this.timer
        }));
      }
    }
  }

  getNavStatus(sectionIdx: number, qIdx: number): string {
    if (!this.visited || !this.visited[sectionIdx] || !this.visited[sectionIdx][qIdx]) return 'not-visited';
    if (this.marked?.[sectionIdx]?.[qIdx] && this.answers?.[sectionIdx]?.[qIdx]) return 'marked-answered';
    if (this.marked?.[sectionIdx]?.[qIdx]) return 'marked';
    if (this.answers?.[sectionIdx]?.[qIdx]) return 'answered';
    return 'not-answered';
  }

  switchSection(index: number): void {
    this.currentSectionIndex = index;
    this.currentQuestionIndex = 0;
    this.saveProgressToLocalStorage();
  }

  navigate(index: number): void {
    this.currentQuestionIndex = index;
    this.visited[this.currentSectionIndex][index] = true;
    this.saveProgressToLocalStorage();
  }

  markForReviewAndNext(): void {
    this.marked[this.currentSectionIndex][this.currentQuestionIndex] = true;
    this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;

    if (this.currentQuestionIndex < this.test[this.currentSectionIndex].questions.length - 1) {
      this.currentQuestionIndex++;
      this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;
    }

    this.saveProgressToLocalStorage();
  }

  clearResponse(): void {
    this.answers[this.currentSectionIndex][this.currentQuestionIndex] = '';
    this.marked[this.currentSectionIndex][this.currentQuestionIndex] = false;
    this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;
    this.saveProgressToLocalStorage();
  }

  saveAndNext(): void {
    this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;

    if (this.currentQuestionIndex < this.test[this.currentSectionIndex].questions.length - 1) {
      this.currentQuestionIndex++;
      this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;
    }

    this.saveProgressToLocalStorage();
  }

  saveProgressToLocalStorage(): void {
    const data = {
      answers: this.answers,
      visited: this.visited,
      marked: this.marked,
      currentSectionIndex: this.currentSectionIndex,
      currentQuestionIndex: this.currentQuestionIndex,
      timer: this.timer
    };
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  get totalQuestions(): number {
    return this.test?.[this.currentSectionIndex]?.questions?.length || 0;
  }

  get answeredCount(): number {
    return this.answers?.[this.currentSectionIndex]?.filter(a => a)?.length || 0;
  }

  get markedCount(): number {
    return this.marked?.[this.currentSectionIndex]?.filter(m => m)?.length || 0;
  }

  submit(): void {
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
    // Save answers and test to localStorage for review mode
    if (window && window.localStorage) {
      localStorage.setItem('reviewModeData', JSON.stringify({
        reviewMode: true,
        test: this.test,
        answers: this.answers
      }));
    }
    this.router.navigate(['/test-result'], {
      state: {
        test: this.test,
        answers: this.answers,
        sectionStats
      }
    });
  }
}

