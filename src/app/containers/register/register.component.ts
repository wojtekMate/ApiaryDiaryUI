import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  public RegisterInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;
  login = '';
  password = '';
  constructor
  (    
    private builder: FormBuilder,
    private router: Router,
    private authService : AuthService
  ) 
    { 
      this.form = this.builder.group({
        login: ['', Validators.email],
        password: ['', Validators.required]
      });  
    }
  ngOnInit(): void {
    
  }
  onSubmit() {
    this.authService.SignUp(this.form.value.login, this.form.value.password)
      .subscribe(res => {
        console.log("success");
        this.onSubmitSuccess();
        },
        err => {
          this.form.setErrors({
            "auth": "Niepoprawna nazwa użytkownika lub hasło."
          }),
          console.log("err");
          this.onSubmitFailure()
        });
  }

  private onSubmitSuccess() {
    this.router.navigate(['/login']);
  }

  private onSubmitFailure() {
    console.log('Login or password is incorrect, please try again!');
  }
}
