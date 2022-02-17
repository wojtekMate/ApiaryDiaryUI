import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  changeCount: number = 0;
  form: FormGroup;
  public registerInvalid = false;
  private formSubmitAttempt = false;
  login = '';
  password = '';
  constructor
  (    
    private builder: FormBuilder,
    private router: Router,
    private authService : AuthService,
    private toastr: ToastrService,
  ) 
    { 
      this.form = this.builder.group({
        login: ['', Validators.email],
        password: ['', Validators.required]
      });  
    }

  onSubmit() {
    console.log(this.form.hasError);
    console.log(this.form);
    this.registerInvalid = false;
    if(!this.form.valid) {
      this.toastr.error('something went wrong...','Not valid form',{
        positionClass: 'toast-top-right' 
      });
      this.registerInvalid = true;
      return
    }
    this.authService.SignUp(this.form.value.login, this.form.value.password)
      .subscribe(res => {
        this.onSubmitSuccess();
        },
        err => {
          this.registerInvalid = true;
          this.onSubmitFailure()
        });
  }

  private onSubmitSuccess() {
    this.toastr.success('Check you email.', 'Success',{
      positionClass: 'toast-top-right' 
    });
    this.router.navigate(['/login']);
  }

  private onSubmitFailure() {
    this.toastr.error('something went wrong...','Error!',{
      positionClass: 'toast-top-right' 
    });
  }
}
