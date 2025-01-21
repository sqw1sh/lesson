import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private resultSearch: string = '';
  public searchSubject: Subject<string> = new Subject<string>();

  constructor() {}

  public search(str: string): void {
    this.resultSearch = str;
    this.searchSubject.next(this.resultSearch);
  }
}
