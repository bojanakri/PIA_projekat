import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Delegat } from '../model/delegat.model';
import { Sportista } from '../model/sportista.model';
import { Takmicenje } from '../model/takmicenje.model';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-unos-rezultata',
  templateUrl: './unos-rezultata.component.html',
  styleUrls: ['./unos-rezultata.component.css']
})
export class UnosRezultataComponent implements OnInit {

  constructor(private servis: SportService, private router: Router) {
    this.takmicenjeDisciplina = "";
  }

  ngOnInit(): void {
    this.servis.dohvatiSvaTakmicenjaZaRezultat().subscribe((takmicenja: Takmicenje[]) => {
      this.svaTakmicenja = takmicenja;
    })
    this.ja = JSON.parse(localStorage.getItem('prijavljenDelegat'));
    if (this.ja == null) {
      this.router.navigate(['']);
    }
  }

  ja: Delegat;
  svaTakmicenja: Takmicenje[];
  takmicenjeDisciplina: string;
  public mojiSportisti: Array<Object>;
  rezultat: string;

  casovi: number[] = [];
  minuti: number[] = [];
  sekundi: number[] = [];
  stotinke: number[] = [];
  metri: number[] = [];
  centimetri: number[] = [];
  serija1: number[] = [];
  serija2: number[] = [];
  serija3: number[] = [];
  serija4: number[] = [];
  serija5: number[] = [];
  serija6: number[] = [];
  set1: number[] = [];
  set2: number[] = [];
  set3: number[] = [];
  indexi: number[] = [];
  izabran: boolean = false;

  logout() {
    localStorage.removeItem('prijavljenDelegat');
    localStorage.clear();
    this.router.navigate(['']);
  }

  dohvatiMojeSportiste() {
    console.log("usao je u moje sportiste");
    console.log(this.takmicenjeDisciplina);

    this.svaTakmicenja.forEach(s => {
      if (s.disciplina == this.takmicenjeDisciplina) {
        this.mojiSportisti = s.izabraniSportisti;
      }
    });
    for (let i = 0; i < this.mojiSportisti.length; i++) {
      this.indexi.push(i);
    }
    this.izabran = true;
    console.log(this.mojiSportisti);
  }

  rezultati: number[] = [];
  najbolji: Object[] = [];
  mojiSporKopija: Object[] = [];
  analiza: boolean = false;
  unesiRezTakmicara() {
    // console.log(this.sekundi)
    // console.log(this.stotinke);
    // console.log(this.mojiSportisti);

    if (this.takmicenjeDisciplina == "100m trcanje" || this.takmicenjeDisciplina == "200m trcanje" ||
      this.takmicenjeDisciplina == "400m trcanje" || this.takmicenjeDisciplina == "100m leptir" ||
      this.takmicenjeDisciplina == "200m slobodno"
    ) {
      for (let i = 0; i < this.mojiSportisti.length; i++) {
        this.rezultati[i] = this.sekundi[i] * 100 + this.stotinke[i];
      }
      this.mojiSportisti.forEach(val => this.mojiSporKopija.push(Object.assign({}, val)));
      for (let i = 0; i < 3; i++) {
        var indexMenor = this.rezultati.indexOf(Math.min(...this.rezultati));
        this.najbolji[i] = this.mojiSporKopija[indexMenor];
        this.rezultati.splice(indexMenor, 1);
        this.mojiSporKopija.splice(indexMenor, 1);
        if(i == 0){
          this.servis.uvecajZlatne((this.najbolji[i] as Sportista).zemlja).subscribe();
        //  this.servis.uvecajBrojMedalja((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
        else if(i==1){
          this.servis.uvecajSrebrne((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
        else{
          this.servis.uvecajBronzane((this.najbolji[i] as Sportista).zemlja).subscribe();
        }

      }
      // console.log(this.najbolji);

    }
    else if (this.takmicenjeDisciplina=="800m trcanje" || this.takmicenjeDisciplina=="5000m trcanje" || this.takmicenjeDisciplina=="10000m trcanje"
    ) {
      for (let i = 0; i < this.mojiSportisti.length; i++) {
        this.rezultati[i] = this.minuti[i]*60*100 + this.sekundi[i] * 100 + this.stotinke[i];
      }
      this.mojiSportisti.forEach(val => this.mojiSporKopija.push(Object.assign({}, val)));
      for (let i = 0; i < 3; i++) {
        var indexMenor = this.rezultati.indexOf(Math.min(...this.rezultati));
        this.najbolji[i] = this.mojiSporKopija[indexMenor];
        this.rezultati.splice(indexMenor, 1);
        this.mojiSporKopija.splice(indexMenor, 1);
        if(i == 0){
          this.servis.uvecajZlatne((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
        else if(i==1){
          this.servis.uvecajSrebrne((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
        else{
          this.servis.uvecajBronzane((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
      }
      // console.log(this.najbolji);
    }
    else if (this.takmicenjeDisciplina=="skok u vis" || this.takmicenjeDisciplina=="skok u dalj" || this.takmicenjeDisciplina=="troskok" || this.takmicenjeDisciplina=="bacanje diska" || this.takmicenjeDisciplina=="bacanje kugle" || this.takmicenjeDisciplina=="bacanje kladiva" || this.takmicenjeDisciplina=="bacanje koplja"
    ) {
      for (let i = 0; i < this.mojiSportisti.length; i++) {
        this.rezultati[i] = this.metri[i]*100 + this.centimetri[i];
      }
      this.mojiSportisti.forEach(val => this.mojiSporKopija.push(Object.assign({}, val)));
      for (let i = 0; i < 3; i++) {
        var indexMenor = this.rezultati.indexOf(Math.max(...this.rezultati));
        this.najbolji[i] = this.mojiSporKopija[indexMenor];
        this.rezultati.splice(indexMenor, 1);
        this.mojiSporKopija.splice(indexMenor, 1);
        if(i == 0){
          this.servis.uvecajZlatne((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
        else if(i==1){
          this.servis.uvecajSrebrne((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
        else{
          this.servis.uvecajBronzane((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
      }
      // console.log(this.najbolji);
    }
    else if (this.takmicenjeDisciplina=="maraton" || this.takmicenjeDisciplina=="20km brzo hodanje" || this.takmicenjeDisciplina=="50km brzo hodanje" || this.takmicenjeDisciplina=="drumska trka 225km"
    ) {
      for (let i = 0; i < this.mojiSportisti.length; i++) {
        this.rezultati[i] = this.casovi[i]*60*60 + this.minuti[i]*60 + this.sekundi[i];
      }
      this.mojiSportisti.forEach(val => this.mojiSporKopija.push(Object.assign({}, val)));
      for (let i = 0; i < 3; i++) {
        var indexMenor = this.rezultati.indexOf(Math.min(...this.rezultati));
        this.najbolji[i] = this.mojiSporKopija[indexMenor];
        this.rezultati.splice(indexMenor, 1);
        this.mojiSporKopija.splice(indexMenor, 1);
        if(i == 0){
          this.servis.uvecajZlatne((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
        else if(i==1){
          this.servis.uvecajSrebrne((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
        else{
          this.servis.uvecajBronzane((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
      }
      // console.log(this.najbolji);
    }
    else if (this.takmicenjeDisciplina=="50m trostav" || this.takmicenjeDisciplina=="10m vazdusna puska" || this.takmicenjeDisciplina=="25m malokalibarski pistolj" || this.takmicenjeDisciplina=="10m vazdusni pistolj"
    ) {
      for (let i = 0; i < this.mojiSportisti.length; i++) {
        this.rezultati[i] = this.serija1[i] + this.serija2[i] + this.serija3[i] + this.serija4[i] + this.serija5[i] + this.serija6[i];
      }
      this.mojiSportisti.forEach(val => this.mojiSporKopija.push(Object.assign({}, val)));
      for (let i = 0; i < 3; i++) {
        var indexMenor = this.rezultati.indexOf(Math.max(...this.rezultati));
        this.najbolji[i] = this.mojiSporKopija[indexMenor];
        this.rezultati.splice(indexMenor, 1);
        this.mojiSporKopija.splice(indexMenor, 1);
        if(i == 0){
          this.servis.uvecajZlatne((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
        else if(i==1){
          this.servis.uvecajSrebrne((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
        else{
          this.servis.uvecajBronzane((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
      }
      // console.log(this.najbolji);
    }
    else{
      for (let i = 0; i < this.mojiSportisti.length; i++) {
        this.rezultati[i] = this.set1[i] + this.set2[i] + this.set3[i];
      }
      this.mojiSportisti.forEach(val => this.mojiSporKopija.push(Object.assign({}, val)));
      for (let i = 0; i < 2; i++) {
        var indexMenor = this.rezultati.indexOf(Math.max(...this.rezultati));
        this.najbolji[i] = this.mojiSporKopija[indexMenor];
        this.rezultati.splice(indexMenor, 1);
        this.mojiSporKopija.splice(indexMenor, 1);
        if(i == 0){
          this.servis.uvecajZlatne((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
        else {
          this.servis.uvecajSrebrne((this.najbolji[i] as Sportista).zemlja).subscribe();
        }
        // else{
        //   this.servis.uvecajBronzane((this.najbolji[i] as Sportista).zemlja).subscribe();
        // }
      }
    }
    this.servis.unesiRezTakmicenja(this.takmicenjeDisciplina).subscribe();
    this.analiza = true;
    console.log(this.sekundi)
    console.log(this.stotinke);
    console.log(this.mojiSportisti);

  }


}
