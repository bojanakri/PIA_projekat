import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Drzava } from '../model/drzava.model';
import { Sportista } from '../model/sportista.model';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-medalje',
  templateUrl: './medalje.component.html',
  styleUrls: ['./medalje.component.css']
})
export class MedaljeComponent implements OnInit {


  constructor(private servis: SportService) { }

  ngOnInit(): void {
    this.servis.dohvatiSveZemlje().subscribe((zemlje: Drzava[]) => {
      this.zemlje = zemlje;
      this.zemlje.forEach(z => {
        this.servis.dohvatiSportisteIzZemlje(z.naziv).subscribe((sportisti: Sportista[]) => {
          z.brojSportista = sportisti.length;
        })
      });
      this.zemlje.sort((a, b) => (a.zlato + a.srebro + a.bronza) < (b.zlato + b.srebro + b.bronza) ? 1 : -1);
      for (let i = 0; i < zemlje.length; i++) {
        this.zemlje[i].rang = i + 1;
        this.zemlje[i].brojMedalja = this.zemlje[i].zlato +  this.zemlje[i].srebro +  this.zemlje[i].bronza;
      }
      this.ukupno = this.zemlje.length;
      if (this.ukupno > 10) {
        this.trenutneZemlje = this.zemlje.slice(0, 10);
      }
    })
  }

  zemlje: Drzava[];
  trenutneZemlje: Drzava[];
  trenutna: number = 1;
  ukupno: number;
  brPoStrani: number = 10;

  prev() {
    if (this.trenutna == 1) return;
    this.trenutna = this.trenutna - 1;
    this.trenutneZemlje = this.zemlje.slice((this.trenutna - 1) * 10, this.trenutna * 10);
  }

  next() {
    if (Math.ceil(this.ukupno / 10) <= this.trenutna) return;
    this.trenutna = this.trenutna + 1;
    this.trenutneZemlje = this.zemlje.slice((this.trenutna - 1) * 10, this.trenutna * 10);
  }

}
