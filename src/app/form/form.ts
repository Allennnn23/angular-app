import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { UserService, IUser } from '../user.service';

@Component({
  selector: 'app-form',
  imports: [NzFormModule, NzInputModule, NzButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form implements OnInit {
   validateForm!: FormGroup;

  // Inject FormBuilder and UserService
  constructor(private fb: FormBuilder, private userService: UserService ) {}

  ngOnInit(): void {
    // Initialize the form structure using FormBuilder
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]], 
      email: [null, [Validators.required, Validators.email]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('Form submitted:', this.validateForm.value);
      
      const newUser: IUser = this.validateForm.value as IUser;
      
      this.userService.createUser(newUser).subscribe({
        next: (response) => {
          console.log('User created successfully:', response);
          alert(`User ${response.name} created!`);
          this.validateForm.reset(); // Clear the form
        },
        error: (err) => {
          console.error('Error creating user:', err);
          alert('Error: Could not create user. Check the console.');
        }
      });

    } else {
      // Logic to show validation errors
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
