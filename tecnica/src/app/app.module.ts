import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './component/header/header.component';
import { CharacterListComponent } from './component/character-list/character-list.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import {MatToolbarModule} from '@angular/material/toolbar';
import { CharacterDetailComponent } from './component/character-detail/character-detail.component'
import { MatDialogModule } from '@angular/material/dialog';
import { EpisodesListComponent } from './component/episodes-list/episodes-list.component';
import { EpisodesDetailComponent } from './component/episodes-detail/episodes-detail.component';
import { PlacesComponent } from './component/places/places.component';
import { LocationDetailComponent } from './component/location-detail/location-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CharacterListComponent,
    CharacterDetailComponent,
    EpisodesListComponent,
    EpisodesDetailComponent,
    PlacesComponent,
    LocationDetailComponent
  ],
  imports: [
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
