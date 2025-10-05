import { Component, OnInit } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UserService, IUser } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding-request',
  imports: [NzTableModule, NzLayoutModule, CommonModule],
  templateUrl: './onboarding-request.html',
  styleUrl: './onboarding-request.css'
})
export class OnboardingRequest implements OnInit {
  // Property to hold the array of users
  userList: IUser[] = [];
  
  constructor(private userService: UserService) { }

   ngOnInit(): void {
    // Call the method to load data when the component loads
    this.loadUsers(); 
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        // Assign the fetched array of users to the userList property
        this.userList = data; 
        console.log('Users loaded successfully:', this.userList);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        // You might want to display an error message to the user here
      }
    });
  }
}
