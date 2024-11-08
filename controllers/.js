import { Router } from 'express';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list records based on custom sql query
 * @GET /
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'],  async (req, res) => {
	try{
		let sqltext = `SELECT  trabajadores.cedula, trabajadores.nombres, trabajadores.apellidos, trabajadores.cargo, trabajadores.estadocarnet, dependencias.nombre, subdependencias.subdependencia FROM trabajadores,    dependencias,   subdependencias WHERE  (trabajadores.estadocarnet  =sin imprimir )` ;
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
