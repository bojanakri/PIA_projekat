import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CekaZaRegistracijuComponent } from './ceka-za-registraciju/ceka-za-registraciju.component';
import { DelegatComponent } from './delegat/delegat.component';
import { LoginComponent } from './login/login.component';
import { MedaljeComponent } from './medalje/medalje.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { PretragaSportistaComponent } from './pretraga-sportista/pretraga-sportista.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { UnosDiscSportComponent } from './unos-disc-sport/unos-disc-sport.component';
import { UnosRasporedaComponent } from './unos-rasporeda/unos-rasporeda.component';
import { UnosRezultataComponent } from './unos-rezultata/unos-rezultata.component';
import { UnosTakmicenjaComponent } from './unos-takmicenja/unos-takmicenja.component';
import { VodjaComponent } from './vodja/vodja.component';
import { ZemljeUcesniceComponent } from './zemlje-ucesnice/zemlje-ucesnice.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "vodja", component: VodjaComponent},
  {path: "delegat", component: DelegatComponent},
  {path: "organizator", component: OrganizatorComponent},
  {path: "registracija", component: RegistracijaComponent},
  {path: "zemljeUcesnice", component: ZemljeUcesniceComponent},
  {path: "pretragaSportista", component: PretragaSportistaComponent},
  {path: "medalje", component: MedaljeComponent},
  {path: "unosTakmicenja", component: UnosTakmicenjaComponent},
  {path: "unosDiscSport", component: UnosDiscSportComponent},
  {path: "cekaZaRegistraciju", component: CekaZaRegistracijuComponent},
  {path: "unosRasporeda" , component: UnosRasporedaComponent},
  {path: "unosRezultata", component: UnosRezultataComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
