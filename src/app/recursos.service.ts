import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecursosService {
  encuestas:any = []
  preguntas: any =[]  
  opciones: any = []
  constructor() { }

  getEncuestas(encuestas:any){
      this.encuestas=encuestas;
      let i=0;
      for(let pregunta of this.encuestas){      
        this.encuestas[i].encuesta=JSON.parse(JSON.stringify(eval(this.encuestas[i].encuesta)))
        i++
      }
  }


}
