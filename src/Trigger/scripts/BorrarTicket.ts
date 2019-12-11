const syncBorrarTicket = 
`CREATE TRIGGER ticket.BorrarTicket
ON ticket.ticketservicio
AFTER DELETE
AS
begin
	declare @tid as int,
			@numS as int

	set @tid=(select ticketId  from deleted)
	select @numS=COUNT(id) from ticket.ticketservicio where ticketId=@tid;
	if @numS = 0
		delete from ticket.Ticket where id = @tid
end
`

const dropBorrarTicket =
`IF EXISTS (SELECT * FROM sys.objects WHERE [name] = N'BorrarTicket' AND [type] = 'TR')
BEGIN
      DROP TRIGGER [ticket].BorrarTicket;
END;
`

export { syncBorrarTicket, dropBorrarTicket }