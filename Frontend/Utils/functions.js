const switchF = function (error) {
    texto = '';
    switch (error) {

        case 400: {

            texto = 'Ha ocurrido un error, verifique sus datos e intentelo mas tarde.'

            break;
        }
        case 401: {

            texto = 'Inicie Sesion e intentelo mas tarde.'

            break;
        }
        case 403: {

            texto = 'Su usuario no tiene acceso.'

            break;
        }
        case 404: {

            texto = 'Ha ocurrido un error, intentelo mas tarde.'

            break;
        }
    }
    return texto;

}

const procesando = function () {
    swal.fire({
        title: 'Procesando',
        onBeforeOpen: () => {
            swal.showLoading()
        }
    })
}