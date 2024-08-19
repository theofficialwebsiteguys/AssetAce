import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  confirmationMessage = '';

  constructor(private emailService: EmailService) {}

  onSubmit() {
    this.emailService.sendEmail(this.contact).subscribe(
      response => {
        this.confirmationMessage = 'Thank you! Your message has been sent successfully.';
        console.log('Email sent successfully:', response);
        this.resetForm();
      },
      error => {
        // this.confirmationMessage = 'Oops! Something went wrong. Please try again later.';
        // console.error('Error sending email:', error);
      }
    );
    this.confirmationMessage = 'Thank you! Your message has been sent successfully.';
    this.resetForm();
  }

  resetForm() {
    this.contact = {
      name: '',
      email: '',
      message: ''
    };

    setTimeout(() => {
      this.confirmationMessage = '';
    }, 5000); // Clear the confirmation message after 5 seconds
  }
}
