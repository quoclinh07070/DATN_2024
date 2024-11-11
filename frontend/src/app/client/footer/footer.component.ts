import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef;

  ngAfterViewInit() {
    if (this.carousel) {
      const carouselElement = this.carousel.nativeElement;
      const interval = 2000; // 2 giây

      setInterval(() => {
        const activeItem = carouselElement.querySelector('.carousel-item.active');
        const nextItem = activeItem?.nextElementSibling || carouselElement.querySelector('.carousel-item');

        if (activeItem) {
          activeItem.classList.remove('active');
        }
        if (nextItem) {
          nextItem.classList.add('active');
        }
      }, interval);
    }
  }
}
