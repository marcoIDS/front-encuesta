import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import * as Query from '../query';
import { RecursosService } from '../recursos.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  isNew=true;
  isEdit=false;
  preguntaEdit:any;
  idEncuesta:any
  idPregunta:any

  
  opciones: any = [
    {
      id:1,
      opcion:"",      
    },
  ] 

  preguntas: any =[
  ]

  encuestas:any
  
  listFormGroup: FormGroup;  
  encuesta: FormGroup;


  constructor(
    private router: Router,
    private formBuilder : FormBuilder,
    private formBuilder2 : FormBuilder,
    private apollo: Apollo,
    private recursos: RecursosService
  ) { 
    this.listFormGroup = this.formBuilder.group({
      'pregunta': ['', Validators.required],
      'tipo': ['Texto', Validators.required],      
    })
    this.encuesta= this.formBuilder2.group({
      'nombre': ['', Validators.required],
      'descripcion': ['', Validators.required],      
    })
  }

  ngOnInit() {

  }

  async saveEncuesta(){
    console.log(JSON.stringify(this.preguntas))      
    this.apollo.mutate({      
      mutation: Query.agregarEncuesta,
      variables:{
        nombre: this.encuesta.get('nombre').value,
        descripcion: this.encuesta.get('descripcion').value,
        status: "borrador",
        encuesta: JSON.stringify(this.preguntas)
      },
      update: (proxy, {data: { agregarEncuesta}}) =>{ 
        const data: any = proxy.readQuery({query: Query.getEncuestas});
       
        console.log(agregarEncuesta)
        this.recursos.encuestas.push(agregarEncuesta) 
        this.encuestas=this.recursos.encuestas;   
        this.idEncuesta= agregarEncuesta.idencuesta
        proxy.writeQuery({query: Query.getEncuestas, data});
      }
    }).subscribe(({data})=>{
      this.router.navigateByUrl("/home")
    }, (error)=>{
      console.log("error", error);
    });    
    
  }


  addPregunta(){
    let item: any ={
      id:"",
      pregunta:"",
      tipo:"",
      opciones:""
    }
    let index
    try {
      index = +this.preguntas[this.preguntas.length-1].id
    index=index+1
    } catch (error) {
      index=1
    } 
    item.id=index
    item.pregunta=this.listFormGroup.get('pregunta').value;
    item.tipo=this.listFormGroup.get('tipo').value;
    item.opciones=this.opciones;     
    this.preguntas.push(item)
    this.listFormGroup.get('pregunta').setValue("")   
    this.listFormGroup.get('tipo').setValue("Text")  
    this.opciones=[]
  }

  addOpcion(){    
    let index
    try {
      index = +this.opciones[this.opciones.length-1].id
    index=index+1
    } catch (error) {
      index=1
    }  
    
    if(this.opciones.length+1<=5){
      this.opciones.push(
        {id:index,opcion:""}
      );
    }
    
  }

  onKey(event: any, opcion) { // without type info
    opcion.opcion = event.target.value;  
  }

  deleteOpcion(i){
    console.log(i.id)
    let index = this.opciones.findIndex(opciones => opciones.id === i.id)
    this.opciones.splice(index,1);
  }

  deletePregunta(pregunta){
    console.log(pregunta.id)
    let index = this.preguntas.findIndex(preguntas => preguntas.id === pregunta.id)
    this.preguntas.splice(index,1);
  }

  editPregunta(pregunta){
    this.isNew=false;
    this.isEdit=true;
    this.preguntaEdit=pregunta
    this.listFormGroup.get('pregunta').setValue(pregunta.pregunta) 
    this.listFormGroup.get('tipo').setValue(pregunta.tipo)
    this.opciones=pregunta.opciones 
  }
  
  editar(){
    let index = this.preguntas.findIndex(preguntas => preguntas.id === this.preguntaEdit.id)
    this.listFormGroup.get('tipo').value
    this.listFormGroup.get('pregunta').value
    let item: any ={
      id:"",
      pregunta:"",
      tipo:"",
      opciones:""
    }
    item.id=index
    item.pregunta=this.listFormGroup.get('pregunta').value;
    item.tipo=this.listFormGroup.get('tipo').value;
    item.opciones=this.opciones;

    this.preguntas[index]=item
    this.listFormGroup.get('pregunta').setValue("")   
    this.listFormGroup.get('tipo').setValue("Text") 
    this.opciones=[]
  }
}
