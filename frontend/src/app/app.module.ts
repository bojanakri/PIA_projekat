import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VodjaComponent } from './vodja/vodja.component';
import { DelegatComponent } from './delegat/delegat.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistracijaComponent } from './registracija/registracija.component';
import { ZemljeUcesniceComponent } from './zemlje-ucesnice/zemlje-ucesnice.component';
import { MedaljeComponent } from './medalje/medalje.component';
import { PretragaSportistaComponent } from './pretraga-sportista/pretraga-sportista.component';
import { UnosDiscSportComponent } from './unos-disc-sport/unos-disc-sport.component';
import { UnosTakmicenjaComponent } from './unos-takmicenja/unos-takmicenja.component';
import { CekaZaRegistracijuComponent } from './ceka-za-registraciju/ceka-za-registraciju.component';
import { UnosRasporedaComponent } from './unos-rasporeda/unos-rasporeda.component';
import { UnosRezultataComponent } from './unos-rezultata/unos-rezultata.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VodjaComponent,
    DelegatComponent,
    OrganizatorComponent,
    RegistracijaComponent,
    ZemljeUcesniceComponent,
    MedaljeComponent,
    PretragaSportistaComponent,
    UnosDiscSportComponent,
    UnosTakmicenjaComponent,
    CekaZaRegistracijuComponent,
    UnosRasporedaComponent,
    UnosRezultataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
