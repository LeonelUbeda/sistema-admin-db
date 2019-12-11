const syncFactura = 
`  create view vFactura as (
	select r.id as'id', fechaCreacion, fechaPago, total, anulada, ticketId, usuario, 
		clienteId, (c.nombre + ' ' + ISNULL(c.apellido, '')) as cliente,  count(s.id) as cantidadServicios
	from registro.registro as r 
	join registro.registrodetalle as rd on r.id = rd.id 
	join ticket.servicio as s on r.ticketId = s.id
	join cliente.cliente as c on clienteId = c.id
	where esFactura = 1
	group by r.id, fechaCreacion, fechaPago, total, anulada, ticketId, usuario, clienteId, c.nombre, c.apellido
  );`

const dropFactura =
`if exists(select 1 from sys.views where name='vFactura' and type='v')
drop view vFactura;
`

export { syncFactura, dropFactura }