import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InfiniteScrollDirective } from 'src/app/directives/infinite-scroll.directive';
import { ApiService } from 'src/app/services/api.service';
import { User, UserDetails, UserFriends } from 'src/app/services/model';

interface BreadCrumb {
  fullname: string,
  id: number;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('item', { read: ElementRef })
  items: QueryList<ElementRef>;
  @ViewChild(InfiniteScrollDirective) directive: InfiniteScrollDirective;

  routeSub: Subscription;
  userId: number;
  userDetails: UserDetails;
  userFriends: User[] = [];
  friendsPage = 1;
  breadCrumbs: BreadCrumb[] = [];
  loadingUser: boolean = false;
  loadingFriends: boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.friendsPage = 1;
      this.userFriends = [];
      this.userId = params['id'];
      this.getUserDetails();
      this.getFriends();
    })
  }

  ngAfterViewInit(): void {
    this.directive.updateItems(this.items);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  getUserDetails() {
    this.loadingUser = true;
    this.apiService.getUserDetails(this.userId).subscribe((data: UserDetails) => {
      this.loadingUser = false;
      this.userDetails = data;
      this.userDetails.imageUrl = this.userDetails.imageUrl + '?v=' + this.userId;
      if (!this.breadCrumbs.some(breadcrumb => breadcrumb.id === data.id)) {
        this.breadCrumbs.push({ fullname: `${data.prefix} ${data.name} ${data.lastName} `, id: data.id });
      }
    })
  }

  getFriends() {
    this.loadingFriends = true;
    this.apiService.getFriends(this.userId, this.friendsPage).subscribe((data: UserFriends) => {
      this.loadingFriends = false;
      data.list.forEach((friend: User) => {
        this.userFriends.push(friend);
        friend.imageUrl = friend.imageUrl + '?v=' + friend.id
      })
      this.friendsPage++;
    })
  }

  onClick(id: number) {
    this.router.navigateByUrl(`/user/${id}`);
  }

  onBreadCrumbClick(id: number) {
    const breadCrumbIndex = this.breadCrumbs.findIndex(breadcrumb => breadcrumb.id === id);
    this.breadCrumbs = this.breadCrumbs.filter((breadCrumb, index) => index <= breadCrumbIndex);
    this.router.navigateByUrl(`/user/${id}`);
  }

}
