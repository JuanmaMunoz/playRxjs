import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Examples4Component } from './examples4.component';

describe('Examples4Component', () => {
  let component: Examples4Component;
  let fixture: ComponentFixture<Examples4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Examples4Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Examples4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
