
// Componentes "seccion"
import Inicio from '../Sections/Inicio'
import Login from '../Sections/Login'
import Cliente from '../Sections/Cliente'
import Vehiculo from '../Sections/Vehiculo'
import Roles from '../Sections/Roles'
import Servicio from '../Sections/Servicio'
import Usuario from '../Sections/Usuario'
<<<<<<< HEAD
import Ticket from '../Sections/Ticket'
=======
import EditarContra from '../Sections/EditarInfo'
>>>>>>> dc2c29f721b96cc8ad1f8a8afc10a23983d535df
// Cada objeto es una ruta, se le pasa un componente, una url y el nombre :D
export default [
    {
        path: '/',
        component: Inicio,
        name: 'inicio'
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/clientes',
        component: Cliente,
        name: 'cliente'
    },
    {
        path: '/vehiculos',
        component: Vehiculo,
        name: 'vehiculo'
    },
    {
        path: '/roles',
        component: Roles,
        name: 'roles'
    },
    {
        path: '/servicios',
        component: Servicio,
        name: 'servicio'
    },
    {
        path: '/usuario',
        component: Usuario,
        name: 'usuario'
    },
    {
<<<<<<< HEAD
        path: '/ticket',
        component: Ticket,
        name: 'cotizacions'
    },
=======
        path: '/Editar',
        component: EditarContra,
        name: 'EditarContra'
    }
>>>>>>> dc2c29f721b96cc8ad1f8a8afc10a23983d535df

]