
// Componentes "seccion"
import Inicio from '../Sections/Inicio'
import Login from '../Sections/Login'
import Cliente from '../Sections/Cliente'
import Marca from '../Sections/Marca'
import Roles from '../Sections/Roles'
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
        path: '/cliente',
        component: Cliente,
        name: 'cliente'
    },
    {
        path: '/marca',
        component: Marca,
        name: 'marca'
    },
    {
        path: '/roles',
        component: Roles,
        name: 'roles'
    }
]