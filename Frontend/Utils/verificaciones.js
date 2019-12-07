export const esAdmin = function(Permisos){
    if(Permisos.hasOwnProperty('admin')){
        return Permisos.admin
    }else{
        return false
    }
}


export const tieneAcceso = function(Permisos, Seccion, minimoRequerido){
    if(Permisos.hasOwnProperty(Seccion)){
        return Permisos[Seccion] >= minimoRequerido ? true : false
    }else{
        return false
    }
}