
// Componentes "seccion"
import Inicio from '../Sections/Inicio'
import Login from '../Sections/Login'
import Cliente from '../Sections/Cliente'
import Clasificacion from '../Sections/Clasificacion'
import Roles from '../Sections/Roles'
import Servicio from '../Sections/Servicio'
import Usuario from '../Sections/Usuario'
import Ticket from '../Sections/Ticket'
import EditarContra from '../Sections/EditarInfo'
// Cada objeto es una ruta, se le pasa un componente, una url y el nombre :D
export default [
    {
        path: '/inicio',
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
        path: '/clasificacion',
        component: Clasificacion,
        name: 'clasificacion'
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
        path: '/ticket',
        component: Ticket,
        name: 'ticket'
    },
    {
        path: '/Editar',
        component: EditarContra,
        name: 'EditarContra'
    }

]