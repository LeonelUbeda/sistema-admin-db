let ClienteDatos = [
    {nombre: 'Ricardo' ,    apellido: 'Macario',   direccion: 'Casita Numero 1' },
    {nombre: 'Juancho' ,    apellido: 'Ruiz',      direccion: 'Casita Numero 2' },
    {nombre: 'Luis' ,       apellido: 'Miguel',    direccion: 'Casita Numero 3' },
    {nombre: 'Jose' ,       apellido: 'Parrales',  direccion: 'Casita Numero 4' },
    {nombre: 'Simon' ,      apellido: 'Pedro',     direccion: 'Casita Numero 5' },
]





let MarcaAutos = [
    {nombre: 'Mercedes Benz'},
    {nombre: 'Toyota'       },
    {nombre: 'Suzuki'       },
    {nombre: 'Chevrolet'    },
    {nombre: 'Mazda'        },
    {nombre: 'Audi'         },
    {nombre: 'BMW'          },
    {nombre: 'Mitsubishi'   },
    {nombre: 'Porsche'      }
]


let ModeloAutos = [
    {nombre: 'Corolla' ,   marcaId: 2},
    {nombre: 'Prado' ,     marcaId: 2},
    {nombre: 'Modelo 1' , marcaId: 1},
    {nombre: 'Modelo 1' , marcaId: 1},
    {nombre: 'Modelo 1' , marcaId: 1},
    {nombre: 'Modelo 1' , marcaId: 1},
    {nombre: 'Modelo 1' , marcaId: 1},
    {nombre: 'Modelo 1' , marcaId: 1},
    {nombre: 'Modelo 1' , marcaId: 1},
    {nombre: 'Modelo 1' , marcaId: 1},
]

let VersionDatos = [
    {nombre: '2008', modeloId: 1},
    {nombre: '2009', modeloId: 1},
    {nombre: '2010', modeloId: 1},
    {nombre: '2011', modeloId: 1},
    {nombre: '2008', modeloId: 2},
    {nombre: '2009', modeloId: 2},
    {nombre: '2010', modeloId: 2},
    {nombre: '2011', modeloId: 2},
    {nombre: '2008', modeloId: 3},
    {nombre: '2008', modeloId: 4},
    {nombre: '2008', modeloId: 5},
]


let TipoDatos = [
    {nombre: 'Automovil'},
    {nombre: 'Camion'},
    {nombre: 'Moto'},
    {nombre: 'Camioneta'}
]

let VehiculosDatos = [
    {clienteId: 1, versionId: 2, matricula: 'M8985-1254', tipoId: 1},
    {clienteId: 2, versionId: 5, matricula: 'M1227-8542', tipoId: 1},
    {clienteId: 3, versionId: 3, matricula: 'M1251-1223', tipoId: 1},
    {clienteId: 1, versionId: 1, matricula: 'M8985-5542', tipoId: 1},
    {clienteId: 1, versionId: 7, matricula: 'M8985-2222', tipoId: 1},
]


let CategoriaServiciosDatos = [
    {nombre: 'Motor'},
    {nombre: 'Llantas'},
    {nombre: 'Chapisteria'},
    {nombre: 'Mantenimiento'}
]

let ServiciosDatos = [
    {nombre: 'Cambio de aceite', descripcion: 'Se le cambia el aceite',categoriaId: 1 },
    {nombre: 'Reparacion de bandas', descripcion: 'Se le reparan las bandas que sean requeridas',categoriaId: 1},
    {nombre: 'Reparacion de parte chocada', descripcion: 'Se le reparan las partes que esten afectadas por un choque', categoriaId: 2},
    {nombre: 'Cambio de aceite', descripcion: 'Se le cambia el aceite',categoriaId: 1 },
]

let SeccionesDatos = [
    {nombre: 'Tickets'},
    {nombre: 'Clientes'},
    {nombre: 'Clasificacion'},
    {nombre: 'Servicios'}
]

let RolDatos = [
    {nombre: 'Mecanico'}
]


let UsuariosDatos = [
    {nombre: 'admin', usuario: 'admin', contrasena: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'},
    {nombre: 'Mecanico', usuario: 'mecanico', contrasena: '58a079806b1d6210a928b004237cea21e998e879dad7d342667471cb8ac07bb8'}
]




// -------------------- Modelos --------------------
import Cliente from '../Models/Cliente'

// -------------------- Datos de prueba --------------------
import Marca from '../Models/Vehiculo/Marca';
import Modelo from '../Models/Vehiculo/Modelo';
import Version from '../Models/Vehiculo/Version';
import Tipo from '../Models/Vehiculo/Tipo';
import Vehiculo from '../Models/Vehiculo/Vehiculo';
import Servicio from '../Models/Servicio/Servicio';
import Categoria from '../Models/Servicio/Categoria';
import Usuario from '../Models/Usuario/Usuario';
import { Permiso, Rol } from '../Models/Usuario/RolPermiso';

async function sync(){
    try {
        await Cliente.bulkCreate(ClienteDatos)
        await Marca.bulkCreate(MarcaAutos)
        await Modelo.bulkCreate(ModeloAutos)
        await Version.bulkCreate(VersionDatos)
        await Tipo.bulkCreate(TipoDatos)
        await Categoria.bulkCreate(CategoriaServiciosDatos)
        await Vehiculo.bulkCreate(VehiculosDatos)
        await Servicio.bulkCreate(ServiciosDatos)
        await Usuario.bulkCreate(UsuariosDatos)
        await Permiso.bulkCreate(SeccionesDatos)
        await Rol.bulkCreate(RolDatos)
    } catch (error) {
        console.log(error)
    }
}

sync();
