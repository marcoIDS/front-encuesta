import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CrearComponent } from './crear/crear.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { EditarComponent } from './editar/editar.component';
import { AboutComponent } from './about/about.component';

import { GraphQLModule } from './graphql.module';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';
import { VerComponent } from './ver/ver.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearComponent,
    EncuestasComponent,
    EditarComponent,
    AboutComponent,
    VerComponent
  ],
  imports: [
    BrowserModule,     
    ReactiveFormsModule, 
    FormsModule ,    
    GraphQLModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
