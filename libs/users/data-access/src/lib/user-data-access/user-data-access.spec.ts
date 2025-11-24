import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDataAccess } from './user-data-access';

describe('UserDataAccess', () => {
  let component: UserDataAccess;
  let fixture: ComponentFixture<UserDataAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDataAccess],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDataAccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
