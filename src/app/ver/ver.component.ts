import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { RecursosService } from '../recursos.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {
  id:any=0;

  

  preguntas: any =[
  ]

  encuestas:any

  constructor(
    private router: Router,
    private apollo: Apollo,
    private recursos: RecursosService,
    private route: ActivatedRoute,
  ) {
    
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      
    });
    console.log(this.recursos.encuestas)
    let index = this.recursos.encuestas.findIndex(encuestas => encuestas.idencuesta == parseInt(this.id))   
    this.encuestas=this.recursos.encuestas[index]
    this.preguntas=this.encuestas.encuesta;
    console.log(this.preguntas)
  }

}
