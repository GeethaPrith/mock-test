
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TEST_QUESTIONS } from '../test-questions';

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
  score: number = 0;
  total: number = 0;
  answerReview: any[] = [];


  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { test: any[]; answers: string[][]; sectionStats: any[] };

    this.test = state?.test || [];
    this.answers = state?.answers || [];
    this.sectionStats = state?.sectionStats || [];
    this.calculateScoreAndReview();
  }

  calculateScoreAndReview() {
    let score = 0;
    let total = 0;
    const review: any[] = [];
    for (let s = 0; s < this.test.length; s++) {
      const section = this.test[s];
      for (let q = 0; q < section.questions.length; q++) {
        total++;
        const question = section.questions[q];
        const userAnswer = this.answers[s]?.[q];
        const correctAnswer = question.answer;
        let isCorrect = false;
        if (userAnswer && userAnswer !== '') {
          if (userAnswer === correctAnswer) {
            score += 1;
            isCorrect = true;
          } else {
            score -= 0.25;
          }
        }
        review.push({
          section: section.title,
          question: question.text,
          options: question.options,
          correctAnswer,
          userAnswer,
          explanation: question.explanation,
          isCorrect
        });
      }
    }
    this.score = score;
    this.total = total;
    this.answerReview = review;
  }

  goToReview() {
    // Find the test id from the first section or fallback to 1
    let testId = this.test[0]?.id || '1';
    // Defensive: if testId is not present, try to get from sectionStats or default
    if (!testId && this.sectionStats.length && this.sectionStats[0].section) {
      testId = this.sectionStats[0].section.id || '1';
    }
    // Go to the live page in review mode, passing answers and test as state
    this.router.navigate([`/test-live/${testId}`], {
      state: {
        test: this.test,
        answers: this.answers,
        reviewMode: true
      }
    });
  }
}
