create procedure ticket.generarTicket
	@cotizacionId int,
	@autoId int
AS
	SET NOCOUNT ON;  
	DECLARE @clienteID int,
			@ticketID int,
			@precio float,
			@servicioId int;

  	SELECT @clienteID=clienteId from ventas.cotizacion where id = @cotizacionId;

	INSERT INTO ticket (vehiculoId, clienteId) values ( @autoId, @clienteID );

	set @ticketID = SCOPE_IDENTITY();

	declare cur CURSOR LOCAL for
		select precio, servicioId from [ventas].[cotizacionservicio] where cotizacionId = @cotizacionId;

	open cur;

	fetch next from cur into @precio, @servicioId

	while @@FETCH_STATUS = 0 BEGIN

		insert into ticket.ticketservicio (ticketId, servicioId, precio) values (@ticketID, @servicioId, @precio)

		fetch next from cur into @precio, @servicioId
	END

	close cur
	deallocate cur
	
	DELETE FROM ventas.cotizacion where id = @cotizacionId
GO