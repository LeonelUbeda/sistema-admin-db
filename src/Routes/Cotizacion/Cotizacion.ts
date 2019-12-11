import {Router} from 'express'

const router = Router();


// -------------------- Controladores --------------------
import manejadorGenerico from '../../Controllers/manejadorGenerico';
import Cotizacion from '../../Models/Cotizacion/Cotizacion';
import Servicio from '../../Models/Servicio/Servicio';






router.get('/', manejadorGenerico({modelo: Cotizacion, accion: manejadorGenerico.LEER}))
router.get('/:id', manejadorGenerico({modelo: Cotizacion, accion: manejadorGenerico.LEER_POR_ID}))
router.post('/', manejadorGenerico({modelo: Cotizacion, accion: manejadorGenerico.CREAR}))
router.put('/:id', manejadorGenerico({modelo: Cotizacion, accion: manejadorGenerico.ACTUALIZAR_POR_ID}))
router.delete('/:id', manejadorGenerico({modelo: Cotizacion, accion: manejadorGenerico.ELIMINAR_POR_ID})) 


router.get('/:id/servicios', manejadorGenerico({
    modelo: Cotizacion, 
    accion: manejadorGenerico.LEER_PARAMETROS, 
    include: [{
        model: Servicio, 
        through: { attributes: ['precio'] }
    }]
}))

export default router;