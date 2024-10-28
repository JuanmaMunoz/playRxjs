import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Examples5Component } from './examples5.component';

describe('Examples5Component', () => {
  let component: Examples5Component;
  let fixture: ComponentFixture<Examples5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Examples5Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Examples5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
