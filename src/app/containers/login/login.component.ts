import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private toastr : ToastrService,
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
    this.loginInvalid = false;
    if(!this.form.valid) {
      this.toastr.error('something went wrong...','Not valid form',{
        positionClass: 'toast-top-right' 
      });
      this.loginInvalid = true;
      return
    }

    this.authService.login(this.form.value.login, this.form.value.password)
      .subscribe(res => {
          this.onSubmitSuccess();
        },
        err => {
          this.onSubmitFailure;
        });
  }

  private onSubmitSuccess() {
    console.log("ss");
    this.router.navigate(['/apiary']);
    console.log("ss2");
  }

  private onSubmitFailure() {
    this.toastr.success('something went wrong...', 'Error',{
      positionClass: 'toast-top-right' 
    });
    console.log('Login or password is incorrect, please try again!');
  }
}
