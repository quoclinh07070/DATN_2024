import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChatbotService } from '../../services/chatbot.service';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
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

  isChatOpen: boolean = false;
  messages: { user: string; text: string }[] = [];
  userMessage: string = '';

  constructor(private chatbotService: ChatbotService) {}

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ user: 'Bạn', text: this.userMessage });
      this.chatbotService.sendMessage(this.userMessage).subscribe((response) => {
        this.messages.push({ user: 'Bot', text: response.reply });
      });
      this.userMessage = '';
    }
  }
}
