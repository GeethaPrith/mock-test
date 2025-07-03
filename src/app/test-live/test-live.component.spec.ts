import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLiveComponent } from './test-live.component';

describe('TestLiveComponent', () => {
  let component: TestLiveComponent;
  let fixture: ComponentFixture<TestLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestLiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
