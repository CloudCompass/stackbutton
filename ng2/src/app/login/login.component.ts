import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'app-login-page',
  templateUrl: 'login.component.html'
})
/**
 * LoginComponent displays a login form to the user and authenticates based on their credentials
 * If there's a successful login, the user is sent back, authenticated
 */
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.errorMessage = ''; // no message is displayed by default.
  }

  ngOnInit() {
    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password).subscribe(
      data => {
        // If data exists, the login was successful
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log('Authenication error: ' + error);
        this.errorMessage = 'Problem with username or password';
        this.loading = false;
      }
    );
  }
}
