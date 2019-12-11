import {Router, Response, Request} from 'express'
const router = Router();


// -------------------- Modelos --------------------
import Cliente from '../../Models/Cliente'

// -------------------- Datos de prueba --------------------
import {ClienteDatos, MarcaAutos, ModeloAutos, VersionDatos, SeccionesDatos, RolDatos, TipoDatos, VehiculosDatos, UsuariosDatos, CategoriaServiciosDatos, ServiciosDatos} from './Datos genericos'
import Marca from '../../Models/Vehiculo/Marca';
import Modelo from '../../Models/Vehiculo/Modelo';
import Version from '../../Models/Vehiculo/Version';
import Tipo from '../../Models/Vehiculo/Tipo';
import Vehiculo from '../../Models/Vehiculo/Vehiculo';
import Servicio from '../../Models/Servicio/Servicio';
import Categoria from '../../Models/Servicio/Categoria';
import Usuario from '../../Models/Usuario/Usuario';
import { Permiso, Rol } from '../../Models/Usuario/RolPermiso';




router.get('/crear', async (req: Request, res: Response) => {
    await Cliente.bulkCreate(ClienteDatos)
    await Marca.bulkCreate(MarcaAutos)
    await Modelo.bulkCreate(ModeloAutos)
    await Version.bulkCreate(VersionDatos)
    await Tipo.bulkCreate(TipoDatos)
    await Vehiculo.bulkCreate(VehiculosDatos)
    await Categoria.bulkCreate(CategoriaServiciosDatos)
    await Servicio.bulkCreate(ServiciosDatos)
    await Usuario.bulkCreate(UsuariosDatos)
    await Permiso.bulkCreate(SeccionesDatos)
    await Rol.bulkCreate(RolDatos)
    res.send('CREADO')
})




export default router