import { AfterViewInit, EventEmitter, Directive, ElementRef, Input, OnInit, Output, QueryList } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit, AfterViewInit {
  // @Input() items: QueryList<ElementRef>;
  items: QueryList<ElementRef>;

  @Output() loadMore = new EventEmitter<any>();

  obsever: IntersectionObserver;
  private lastElement: ElementRef | undefined;


  constructor() { }

  ngOnInit() {
    this.intersectionObserver();
  }

  ngAfterViewInit() {
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25,
    }

    this.obsever = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.loadMore.emit();
      }
    }, options);
  }

  updateItems(users: any) {
    this.items = users;

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
}
