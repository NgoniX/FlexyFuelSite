import { AuthService } from './../providers/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public credential = {
    displayName: '',
    email: '',
    password: ''
  };

  submitted = false;

  constructor(private auth: AuthService,
              private spinner: NgxSpinnerService,
              private router: Router,
              private toastr: ToastrService
    ) { }

  ngOnInit() {
  }

  login(form) {

    this.submitted = true;

    if (form.valid) {

      this.spinner.show();
      this.auth.doLogin(this.credential).then(res => {
          console.log(res);
          this.toastr.success('You have successfully logged in');
          this.router.navigate(['/']);
          this.spinner.hide();
      }, err => {
          console.log(err);
          this.spinner.hide();
          this.toastr.warning('Login Failed');
      });

    }
  }

}
