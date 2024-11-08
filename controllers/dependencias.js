import { Router } from 'express';
import { body } from 'express-validator';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';


const router = Router();




/**
 * Route to list dependencias records
 * @GET /dependencias/index/{fieldname}/{fieldvalue}
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
			let searchFields = DB.Dependencias.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		if(req.query.orderby){
			query.order = DB.getOrderBy(req, 'id', 'desc');
		}
		else{
			query.order = [];
			query.order.push(['id', 'ASC']);
		}
		query.attributes = DB.Dependencias.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Dependencias.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Dependencias record
 * @GET /dependencias/view/{recid}
 */
router.get(['/view/:recid'], async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Dependencias.viewFields();
		let record = await DB.Dependencias.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to insert Dependencias record
 * @POST /dependencias/add
 */
router.post('/add/', 
	[
		body('nombre').not().isEmpty(),
		body('estado').not().isEmpty(),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		
		//save Dependencias record
		let record = await DB.Dependencias.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Dependencias record for edit
 * @GET /dependencias/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Dependencias.editFields();
		let record = await DB.Dependencias.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to update  Dependencias record
 * @POST /dependencias/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('nombre').optional({nullable: true}).not().isEmpty(),
		body('estado').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Dependencias.editFields();
		let record = await DB.Dependencias.findOne(query);
		if(!record){
			return res.notFound();
		}
		await DB.Dependencias.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Dependencias record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /dependencias/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Dependencias.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await DB.Dependencias.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
