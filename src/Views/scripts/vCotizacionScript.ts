const syncCotizacion = 
`create view vCotizacion as (
	select r.id as'id', fechaCreacion, validoHasta = DATEADD(DAY, 30, fechaCreacion), total, ticketId, usuario, 
		clienteId, (c.nombre + ' ' + ISNULL(c.apellido, '')) as cliente, count(s.id) as cantidadServicios
	from registro.registro as r 
	join registro.registrodetalle as rd on r.id = rd.id 
	join ticket.servicio as s on r.ticketId = s.id
	join cliente.cliente as c on clienteId = c.id
	where esFactura = 0
	group by r.id, fechaCreacion, total, ticketId, usuario, clienteId, c.nombre, c.apellido
  );
`

const dropCotizacion =
`if exists(select 1 from sys.views where name='vCotizacion' and type='v')
drop view vCotizacion;
`

export { syncCotizacion, dropCotizacion }