import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  token: any;
  result : string;
  constructor(private route: ActivatedRoute, private authService : AuthService ) {}

  ngOnInit() {
    
    this.token = this.route.snapshot.paramMap.get('id');
    this.authService.ActivateAccount(this.token).subscribe(data => { //subscribe to response
      this.result = "Hooray, registration completed";
    }, error => {
      this.result = "Sorry, something went wrong...";
    });

  }

}
