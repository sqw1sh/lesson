import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';

declare let $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public isShowPopup: boolean = false;
  public popupMessage: string = 'Посмотрите наши чайные коллекции';
  public popupLinkTitle: string = 'Смотреть';
  public popupLink: string = '/catalog';
  public popupIsShowLink: boolean = true;
  private popup$: Observable<boolean>;
  private subscribePopup$: Subscription | null = null;

  @ViewChild('popup', { static: false }) popup!: NgbAlert;

  constructor() {
    this.popup$ = new Observable((sub) => {
      setTimeout(() => {
        sub.next(true);
      }, 10000);
    });
  }

  ngOnInit(): void {
    this.subscribePopup$ = this.popup$.subscribe({
      next: (x) => {
        if (x) {
          this.isShowPopup = true;
        }
      },
    });

    $(function () {
      $('#accordion').accordion();
    });
  }

  ngOnDestroy(): void {
    this.subscribePopup$?.unsubscribe();
  }
}
