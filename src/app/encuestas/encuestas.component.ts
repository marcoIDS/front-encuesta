import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as Query from '../query';
import { RecursosService } from '../recursos.service';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css']
})
export class EncuestasComponent implements OnInit {

  encuestas:any = []
  constructor(
    private apollo: Apollo,    
    private recursos: RecursosService
  ) { 
    try {
      
    } catch (error) {
      console.log("error"+error)
    }
  }

  ngOnInit() {
    this.apollo.watchQuery<any>({query: Query.getEncuestas}).valueChanges.subscribe(response=>{
      this.recursos.getEncuestas(response.data.encuestas)
      this.encuestas=this.recursos.encuestas
    })
    
  }
  
  eliminar(id:any){
    console.log(id)
    this.apollo.mutate({      
      mutation: Query.eliminarEncuesta,
      variables:{
        id: id
      },
      update: (proxy, {data: { eliminarEncuesta}}) =>{ 
        const data: any = proxy.readQuery({query: Query.getEncuestas});

        console.log(data,eliminarEncuesta);
        let index = this.recursos.encuestas.findIndex(encuestas => encuestas.idencuesta === id)
        this.recursos.encuestas.splice(index,1)
        proxy.writeQuery({query: Query.getEncuestas, data});
      }
    }).subscribe(({data})=>{
        this.ngOnInit()
    }, (error)=>{
      console.log("error", error);
    });    
  }

  
}
