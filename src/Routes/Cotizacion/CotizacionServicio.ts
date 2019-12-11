import {Router} from 'express'
const router = Router();

// -------------------- Controladores --------------------
import manejadorGenerico from '../../Controllers/manejadorGenerico';

// -------------------- Modelos --------------------
import CotizacionServicio from '../../Models/Cotizacion/CotizacionServicio';



router.get('/', manejadorGenerico({modelo: CotizacionServicio, accion: manejadorGenerico.LEER}));

router.post('/', manejadorGenerico({modelo: CotizacionServicio, accion: manejadorGenerico.CREAR}));


router.put('/cotizacion/:cotizacionId/servicio/:servicioId', manejadorGenerico({modelo: CotizacionServicio, accion: manejadorGenerico.ACTUALIZAR_POR_PARAMETROS}))

router.delete('/cotizacion/:cotizacionId/servicio/:servicioId', manejadorGenerico({modelo: CotizacionServicio, accion: manejadorGenerico.ELIMINAR_POR_PARAMETROS}))



// Por si se quiere borrar todos los registros que conincidan con el rolId
router.delete('/cotizacion/:cotizacionId', manejadorGenerico({modelo: CotizacionServicio, accion: manejadorGenerico.ELIMINAR_POR_PARAMETROS}) )


// Lo mismo que arriba
router.delete('/servicio/:servicioId', manejadorGenerico({modelo: CotizacionServicio, accion: manejadorGenerico.ELIMINAR_POR_PARAMETROS}))




export default router