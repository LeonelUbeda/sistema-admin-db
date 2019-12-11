export const esAdmin = function(Permisos){
    if(Permisos.hasOwnProperty('admin')){
        return Permisos.admin
    }else{
        return false
    }
}


export const tieneAcceso = function(Permisos, Seccion, minimoRequerido){
    for(let permiso in Permisos){
        if(permiso.toLowerCase() == Seccion.toLowerCase()){
            return Permisos[Seccion] >= minimoRequerido ? true : false
        }
    }
    return false
    
}