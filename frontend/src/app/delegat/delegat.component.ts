import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Delegat } from '../model/delegat.model';

@Component({
  selector: 'app-delegat',
  templateUrl: './delegat.component.html',
  styleUrls: ['./delegat.component.css']
})
export class DelegatComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.ja = JSON.parse(localStorage.getItem('prijavljenDelegat'));
    if (this.ja == null) {
      this.router.navigate(['']);
    }
  }

  ja: Delegat;
  logout(){
    localStorage.removeItem('prijavljenDelegat');
    localStorage.clear();
    this.router.navigate(['']);
  }

}
