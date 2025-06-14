import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigRoom } from './config-room';

describe('ConfigRoom', () => {
  let component: ConfigRoom;
  let fixture: ComponentFixture<ConfigRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigRoom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
