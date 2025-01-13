import { Router } from 'express';
import DB from '../models/db.js';


const router = Router();





/**
 * Route to list records based on custom sql query
 * @GET /centregados
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'],  async (req, res) => {
	try{
		let sqltext = `select `trabajadores`.`cedula` AS `cedula`,concat(`trabajadores`.`nombres`,' ',`trabajadores`.`apellidos`) AS `nombres`,`trabajadores`.`cargo` AS `cargo`,`dependencias`.`nombre` AS `dependencia`,`subdependencias`.`subdependencia` AS `subdependencia`,`trabajadores`.`foto` AS `foto` from ((`trabajadores` join `dependencias` on((`trabajadores`.`dependencia_id` = `dependencias`.`id`))) join `subdependencias` on((`trabajadores`.`subdependencia_id` = `subdependencias`.`id`))) where (`trabajadores`.`estadoCarnet` = 'entregado')` ;
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
