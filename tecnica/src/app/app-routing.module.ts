import { CharacterListComponent } from './component/character-list/character-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodesListComponent } from './component/episodes-list/episodes-list.component';
import { PlacesComponent } from './component/places/places.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "main-pege",
  },
  {
    path: "main-pege",
    component: CharacterListComponent
  },
  {
    path: "episodes",
    component: EpisodesListComponent
  },
  {
    path: "places",
    component: PlacesComponent
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
