import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HAndSskillsComponent } from './h-and-sskills.component';

describe('HAndSskillsComponent', () => {
  let component: HAndSskillsComponent;
  let fixture: ComponentFixture<HAndSskillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HAndSskillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HAndSskillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
