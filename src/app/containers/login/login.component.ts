import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;
  login = '';
  password = '';

  constructor(    
    private builder: FormBuilder,
    private router: Router,
    private authService : AuthService) 
    { 
      this.form = this.builder.group({
        login: ['', Validators.email],
        password: ['', Validators.required]
      });  

    }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.form.value.login, this.form.value.password)
      .subscribe(res => {
          this.onSubmitSuccess();
        },
        err => {
          this.form.setErrors({
            "auth": "Niepoprawna nazwa użytkownika lub hasło."
          }),
          this.onSubmitFailure;
        });
  }


  private onSubmitSuccess() {
    this.router.navigate(['/apiary']);
  }

  private onSubmitFailure() {
    console.log('Login or password is incorrect, please try again!');
  }
}
