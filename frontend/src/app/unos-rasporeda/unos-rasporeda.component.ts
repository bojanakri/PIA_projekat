import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Delegat } from '../model/delegat.model';
import { Sportista } from '../model/sportista.model';
import { Takmicenje } from '../model/takmicenje.model';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-unos-rasporeda',
  templateUrl: './unos-rasporeda.component.html',
  styleUrls: ['./unos-rasporeda.component.css']
})
export class UnosRasporedaComponent implements OnInit {

  constructor(private router: Router, private servis: SportService) { }

  ngOnInit(): void {
    this.ja = JSON.parse(localStorage.getItem('prijavljenDelegat'));
    this.servis.dohvatiSvaTakmicenjaZaRaspored().subscribe((takmicenja: Takmicenje[])=>{
      this.svaTakmicenja = takmicenja;
    })

    if (this.ja == null) {
      this.router.navigate(['']);
    }

  }

  ja: Delegat;
  datumTakmicenja: Date;
  vremeTakmicenja: Time;
  svaTakmicenja: Takmicenje[];
  takmicenje: String = "";
  poruka: String;
  takmicenjeDisciplina: String;
  izabraniSportisti: Object[];
  logout(){
    localStorage.removeItem('prijavljenDelegat');
    localStorage.clear();
    this.router.navigate(['']);
  }



  shuffle(array) {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {

        j = Math.floor(Math.random() * (i+1));

        // swap randomly chosen element with current element
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }

    return array;
  }
  indeksi: number[] = [];
  izaberiRandom(takmicenje: String){
    console.log(takmicenje); 

    var takm = this.svaTakmicenja.find(t=>t.disciplina==takmicenje);
    console.log(takm);
    this.indeksi = [];
    for(let i=0;i<takm.sportisti.length;i++){
      this.indeksi.push(i);
    }
    this.indeksi = this.shuffle(this.indeksi);
    this.indeksi = this.indeksi.slice(0,8);
    console.log(this.indeksi);
    this.izabraniSportisti = [];
    for(let i=0;i<8;i++){
      this.izabraniSportisti.push(takm.sportisti[this.indeksi[i]]);
    }
    console.log(this.izabraniSportisti);
    
  }

  unesi(){
    if(this.takmicenjeDisciplina=="" || this.datumTakmicenja==null || this.vremeTakmicenja==null){
      this.poruka="Morate uneti sve podatke";
    }
    else{
      if(this.takmicenjeDisciplina=="100m trcanje" || this.takmicenjeDisciplina=="200m trcanje" || this.takmicenjeDisciplina=="400m trcanje" || this.takmicenjeDisciplina=="800m trcanje" || this.takmicenjeDisciplina=="5000m trcanje" || this.takmicenjeDisciplina=="10000m trcanje" ||
      this.takmicenjeDisciplina=="maraton" || this.takmicenjeDisciplina=="20km brzo hodanje" || this.takmicenjeDisciplina=="50km brzo hodanje" || this.takmicenjeDisciplina=="100m leptir" || this.takmicenjeDisciplina=="200m slobodno"){
        //potrebno je tacno 8 sportista
        console.log("dosao do ovde sa disciplinom:");
        console.log(this.takmicenjeDisciplina);
        console.log(this.datumTakmicenja);
        console.log(this.vremeTakmicenja);
        console.log(this.izabraniSportisti);
        
        this.servis.unesiIzabraneSportisteRaspored(this.takmicenjeDisciplina,this.izabraniSportisti,this.vremeTakmicenja,this.datumTakmicenja).subscribe();
      }
      else{
        //potrebno je do 8, ne mora tacno 8, moze i manje
        var takm = this.svaTakmicenja.find(t=>t.disciplina==this.takmicenjeDisciplina);
        this.izabraniSportisti = [];
        for(let i=0;i<takm.sportisti.length;i++){
          this.izabraniSportisti.push(takm.sportisti[i]);
        }
        this.servis.unesiIzabraneSportisteRaspored(this.takmicenjeDisciplina,this.izabraniSportisti, this.vremeTakmicenja, this.datumTakmicenja).subscribe();
      }
      alert("Uneli ste uspesno raspored");
    }
  }
}
