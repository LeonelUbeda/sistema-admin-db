import {Router, Response, Request} from 'express'
const router = Router();
import jwt from 'jsonwebtoken'
import manejadorGenerico from '../../Controllers/manejadorGenerico'
import Usuario from '../../Models/Usuario/Usuario';

// -------------------- Controladores --------------------
import {usuarioNuevo, usuarioActualizar} from '../../Controllers/Usuario/usuario.controller'


// -------------------- Utils --------------------
import encriptar from '../../utils/encriptar'
import { Rol, Permiso } from '../../Models/Usuario/RolPermiso';

// -------------------- Rutas Usuario --------------------

router.get('/',         manejadorGenerico({modelo: Usuario,     accion: manejadorGenerico.LEER, 
    include: [{
        model: Rol
    }]
    
}))

router.get('/:nombre',  manejadorGenerico({modelo: Usuario,     accion: manejadorGenerico.LEER_PARAMETROS}))

router.get('/:nombre/info', manejadorGenerico({
    modelo: Usuario,
    accion: manejadorGenerico.LEER_PARAMETROS,
    include: [{
        model: Rol,
        include: [{
            model: Permiso,
            through: {
                attributes: ['nivelAcceso']
            }
        }]
    }]
}))

// Crear nuevo Usuario.     Obligatorio: usuario, nombre, rolId.    Opcional: apellido
router.post('/', async (req: Request, res: Response) => {
    let {contrasena, usuario, ...elemento} = req.body

    usuario = usuario ? usuario.toLowerCase() : null
    contrasena = contrasena ? encriptar(contrasena) : null

    try {
        const resultado = await usuarioNuevo({ contrasena , usuario , ...elemento})
        res.status(201).json(resultado)
    } catch (error) {
        res.status(400).json({mensaje: 'Error'})
    }
})


// Actualizar un usuario.   Obligatorio: usuario     Opcional: campos a actualizar
router.put('/:usuario', async (req: Request, res: Response) => {
    let {contrasena, ...elemento} = req.body;
    const {usuario} = req.params

    let objetoAMandar = {
        ...elemento
    }
    // Si en el body del request existe contraseña entonces se añade la propiedad contraseña
    // y su respectivo valor al objeto objetoAMandar
    if(typeof contrasena !== 'undefined'){
        objetoAMandar.contrasena = contrasena ? encriptar(contrasena) : null
    }
    try {
        let cookie = typeof req.get('Auth') == 'undefined' ? req.cookies.JWT : req.get('Auth')
        const resultadoJWT: any = jwt.verify(cookie, process.env.SECRET_KEY_JWT)
        // Si el usuario que solicita modificar es el mismo que esta en el token 
        //(o mejor dicho, el que esta en la sesion), entonces...
        // O si el de la sesion es el usuario admin...
        if(usuario == resultadoJWT.data.usuario || resultadoJWT.data.usuario == 'admin'){
            const resultado = await usuarioActualizar(objetoAMandar, {usuario})
            res.status(201).json(resultado)
        }else{
            throw 'Se esta intentando editar un usuario sin los permisos suficientes'
        }
        
        
    } catch (error) {
        console.log(error)
        res.status(400).json({mensaje: 'Error'})
    }
})



router.delete('/:usuario', manejadorGenerico({modelo: Usuario, accion: manejadorGenerico.ELIMINAR_POR_PARAMETROS}))


export default router