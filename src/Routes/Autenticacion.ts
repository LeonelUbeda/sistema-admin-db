import {Router, Response, Request} from 'express'
import jwt from 'jsonwebtoken'
const router = Router();


// -------------------- Controladores -------------------- 
import {usuarioLogin} from '../Controllers/autorizacion.controller'




// -------------------- Rutas de autenticación -------------------- 

router.post('/login', async (req: Request, res: Response) => {
    const { usuario, contrasena } = req.body
    try {
        const resultado: any = await usuarioLogin(usuario, contrasena)
        const resultadoLimpio = JSON.parse(JSON.stringify(resultado))
        if(resultado.usuario){
            let token = jwt.sign( {data: resultadoLimpio } , process.env.SECRET_KEY_JWT, { expiresIn: process.env.JWT_EXPIRES_IN });
            res.set('Auth', token).json(token)
        }else {

        }
    } catch (error) {
        console.log(error)
        res.status(400).send('NEL')
    }
})

router.get('/inicio', (req: Request, res: Response) => {
    try {
        const token = req.get('Auth')
        const resultado = jwt.verify(token, process.env.SECRET_KEY_JWT )

        res.send(resultado)
    } catch (error) {
        res.send('MAL')
    }

})



router.get('/verificar', (req: Request, res: Response) => {
    try {
        let cookie = typeof req.get('Auth') == 'undefined' ? req.cookies.JWT : req.get('Auth')
        const resultado: any = jwt.verify(cookie, process.env.SECRET_KEY_JWT)
        res.status(200).send('OK')
    } catch (error) {
        res.status(400).send('NO')
    }
})

router.get('/sesionpermisos', (req: Request, res: Response) => {
    try {
        let cookie = typeof req.get('Auth') == 'undefined' ? req.cookies.JWT : req.get('Auth')
        const resultado: any = jwt.verify(cookie, process.env.SECRET_KEY_JWT)
        if(resultado.data.usuario == 'admin'){
            res.json({Admin: true})
        }else{
            res.json(resultado.data.Rol)
        }
        
    } catch (error) {
        
    }
})

export default router