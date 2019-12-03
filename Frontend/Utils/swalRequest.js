import {switchF} from "./functions.js"
import swal from 'sweetalert2'
import axios from 'axios'

const msjCrear = function (url, objeto) {
    return new Promise(
        function (resolve, reject) {
            procesando();
            axios.post(url, objeto)
                .then(({ status, data }) => {
                    swal.fire({
                        icon: 'success',
                        title: "Creado Correctamente",
                        showConfirmButton: true
                    })
                    resolve(data);
                })
                .catch((err) => {
                    console.log(err.response.status);
                    let texto = '';
                    texto = switchF(err.response.status);
                    swal.fire({
                        title: "Error",
                        text: texto,
                        icon: "error"
                    }).then(() => reject(err))
                })
        })
}

const msjEliminar = function (url/*, objeto*/) {
    return new Promise(
        function (resolve, reject) {
            swal.fire({
                title: 'Seguro que desea eliminar?',
                text: 'No habrá vuelta atrás! :c',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'No',
                confirmButtonText: 'Si',
                showLoaderOnConfirm: true,
                preConfirm(login) {
                    return axios.delete(url /*, objeto*/)
                        .then((res) => {
                            return res
                        }).catch((err) => {
                            
                            return err
                        })
                }
            }).then(({ value , dismiss}) => {
                
                if(typeof dismiss == 'undefined'){
                    if (value.hasOwnProperty('response')) {
                        throw value
                    }
                    //const { status, data } = respuesta.value

                    swal.fire({
                        icon: 'success',
                        title: "Actualizado correctamente",
                        text: 'Tus datos han sido actualizados',
                        showConfirmButton: true
                    })
                    .then(() => resolve())
                }
<<<<<<< HEAD
=======
                const { status, data } = value;

                swal.fire({
                    icon: 'success',
                    title: "Eliminado correctamente",
                    text: 'Tus datos han sido eliminados',
                    showConfirmButton: true
                })
                resolve(data);
>>>>>>> f9687230634de37c39edfbc861b10630920deb8e
            }).catch((err) => {
                /*if (err.hasOwnProperty('value')) {
                    err = err.value;
                }
                console.log(err.response.status)
                let texto = '';
                texto = switchF(err.response.status)   */
                swal.fire({
                    title: 'Error', 
                    text: 'Prueba',
                    icon: 'error'
                }).then(() => reject(/*err*/))
            })
        })
}

const msjActualizar = function (url, objeto) {
    return new Promise(
        function (resolve, reject) {
            swal.fire({
                title: 'Actualizar?',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'No',
                confirmButtonText: 'Si',
                showLoaderOnConfirm: true,
                preConfirm(login) {
                    return axios.put(url, objeto)
                        .then((res) => {
                            return res
                        }).catch((err) => {
                            console.log(err);
                            return err
                        })
                }
            }).then(({ value }) => {

                if (value.hasOwnProperty('response')) {
                    throw value;
                }
                const { status, data } = value;

                swal.fire({
                    icon: 'success',
                    title: "Actualizado correctamente",
                    text: 'Tus datos han sido actualizados',
                    showConfirmButton: true
                })
                resolve(data);
            }).catch((err) => {

                if (err.hasOwnProperty('value')) {
                    err = err.value;
                }
                console.log(err.response.status);
                let texto = '';
                texto = switchF(err.response.status);
                swal.fire({
                    title: "Error",
                    text: texto,
                    icon: "error"
                }).then(() => reject(err))
            })
        })
}

export { msjActualizar, msjCrear, msjEliminar }