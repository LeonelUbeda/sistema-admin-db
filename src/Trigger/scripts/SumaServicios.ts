const syncSumaServicios = 
`create TRIGGER Registro.SumaServicios
ON registro.registro
AFTER  INSERT
AS
begin
SET NOCOUNT ON
declare @id as int , @numFac as int
	set @id=(select ticketId  from inserted)
	set @numFac=(select id from inserted)
	update registro.registro set total = ( select total from ticket.vTotalesTicket where id = @id ) where id = @numFac
end
`

const dropSumaServicios =
`IF EXISTS (SELECT * FROM sys.objects WHERE [name] = N'SumaServicios' AND [type] = 'TR')
BEGIN
      DROP TRIGGER [registro].sumaservicios;
END;
`

export { syncSumaServicios, dropSumaServicios }