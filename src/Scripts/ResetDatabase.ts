import dotenv from 'dotenv'
dotenv.config()

import database from './../Database/database';

import Ticket from '../Models/Ticket/Ticket';
import Servicio from '../Models/Servicio/Servicio';
import TicketServicio from '../Models/Ticket/TicketServicio';
import Vehiculo from '../Models/Vehiculo/Vehiculo';
import Categoria from '../Models/Servicio/Categoria';
import { Permiso, Rol, RolPermiso } from '../Models/Usuario/RolPermiso';
import Usuario from '../Models/Usuario/Usuario';
import Marca from '../Models/Vehiculo/Marca';
import Version from '../Models/Vehiculo/Version';
import Modelo from '../Models/Vehiculo/Modelo';
import Tipo from '../Models/Vehiculo/Tipo';
import Factura from '../Models/Factura/Factura';
import Cotizacion from '../Models/Cotizacion/Cotizacion';
import Cliente from '../Models/Cliente';
import Telefono from '../Models/Telefono';
 

async function sync(){
    await Cliente.sync({force: true})
    await Telefono.sync({force: true})
    await Permiso.sync({force: true})
    await Rol.sync({force: true})
    await RolPermiso.sync({force: true})
    await Usuario.sync({force: true})
    await Marca.sync({force: true})
    await Modelo.sync({force: true})
    await Tipo.sync({force: true})
    await Version.sync({force: true})
    await Vehiculo.sync({force: true})
 
    await Categoria.sync({force: true})
    await Servicio.sync({force: true})
    await Ticket.sync({force: true})
    await TicketServicio.sync({force: true})
    
}

sync()
