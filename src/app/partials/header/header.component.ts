import { Router } from '@angular/router';
import { AuthService } from './../../providers/auth.service';
import { FirestoreService } from './../../providers/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  prices: any;

  constructor(public auth: AuthService,
              private firestoreService: FirestoreService,
              private router: Router
              ) { }

  ngOnInit() {
    this.firestoreService.getPrices().subscribe(data => {
      this.prices = data;
    });
  }

  // logout
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}
