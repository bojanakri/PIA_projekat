import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Delegat } from '../model/delegat.model';
import { Organizator } from '../model/organizator.model';
import { Vodja } from '../model/vodja.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  poruka: string;
  korime: string;
  lozinka: string;
  message: string;
  prosao: number;
  tip: string;

  constructor(private service: KorisnikService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {

    if (this.tip == "vodja") {
      this.service.login(this.korime, this.lozinka, this.tip).subscribe((vodja: Vodja) => {
        if (vodja[0]) {
          if (vodja[0].odobren == true) {
            localStorage.setItem('prijavljenVodja', JSON.stringify(vodja[0]));
            this.router.navigate(['/vodja']);
          }
          else {
            this.message = "Vodju jos uvek administrator nije odobrio!";
          }
        }
        else {
          this.message = "Ne postoji taj korisnik";
        }
      })
    }
    else if (this.tip == "organizator") {
      this.service.login(this.korime, this.lozinka, this.tip).subscribe((organizator: Organizator) => {
        if (organizator[0]) {
          localStorage.setItem('prijavljenOrganizator', JSON.stringify(organizator[0]));
          this.router.navigate(['/organizator']);
        }
        else {
          this.message = "Ne postoji taj korisnik";
        }
      })
    }
    else if (this.tip == "delegat") {
      this.service.login(this.korime, this.lozinka, this.tip).subscribe((delegat: Delegat) => {
        if (delegat[0]) {
          if (delegat[0].odobren == true) {
            localStorage.setItem('prijavljenDelegat', JSON.stringify(delegat[0]));
            this.router.navigate(['/delegat']);
          }
          else {
            this.message = "Delegata jos uvek administrator nije odobrio!";
          }
        }
        else {
          this.message = "Ne postoji taj korisnik";
        }
      })
    }
    else {
      if (this.korime == "" || this.lozinka == "")
        this.message = "Morate uneti sve podatke";
      else
        this.message = "Morate izabrati tip";
    }
  }

  registracija() {
    this.router.navigate(['/registracija']);
  }


}
