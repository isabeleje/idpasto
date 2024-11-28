import { Router } from 'express';
import DB from '../models/db.js';


const router = Router();





/**
 * Route to list records based on custom sql query
 * @GET /categoris
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'],  async (req, res) => {
	try{
		let sqltext = `SELECT  trabajadores.idusuario, trabajadores.pin, trabajadores.cedula, trabajadores.nombres, trabajadores.apellidos, trabajadores.cargo, trabajadores.grupo_sanguineo, trabajadores.foto, trabajadores.observaciones, trabajadores.estado, trabajadores.categoria_id, trabajadores.dependencia_id, trabajadores.subdependencia_id, trabajadores.contrasena, trabajadores.email, trabajadores.usuario, trabajadores.user_role_id, trabajadores.date_created, trabajadores.date_updated, trabajadores.estadocarnet FROM trabajadores` ;
		let records = await DB.rawQueryList(sqltext);
		let recordCount = records.length;
		let totalRecords = record_count;
		let totalPages = 1;
		let data = {
			totalRecords,
			recordCount,
			totalPages,
			records
		}
		return res.ok(data);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
