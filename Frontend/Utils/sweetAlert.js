import Swal from 'sweetalert2';
import axios from 'axios'

function SwalEliminadoMensaje(){
  return Swal.fire({
    title: 'Se ha eliminado correctamente!',
    text: 'Ten cuidado con lo que borras :(',
    icon: 'success',
  })
}

function SwalNoEliminadoMensaje(){
  return Swal.fire({
    title: 'Ha ocurrido un error!',
    text: 'Verifica los datos e intentalo mas tarde :c',
    icon: 'error',
  })
  
}

export const eliminarDialog = (url) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: 'Seguro que desea eliminar?',
      text: 'No habrá vuelta atrás!',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      //showLoaderOnConfirm: true,
    })
    .then((respuesta) => {
      // Si dieron en el boton de si
      if(respuesta.value){
        axios.delete(url)
        .then((respuestaServer) => {
          if(respuestaServer.status === 200){
            SwalEliminadoMensaje().then(() => resolve(respuestaServer))
          }else{
            SwalNoEliminadoMensaje().then(() => reject(respuestaServer))
          }
        })
        .catch((error) => {
          SwalNoEliminadoMensaje().then(() => reject(error))
        })
      }
    })
    .catch((error) => {
      reject(error)
    })
  })
}



export const alertaEliminar = (url) => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: 'Seguro que desea eliminar?',
      text: 'No habrá vuelta atrás!',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      showLoaderOnConfirm: true,
      showCancelButton: true,
      preConfirm: () => {
          return axios.delete(url).then(respuesta => {
            if(respuesta.status === 200){
                return respuesta
            }else{
              throw new Error('Ha ocurrido un error')
            }
          }).catch((error) => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
            reject('Nel')
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.value) {
      Swal.fire({
          title: 'Eliminado satisfactoriamente!',
          icon: 'success'
      })
    }
  })
  }) 
    
}
/*
Swal.fire({
    title: 'Submit your Github username',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.value) {
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url
      })
    }
  })*/