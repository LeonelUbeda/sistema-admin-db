import {Router} from 'express'
const router = Router();

// -------------------- Controladores --------------------
import manejadorGenerico from '../../Controllers/manejadorGenerico';

// -------------------- Modelos --------------------
import TicketServicio from '../../Models/Ticket/TicketServicio';



router.get('/', manejadorGenerico({modelo: TicketServicio, accion: manejadorGenerico.LEER}))

router.post('/', manejadorGenerico({modelo: TicketServicio, accion: manejadorGenerico.CREAR}))

// api/ticketservicio/ticket/2/servicio/6
router.put('/ticket/:ticketId/servcio/:ticketId', manejadorGenerico({modelo: TicketServicio, accion: manejadorGenerico.ACTUALIZAR_POR_PARAMETROS}))

router.delete('/ticket/:ticetId/servicio/:ticketId', manejadorGenerico({modelo: TicketServicio, accion: manejadorGenerico.ELIMINAR_POR_PARAMETROS}))


// api/ticketservicio/ticket/2
// Por si se quiere borrar todos los registros que conincidan con el rolId
router.delete('/ticket/:ticketId', manejadorGenerico({modelo: TicketServicio, accion: manejadorGenerico.ELIMINAR_POR_PARAMETROS}) )

// api/ticketservicio/servicio/6
// Lo mismo que arriba
router.delete('/servicio/:servicioId', manejadorGenerico({modelo: TicketServicio, accion: manejadorGenerico.ELIMINAR_POR_PARAMETROS}))




export default router