import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { IonContent,
  IonHeader,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  SegmentValue, } from '@ionic/angular/standalone';
import { BehaviorSubject, Observable, distinctUntilChanged, tap, delay, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [AsyncPipe, IonContent, IonHeader, IonLabel, IonSegment, IonSegmentButton, IonTitle, IonToolbar, NgIf],
})
export class HomePage {
  segmentA$ = new BehaviorSubject<string>('A-1');
  observable$ = new Observable<any>();
  segmentB = 'B-1';

  constructor() {
    this.fetchData();
  }

  updateSegmentA(value: SegmentValue) {
    this.segmentA$.next(value as string);
  }

  updateSegmentB(value: SegmentValue) {
    this.segmentB = value as string;
  }

  private fetchData() {
    let option: string;
    this.observable$ = this.segmentA$.pipe(
      distinctUntilChanged(),
      tap((o) => (option = o)),
      delay(1000),
      map(() => option),
    );
  }
}
