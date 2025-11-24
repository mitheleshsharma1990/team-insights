import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureOverview } from './feature-overview';

describe('FeatureOverview', () => {
  let component: FeatureOverview;
  let fixture: ComponentFixture<FeatureOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureOverview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
