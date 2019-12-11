const syncTotales = 
`create view ticket.vTotalesTicket as (
	select t.id as 'ID', sum(s.precio )'TOTAL' from ticket.ticketservicio as t join ticket.ticketservicio s on t.id = s.ticketId group by t.id
	);
`

const dropTotales =
`if exists(select 1 from sys.views where name='vTotalesTicket' and type='v')
drop view ticket.vTotalesTicket;
`

export { syncTotales, dropTotales }