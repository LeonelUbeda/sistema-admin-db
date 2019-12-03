<<<<<<< HEAD
const switchF = function (error) {
    let texto = '';
=======
export const switchF = function (error) {
    texto = '';
>>>>>>> 89c617d1a0c71265b0a14abdc1257c62776fa1f8
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