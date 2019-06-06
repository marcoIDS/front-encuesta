'use strict';

import gql from 'graphql-tag';

export const getEncuestas = gql`
{
    encuestas{
        nombre,
        descripcion,
        idencuesta, 
        status,
        encuesta
    }
}`;




 export const getEncuesta =  gql`
query {
    encuesta(id:Int){
        idencuesta,
        nombre,
        descripcion,
        status,
        encuesta
    }
}`; 


export const agregarEncuesta = gql`
mutation agregarEncuesta($nombre:String!,$descripcion:String!,$status:String!,$encuesta:JSON!){
  agregarEncuesta(nombre:$nombre,descripcion:$descripcion,status:$status,encuesta:$encuesta){
    nombre,
    descripcion,
    idencuesta,
    status,
    encuesta
  }
}`;

  
  
  export const eliminarEncuesta = gql`
  mutation eliminarEncuesta($id: Int!){
    eliminarEncuesta(id:$id){
      nombre,
      idencuesta,
      descripcion,
      status,
      encuesta
    }
  }`;

  export const updateEncuesta = gql`
  mutation updateEncuesta($idencuesta:Int!,$nombre:String!,$descripcion:String!,$status:String!,$encuesta:JSON!){
    updateEncuesta(idencuesta:$idencuesta,nombre:$nombre,descripcion:$descripcion,status:$status,encuesta:$encuesta){
      nombre,
      descripcion,
      idencuesta,
      status,
      encuesta
    }
  }`;