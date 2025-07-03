import { Injectable } from '@angular/core';
import { TEST_QUESTIONS } from './test-questions';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }
  tests = TEST_QUESTIONS;

  getTestById(id: string) {
    return this.tests.find(test => test.id === id);
  }

}
