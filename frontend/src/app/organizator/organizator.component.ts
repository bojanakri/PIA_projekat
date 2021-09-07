import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organizator } from '../model/organizator.model';
import { SportService } from '../sport.service';
@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private servis: SportService, private router: Router) { }

  ngOnInit(): void {
    
    this.ja = JSON.parse(localStorage.getItem('prijavljenOrganizator'));
    if (this.ja == null) {
      this.router.navigate(['']);
    }
  }
  ja: Organizator;

   logout() {
    localStorage.removeItem('prijavljenOrganizator');
    localStorage.clear();
    this.router.navigate(['']);
  }

}
