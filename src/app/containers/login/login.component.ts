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

  onSubmit2() {
    this.authService.fakeLogin(this.form.value.login, this.form.value.password)
      .then(this.onSubmitSuccess.bind(this), this.onSubmitFailure);
  }


  onSubmit() {
    this.authService.login(this.form.value.login, this.form.value.password)
      .subscribe(res => {
          //this.router.navigate(["contacts"]).then(r => r.valueOf());
          console.log("zalogowano");
          this.onSubmitSuccess();
        },
        err => {
          this.form.setErrors({
            "auth": "Niepoprawna nazwa użytkownika lub hasło."
          }),
          this.onSubmitFailure;
          ;

        });
  }


  private onSubmitSuccess() {
    console.log("xxx");
    this.router.navigate(['/apiary']);
  }

  private onSubmitFailure() {
    console.log('Login or password is incorrect, please try again!');
  }

  // async onSubmit(): Promise<void> {
  //   this.loginInvalid = false;
  //   this.formSubmitAttempt = false;
  //   if (this.form.valid) {
  //     try {
  //       this.authService.login(this.login, this.password).then(this.onSubmitSuccess.bind(this),this.onSubmitFailure);
  //       //await this.authService.login(username, password);
  //       this.formSubmitAttempt = true;
  //     } catch (err) {
  //       this.loginInvalid = true;
  //     }
  //   } else {
  //     this.formSubmitAttempt = true;
  //   }
  // }
}
