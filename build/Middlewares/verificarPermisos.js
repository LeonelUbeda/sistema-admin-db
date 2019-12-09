"use strict";
/**
 * @param nombreSeccion
 * Nombre de la seccion para verificar el permiso
 * @param nivelDeAccesoRequerido
 * Nivel de acceso requerido para ejecutar la acción
 */
Object.defineProperty(exports, "__esModule", { value: true });
// Esta funcion revisa si el usuario tiene los permisos para acceder a la seccion. Si los permisos no son suficientes, se mandará
// el mensaje 'Sin autorizacion'.
// Si el usuario no tienen ningun permiso asignado sobre la sección, osea que permisoEspecifico no existe, entonces de igual forma
// se mandará el mensaje 'Sin autorizacion'
const verificarPermiso = (nombreSeccion, nivelDeAccesoRequerido) => {
    return (req, res, next) => {
        try {
            // Almacena todos los permisos del objeto tokenDecifrado que me lo pasó el middleware verificarLogin
            const permisoTodos = res.locals.tokenDecifrado.data.Rol.Permisos;
            // Busca entre el arreglo de permisos, el permiso que tenga la propiedad nombre y sea igual a nombreSección
            const permisoEspecifico = permisoTodos.find((seccion) => {
                return seccion.nombre.toLowerCase() === nombreSeccion.toLowerCase();
            });
            // Busca del objeto permisoEspecifico la propiedad nivelAcceso y la almaceno en nivelDeAcceso
            const nivelDeAccesoUsuario = permisoEspecifico.RolPermiso.nivelAcceso;
            // Si el nivel de acceso requerido es mayor o igual que el del usuario...
            if (nivelDeAccesoUsuario >= nivelDeAccesoRequerido) {
                next();
            }
            else {
                throw 'Sin autorizacion';
            }
        }
        catch (error) {
            res.status(403).send('Sin autorizacion');
        }
    };
};
exports.default = verificarPermiso;
//# sourceMappingURL=verificarPermisos.js.map