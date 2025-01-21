import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public fb: FormBuilder = new FormBuilder();
  public searchForm: FormGroup = this.fb.group({
    search: [''],
  });

  constructor(private searchService: SearchService, private router: Router) {}

  get search() {
    return this.searchForm.get('search');
  }

  searchRequest(): void {
    this.searchService.search(this.search?.value);
    this.router.navigate(['catalog']);
  }

  clearSearch(): void {
    this.searchService.search('');
    this.search?.setValue('');
  }

  ngOnInit(): void {}
}
