const syncMarcarFinalizado = 
`CREATE TRIGGER ticket.MarcarFinalizado
ON ticket.ticketservicio
AFTER  UPDATE, INSERT, DELETE
AS
begin
	declare @tid as int,
			@numS as int,
			@numC as int

	set @tid=(select ticketId  from inserted)
	select @numS=COUNT(id), @numC = (0+sum(cast(terminado as int))) from ticket.ticketservicio where ticketId=@tid;
	if @numS > 0 and @numC = @numS
		update ticket.Ticket set fechaFinal = GETDATE() where id = @tid
	else
		update ticket.Ticket set fechaFinal = null where id = @tid
end
`

const dropMarcarFinalizado =
`IF EXISTS (SELECT * FROM sys.objects WHERE [name] = N'MarcarFinalizado' AND [type] = 'TR')
BEGIN
      DROP TRIGGER [ticket].MarcarFinalizado;
END;
`

export { syncMarcarFinalizado, dropMarcarFinalizado }