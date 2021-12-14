import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit, AfterViewInit {
  @ViewChildren('item', { read: ElementRef })
  items: QueryList<ElementRef>;

  loading: boolean = false;
  currentPage: number = 1;
  users: any = [];
  totalPages: number;
  obsever: IntersectionObserver;
  private lastElement: ElementRef | undefined;

  constructor(private stateService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
    this.intersectionObserver();
  }

  ngAfterViewInit() {
    this.items.changes.subscribe((data) => {
      if (this.lastElement !== undefined) {
        this.obsever.unobserve(this.lastElement.nativeElement)
      }
      if (data.last) {
        this.lastElement = data.last;
        this.obsever.observe(data.last.nativeElement)
      }
    })
  }

  getUsers() {
    this.loading = true;
    this.stateService.getData(this.currentPage).subscribe((data) => {
      this.loading = false;
      data.list.forEach((item: any) => {
        this.users.push(item)
      })

      this.totalPages = data.pagination.total;
      this.currentPage++;
    })
  }


  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    }

    this.obsever = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.getUsers();
      }
    }, options);
  }

  onUserClick() {
    this.router.navigateByUrl('user');
  }
}
