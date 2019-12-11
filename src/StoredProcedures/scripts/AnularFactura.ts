const syncAnularFactura = 
`create procedure registro.anularFactura
@id int
AS
SET NOCOUNT ON;  
update registro.registrodetalle set anulada = 1 where id = @id
select @@ROWCOUNT as cantidad
`

const dropAnularFactura =
`IF EXISTS ( SELECT * 
	FROM   sysobjects 
	WHERE  id = object_id(N'registro.anularFactura') 
		   and OBJECTPROPERTY(id, N'IsProcedure') = 1 )
BEGIN
DROP PROCEDURE registro.anularFactura
END
`

export { syncAnularFactura, dropAnularFactura }