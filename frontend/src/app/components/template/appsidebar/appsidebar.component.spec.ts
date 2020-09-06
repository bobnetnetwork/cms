import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsidebarComponent } from './appsidebar.component';

describe('AppsidebarComponent', () => {
  let component: AppsidebarComponent;
  let fixture: ComponentFixture<AppsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppsidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
