import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrearComponent } from './crear/crear.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { EditarComponent } from './editar/editar.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '',redirectTo:'/home',pathMatch:'full'},
  { path: 'home', component: EncuestasComponent },
  { path: 'crear', component: CrearComponent },
  { path: 'editar/:id', component: EditarComponent },  
  { path: 'aboutUs', component: AboutComponent }

];



@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule { }

