import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollDirective } from 'src/app/directives/infinite-scroll.directive';
import { ApiService } from 'src/app/services/api.service';
import { User, UserFriends } from 'src/app/services/model';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit, AfterViewInit {
  @ViewChildren('item', { read: ElementRef })
  items: QueryList<ElementRef>;
  @ViewChild(InfiniteScrollDirective) directive: InfiniteScrollDirective;

  loading: boolean = false;
  currentPage: number = 1;
  users: User[] = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.directive.updateItems(this.items);
  }

  getUsers() {
    this.loading = true;
    this.apiService.getData(this.currentPage).subscribe((data: UserFriends) => {
      this.loading = false;
      data.list.forEach((item: User) => {
        item.imageUrl = item.imageUrl + '?v=' + item.id;
        this.users.push(item);
      })
      this.currentPage++;
    })
  }

  onUserClick(id: number) {
    this.router.navigateByUrl(`user/${id}`);
  }
}
