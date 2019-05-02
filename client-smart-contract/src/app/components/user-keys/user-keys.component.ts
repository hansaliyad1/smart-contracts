import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-user-keys',
  templateUrl: './user-keys.component.html',
  styleUrls: ['./user-keys.component.css']
})
export class UserKeysComponent implements OnInit {

  messageClass;
  message;
  processing = false;
  form;
  keys;
  public show: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) {
    this.createUserKeysForm();
  }

  // Function to create login form
  createUserKeysForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required], // Username field
      password: ['', Validators.required] // Password field
    });
  }

  // Function to disable form
  disableForm() {
    this.form.controls['username'].disable(); // Disable username field
    this.form.controls['password'].disable(); // Disable password field
  }

  // Function to enable form
  enableForm() {
    this.form.controls['username'].enable(); // Enable username field
    this.form.controls['password'].enable(); // Enable password field
  }

  // Functiont to submit form and login user
  onVerifySubmit() {
    this.processing = true; // Used to submit button while is being processed
    this.disableForm(); // Disable form while being process
    // Create login_info object from login_info's input
    const login_info = {
      username: this.form.get('username').value, // Username input field
      password: this.form.get('password').value // Password input field
    };

    // Function to send login data to API
    this.authService.verify(login_info).subscribe(data => {
      // Check if response was a success or error
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting
      } else {
        this.messageClass = 'alert alert-success'; // Set bootstrap success class
        this.message = data.message; // Set success message

        this.show = true;
        this.keys = data.keys;

      }
    });
  }

  ngOnInit() {
  }

}
