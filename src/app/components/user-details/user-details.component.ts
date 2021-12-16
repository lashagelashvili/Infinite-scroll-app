import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InfiniteScrollDirective } from 'src/app/directives/infinite-scroll.directive';
import { ApiService } from 'src/app/services/api.service';
import { User, UserDetails, UserFriends } from 'src/app/services/model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, AfterViewInit {
  @ViewChildren('item', { read: ElementRef })
  items: QueryList<ElementRef>;
  @ViewChild(InfiniteScrollDirective) directive: InfiniteScrollDirective;

  routeSub: Subscription;

  userId: number;
  userDetails: UserDetails;
  userFriends: User[] = [];
  friendsPage = 1;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id'];
    })
    this.getUserDetails();
    // console.log(this.userDetails)
    this.getFriends();
  }

  getUserDetails() {
    this.apiService.getUserDetails(this.userId).subscribe((data: UserDetails) => {
      this.userDetails = data;
      this.userDetails.imageUrl = this.userDetails.imageUrl + '?v=' + this.userId;
    })
  }

  getFriends() {
    this.apiService.getFriends(this.userId, this.friendsPage).subscribe((data: UserFriends) => {
      data.list.forEach((friend: User) => {
        this.userFriends.push(friend);
        friend.imageUrl = friend.imageUrl + '?v=' + friend.id
      })
      this.friendsPage++;
    })
  }

  ngAfterViewInit(): void {
    this.directive.updateItems(this.items);
    // console.log(this.userFriends)
  }

  onFriendClick(id: number) {
    console.log(id)
    this.router.navigateByUrl(`user/${id}`);
    this.userId = id;
    this.friendsPage = 1;
    this.userFriends = [];
    this.getUserDetails();
    this.getFriends();
    // this.directive.updateItems(this.items);
    // this.route.params.subscribe(params => {
    //   id = params['id'];
    // })
  }


}
