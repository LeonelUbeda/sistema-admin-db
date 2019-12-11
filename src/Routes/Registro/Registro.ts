import {Router, Response, Request} from 'express'

const router = Router();
import manejadorGenerico from '../../Controllers/manejadorGenerico'

import Registro from '../../Models/Registro/Registro'
import RegistroDetalle from '../../Models/Registro/RegistroDetalle'
import vFactura from '../../Views/vFactura'
import vCotizacion from '../../Views/vCotizacion'
import database from '../../Database/database';


// Ruta generica para buscar roles

const anularFactura = async ( id ) => {
    try {
        const respuesta = await database.query(`EXEC registro.anularFactura @id= ${id}`)
        return respuesta[0]
    }
    catch (error) {
        throw error
    }
}


router.get('/factura/', manejadorGenerico({modelo: vFactura,            accion: manejadorGenerico.LEER}))
router.get('/factura/:id',  manejadorGenerico({modelo: vFactura,        accion: manejadorGenerico.LEER_POR_ID}))

router.get('/cotizacion/', manejadorGenerico({modelo: vCotizacion,            accion: manejadorGenerico.LEER}))
router.get('/cotizacion/:id',  manejadorGenerico({modelo: vCotizacion,        accion: manejadorGenerico.LEER_POR_ID}))

router.get('/',         manejadorGenerico({modelo: Registro,     accion: manejadorGenerico.LEER}))
router.get('/:id',      manejadorGenerico({modelo: Registro,     accion: manejadorGenerico.LEER_POR_ID}))

router.post('/',        manejadorGenerico({modelo: Registro,     accion: manejadorGenerico.CREAR_INCLUDE, 
    include: [
        {
            model: RegistroDetalle
        }
    ]}))

router.put('/:id',   async (req: Request, res: Response) => {
    const {id} = req.params

    try {
        const respuesta = await anularFactura( id )
        res.status(201).json(respuesta[0])
    }
    catch {
        res.status(400).json({mensaje: 'Error en stored procedure'})
    }
    
})


export default router