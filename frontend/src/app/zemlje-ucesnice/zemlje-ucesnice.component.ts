import { Component, OnInit } from '@angular/core';
import { Drzava } from '../model/drzava.model';
import { Sportista } from '../model/sportista.model';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-zemlje-ucesnice',
  templateUrl: './zemlje-ucesnice.component.html',
  styleUrls: ['./zemlje-ucesnice.component.css']
})
export class ZemljeUcesniceComponent implements OnInit {

  constructor(private servis: SportService) { }

  ngOnInit(): void {
    this.servis.dohvatiSveZemlje().subscribe((zemlje: Drzava[]) => {
      this.zemlje = zemlje;
      this.zemlje.forEach(z => {
        this.servis.dohvatiSportisteIzZemlje(z.naziv).subscribe((sportisti: Sportista[]) => {
          z.brojSportista = sportisti.length;
        })
      });
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
