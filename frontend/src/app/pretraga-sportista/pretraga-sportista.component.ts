import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sportista } from '../model/sportista.model';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-pretraga-sportista',
  templateUrl: './pretraga-sportista.component.html',
  styleUrls: ['./pretraga-sportista.component.css']
})
export class PretragaSportistaComponent implements OnInit {

  constructor(private servis: SportService, private router: Router) { }

  ngOnInit(): void {
  }
  zemlja: string = "";
  sport: string = "";
  imeprezime: string = "";
  sportisti: Sportista[];

  trenutniSportisti: Sportista[];
  trenutna: number = 1;
  ukupno: number;

  
  prev() {
    if (this.trenutna == 1) return;
    this.trenutna = this.trenutna - 1;
    this.trenutniSportisti = this.sportisti.slice((this.trenutna - 1) * 10, this.trenutna * 10);
  }

  next() {
    if (Math.ceil(this.ukupno / 10) <= this.trenutna) return;
    this.trenutna = this.trenutna + 1;
    this.trenutniSportisti = this.sportisti.slice((this.trenutna - 1) * 10, this.trenutna * 10);
  }
  pretrazi() {
    if (this.zemlja != "" && this.imeprezime == "" && this.sport == "") {
      this.servis.dohvatiSportisteIzZemlje(this.zemlja).subscribe((sportisti: Sportista[]) => {
        this.sportisti = sportisti;
        this.ukupno = this.sportisti.length;
        if(this.ukupno > 10){
          this.trenutniSportisti = this.sportisti.slice(0,10);
        }
      })
    }
    else if (this.zemlja == "" && this.imeprezime == "" && this.sport != "") {
      this.servis.pretraziSportisteSport(this.sport).subscribe((sportisti: Sportista[]) => {
        this.sportisti = sportisti;
        this.ukupno = this.sportisti.length;
        if(this.ukupno > 10){
          this.trenutniSportisti = this.sportisti.slice(0,10);
        }
      })
    }
    else if (this.zemlja != "" && this.imeprezime == "" && this.sport != "") {
      this.servis.pretraziSportisteZemljaSport(this.zemlja, this.sport).subscribe((sportisti: Sportista[]) => {
        this.sportisti = sportisti;
        this.ukupno = this.sportisti.length;
        if(this.ukupno > 10){
          this.trenutniSportisti = this.sportisti.slice(0,10);
        }
      })
    }
    else if (this.zemlja == "" && this.imeprezime != "" && this.sport != "") {
      const myArr = this.imeprezime.split(" ");
      let ime = myArr[0];
      let prezime = myArr[1];
      this.servis.pretraziSportisteImeSport(ime, prezime, this.sport).subscribe((sportisti: Sportista[]) => {
        this.sportisti = sportisti;
        this.ukupno = this.sportisti.length;
        if(this.ukupno > 10){
          this.trenutniSportisti = this.sportisti.slice(0,10);
        }
      })
    }
    else if (this.zemlja != "" && this.imeprezime != "" && this.sport == "") {
      const myArr = this.imeprezime.split(" ");
      let ime = myArr[0];
      let prezime = myArr[1];
      this.servis.pretraziSportisteImeZemlja(ime, prezime, this.zemlja).subscribe((sportisti: Sportista[]) => {
        this.sportisti = sportisti;
        this.ukupno = this.sportisti.length;
        if(this.ukupno > 10){
          this.trenutniSportisti = this.sportisti.slice(0,10);
        }
      })
    }
    else if (this.zemlja != "" && this.imeprezime != "" && this.sport != "") {
      const myArr = this.imeprezime.split(" ");
      let ime = myArr[0];
      let prezime = myArr[1];
      this.servis.pretraziSportisteImeZemljaSport(ime, prezime, this.zemlja, this.sport).subscribe((sportisti: Sportista[]) => {
        this.sportisti = sportisti;
        this.ukupno = this.sportisti.length;
        if(this.ukupno > 10){
          this.trenutniSportisti = this.sportisti.slice(0,10);
        }
      })
    }
    else if (this.zemlja == "" && this.imeprezime != "" && this.sport == "") {
      const myArr = this.imeprezime.split(" ");
      let ime = myArr[0];
      let prezime = myArr[1];
      this.servis.pretraziSportisteIme(ime, prezime).subscribe((sportisti: Sportista[]) => {
        this.sportisti = sportisti;
        this.ukupno = this.sportisti.length;
        if(this.ukupno > 10){
          this.trenutniSportisti = this.sportisti.slice(0,10);
        }
      })
    }
    else {
      this.servis.dohvatiSveSportiste().subscribe((sportisti: Sportista[]) => {
        this.sportisti = sportisti;
        this.ukupno = this.sportisti.length;
        if(this.ukupno > 10){
          this.trenutniSportisti = this.sportisti.slice(0,10);
        }
      })
    }
  }
}
