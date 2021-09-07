import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Organizator } from '../model/organizator.model';
import { Sport } from '../model/sport.model';
import { Sportista } from '../model/sportista.model';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-unos-disc-sport',
  templateUrl: './unos-disc-sport.component.html',
  styleUrls: ['./unos-disc-sport.component.css']
})
export class UnosDiscSportComponent implements OnInit {

 
  constructor(private servis: SportService, private router: Router) { }

  ngOnInit(): void {
    this.servis.dohvatiSveSportove().subscribe((sportovi: Sport[]) => {
      this.sportovi = sportovi;
    });

    this.ja = JSON.parse(localStorage.getItem('prijavljenOrganizator'));
    if (this.ja == null) {
      this.router.navigate(['']);
    }
  }
  ja: Organizator;
  poruka: string;
  sportovi: Sport[];
  sport: string;

  dodaj(s, d) {
    this.servis.dodajSportDisciplinu(s.sport, d.naziv).subscribe((odg) => {
      if (odg['poruka'] == -1) {
        this.poruka = 'Desila se greska';
      }
      else {
        this.servis.dohvatiSveSportove().subscribe((sportovi: Sport[]) => {
          this.sportovi = sportovi;
        })
      }
    })
  }


  logout() {
    localStorage.removeItem('prijavljen');
    localStorage.clear();
    this.router.navigate(['']);
  }
}
