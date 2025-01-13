import { Router } from 'express';
import DB from '../models/db.js';
import exportListPage from '../exports/listosimpresion_list.js';


const router = Router();





/**
 * Route to list listosimpresion records
 * @GET /listosimpresion/index/{fieldname}/{fieldvalue}
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req, res) => {  
	try{
		const query = {};
		let queryFilters = [];
		let where = {};
		let replacements = {};
		let fieldName = req.params.fieldname;
		let fieldValue = req.params.fieldvalue;
		
		if (fieldName){
			queryFilters.push(DB.filterBy(fieldName, fieldValue));
		}
		let search = req.query.search;
		if(search){
			let searchFields = DB.Listosimpresion.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'foto', 'desc');
		if(req.query.export){
			query.attributes = DB.Listosimpresion.exportListFields();
			let records = await DB.Listosimpresion.findAll(query);
			return exportListPage(records, req, res)
		}
		query.attributes = DB.Listosimpresion.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 20;
		let result = await DB.Listosimpresion.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});
export default router;
