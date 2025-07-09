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

  ngOnInit(): void {
    const testId = this.route.snapshot.paramMap.get('id');
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as any;

    if (state?.reviewMode) {
      this.reviewMode = true;
      this.test = state.test;
      this.answers = state.answers;
    } else {
      if (!testId) return;

      this.test = this.testService.tests;

      const saved = localStorage.getItem(this.LOCAL_STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        this.answers = data.answers;
        this.visited = data.visited;
        this.marked = data.marked;
        this.currentSectionIndex = data.currentSectionIndex;
        this.currentQuestionIndex = data.currentQuestionIndex;
        this.timer = data.timer;
      } else {
        this.answers = this.test.map((s: any) => Array(s.questions.length).fill(null));
        this.marked = this.test.map((s: any) => Array(s.questions.length).fill(false));
        this.visited = this.test.map((s: any) => Array(s.questions.length).fill(false));
        this.timer = this.test[0]?.duration || 0;
      }

      this.interval = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.submit();
        }
        this.saveProgressToLocalStorage(); // auto-save on countdown
      }, 1000);
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
    localStorage.removeItem(this.LOCAL_STORAGE_KEY); // clear saved progress on submit

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

  // Helper for nav status in template
//   getNavStatus(sectionIdx: number, qIdx: number): string {
//     if (!this.visited || !this.visited[sectionIdx] || !this.visited[sectionIdx][qIdx]) return 'not-visited';
//     if (this.marked && this.marked[sectionIdx] && this.marked[sectionIdx][qIdx] && this.answers && this.answers[sectionIdx] && this.answers[sectionIdx][qIdx]) return 'marked-answered';
//     if (this.marked && this.marked[sectionIdx] && this.marked[sectionIdx][qIdx]) return 'marked';
//     if (this.answers && this.answers[sectionIdx] && this.answers[sectionIdx][qIdx]) return 'answered';
//     return 'not-answered';
//   }
//   submitSection() {
//     if (this.currentSectionIndex < this.test.length - 1) {
//       this.currentSectionIndex++;
//       this.currentQuestionIndex = 0;
//     } else {
//       alert('You have completed all sections. Please click Submit Test to finish.');
//     }
//   }
//   public currentSectionIndex = 0;
//   public currentQuestionIndex = 0;

//   public switchSection(index: number): void {
//     this.currentSectionIndex = index;
//     this.currentQuestionIndex = 0;
//   }

//   // ...existing code...
//   // Remove submitSection for previous version
//   test: any[] = [];
//   answers: string[][] = [];
//   marked: boolean[][] = [];
//   visited: boolean[][] = [];
//   timer: number = 0;
//   interval: any;
//   reviewMode: boolean = false;

//   constructor(private route: ActivatedRoute, private router: Router, private testService: TestService) {}

//   ngOnInit(): void {
//     const testId = this.route.snapshot.paramMap.get('id');
//     const nav = this.router.getCurrentNavigation();
//     const state = nav?.extras.state as any;
//     if (state && state.reviewMode) {
//       this.reviewMode = true;
//       this.test = state.test;
//       this.answers = state.answers;
//       // Optionally, you can also set marked/visited if you want to show them in review
//     } else {
//       if (!testId) return;
//       // Always load all sections for the test UI
//       this.test = this.testService.tests;
//       this.answers = this.test.map((section: any) => Array(section.questions.length).fill(null));
//       this.marked = this.test.map((section: any) => Array(section.questions.length).fill(false));
//       this.visited = this.test.map((section: any) => Array(section.questions.length).fill(false));
//       this.timer = this.test[0]?.duration || 0;
//       this.interval = setInterval(() => {
//         this.timer--;
//         if (this.timer <= 0) {
//           this.submit();
//         }
//       }, 1000);
//     }
//   }

//   navigate(index: number) {
//     this.currentQuestionIndex = index;
//     this.visited[this.currentSectionIndex][index] = true;
//   }

//   markForReviewAndNext() {
//     this.marked[this.currentSectionIndex][this.currentQuestionIndex] = true;
//     this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;
//     if (this.test && this.test[this.currentSectionIndex] && this.currentQuestionIndex < this.test[this.currentSectionIndex].questions.length - 1) {
//       this.currentQuestionIndex++;
//       this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;
//     }
//   }

//   clearResponse() {
//     this.answers[this.currentSectionIndex][this.currentQuestionIndex] = '';
//     this.marked[this.currentSectionIndex][this.currentQuestionIndex] = false;
//     this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;
//   }

//   saveAndNext() {
//     // Optionally, you could add logic to save the answer to a backend here
//     // For now, just move to the next question
//     this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;
//     if (this.test && this.test[this.currentSectionIndex] && this.currentQuestionIndex < this.test[this.currentSectionIndex].questions.length - 1) {
//       this.currentQuestionIndex++;
//       this.visited[this.currentSectionIndex][this.currentQuestionIndex] = true;
//     }
//   }

//   get totalQuestions(): number {
//     if (!this.test || !this.test[this.currentSectionIndex]) return 0;
//     return this.test[this.currentSectionIndex].questions.length;
//   }

//   get answeredCount(): number {
//     if (!this.answers[this.currentSectionIndex]) return 0;
//     return this.answers[this.currentSectionIndex].filter(a => a !== null && a !== undefined && a !== '').length;
//   }

//   get markedCount(): number {
//     return this.marked.filter(m => m).length;
//   }

//   // Removed extraQuestions getter as it is not needed in the reverted logic

//   submit() {
//     clearInterval(this.interval);
//     // Prepare stats for each section
//     const sectionStats = this.test.map((section, sIdx) => {
//       const total = section.questions.length;
//       let answered = 0, notAnswered = 0, marked = 0, notVisited = 0;
//       for (let i = 0; i < total; i++) {
//         const ans = this.answers[sIdx][i];
//         if (ans && ans !== '') answered++;
//         else notAnswered++;
//         if (this.marked[sIdx][i]) marked++;
//         if (!this.visited[sIdx][i]) notVisited++;
//       }
//       return {
//         section: section.title,
//         total,
//         answered,
//         notAnswered,
//         marked,
//         notVisited
//       };
//     });
//     this.router.navigate(['/test-result'], {
//       state: {
//         test: this.test,
//         answers: this.answers,
//         sectionStats
//       }
//     });
//   }
// }
