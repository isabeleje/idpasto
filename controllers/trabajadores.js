import { Router } from 'express';
import csv from 'fast-csv';

import { body } from 'express-validator';

import utils from '../helpers/utils.js';
import uploader from '../helpers/uploader.js';
import { fileUploadMiddleware } from '../helpers/upload_middleware.js';
import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';
import exportListPage from '../exports/trabajadores_list.js';


const router = Router();





/**
 * Route to list trabajadores records
 * @GET /trabajadores/index/{fieldname}/{fieldvalue}
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
		const joinTables = []; // hold list of join tables
		joinTables.push({
			model: DB.Categorias,
			required: true,
			as: 'categorias',
			attributes: [], //already set via model class
		})

		joinTables.push({
			model: DB.Dependencias,
			required: true,
			as: 'dependencias',
			attributes: [], //already set via model class
		})

		joinTables.push({
			model: DB.Subdependencias,
			required: true,
			as: 'subdependencias',
			attributes: [], //already set via model class
		})

		query.include = joinTables;
		let search = req.query.search;
		if(search){
			let searchFields = DB.Trabajadores.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'idusuario', 'desc');
		if(req.query.export){
			query.attributes = DB.Trabajadores.exportListFields();
			let records = await DB.Trabajadores.findAll(query);
			return exportListPage(records, req, res)
		}
		query.attributes = DB.Trabajadores.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Trabajadores.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to import Trabajadores records
 * support multi import of csv data files
 * csv file must contain table header on the first line.
 * @GET /trabajadores/importdata
 */
router.post('/importdata', fileUploadMiddleware('importdata'), async (req, res, next) => {
	if(req.files){	// files uploaded
		var uploadedPaths = req.files.map(function(v) {
			return v.path;
		});
		if(uploadedPaths.length){
			uploadedPaths.forEach(function (fpath){
				let records = [];
				csv.fromPath(fpath, {headers: true, ignoreEmpty: true}).on("data", function(data){
					if(data){
						const modeldata = {
							pin: data['pin'],
							cedula: data['cedula'],
							nombres: data['nombres'],
							apellidos: data['apellidos'],
							cargo: data['cargo'],
							grupo_sanguineo: data['grupo_sanguineo'],
							foto: data['foto'],
							observaciones: data['observaciones'],
							estado: data['estado'],
							categoria_id: data['categoria_id'],
							dependencia_id: data['dependencia_id'],
							subdependencia_id: data['subdependencia_id'],
							contrasena: data['contrasena'],
							email: data['email'],
							usuario: data['usuario'],
							user_role_id: data['user_role_id'],
							date_created: data['date_created'],
							date_updated: data['date_updated'],
							estadoCarnet: data['estadoCarnet']
						}
						records.push(modeldata);
					}
				}).on("end", async() => {
					try{
						let affectedRows = await DB.Trabajadores.bulkCreate(records);
						let numRows = affectedRows.length || 0;
						return res.ok(`${numRows} Records Imported`);
					}
					catch(err){
						return res.serverError(err);
					}
				});
			});
		}
	}
	else{
		return res.badRequest("Error uploading file")
	}
});


/**
 * Route to view Trabajadores record
 * @GET /trabajadores/view/{recid}
 */
router.get('/view/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		const joinTables = []; // hold list of join tables
		joinTables.push({
			model: DB.Categorias,
			required: true,
			as: 'categorias',
			attributes: [], //already set via model class
		})

		joinTables.push({
			model: DB.Dependencias,
			required: true,
			as: 'dependencias',
			attributes: [], //already set via model class
		})

		joinTables.push({
			model: DB.Subdependencias,
			required: true,
			as: 'subdependencias',
			attributes: [], //already set via model class
		})

		query.include = joinTables;
		where[DB.op.and] = DB.raw('trabajadores.idusuario = :recid');
		query.replacements = {
			recid
		}

		query.raw = true;
		query.where = where;
		query.attributes = DB.Trabajadores.viewFields();
		let record = await DB.Trabajadores.findOne(query);
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
 * Route to insert Trabajadores record
 * @POST /trabajadores/add
 */
router.post('/add/', 
	[
		body('foto').optional({nullable: true, checkFalsy: true}),
		body('email').not().isEmpty().isEmail(),
		body('usuario').not().isEmpty(),
		body('contrasena').not().isEmpty(),
		body('confirm_password', 'Passwords do not match').custom((value, {req}) => (value === req.body.contrasena)),
	], validateFormData
, async function (req, res) {
	try{
		let modeldata = req.getValidFormData();
		modeldata.contrasena = utils.passwordHash(modeldata.contrasena);
		
		// set default role for user
		const roleId =  await DB.Roles.findValue('role_id', {role_name: 'Admin'});
		modeldata['user_role_id'] = roleId;
		
		// check if email already exist.
		let emailCount = await DB.Trabajadores.count({ where:{ 'email': modeldata.email } });
		if(emailCount > 0){
			return res.badRequest(`${modeldata.email} already exist.`);
		}
		
		// check if usuario already exist.
		let usuarioCount = await DB.Trabajadores.count({ where:{ 'usuario': modeldata.usuario } });
		if(usuarioCount > 0){
			return res.badRequest(`${modeldata.usuario} already exist.`);
		}
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.foto !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.foto, 'foto');
			modeldata.foto = fileInfo.filepath;
		}
		
		//save Trabajadores record
		let record = await DB.Trabajadores.create(modeldata);
		//await record.reload(); //reload the record from database
		const recid =  record['idusuario'];
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues: null, newValues });
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Trabajadores record for edit
 * @GET /trabajadores/edit/{recid}
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['idusuario'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Trabajadores.editFields();
		let record = await DB.Trabajadores.findOne(query);
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
 * Route to update  Trabajadores record
 * @POST /trabajadores/edit/{recid}
 */
router.post('/edit/:recid', 
	[
		body('pin').optional({nullable: true}).not().isEmpty(),
		body('cedula').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('nombres').optional({nullable: true}).not().isEmpty(),
		body('apellidos').optional({nullable: true}).not().isEmpty(),
		body('grupo_sanguineo').optional({nullable: true}).not().isEmpty(),
		body('foto').optional({nullable: true, checkFalsy: true}),
		body('email').optional({nullable: true}).not().isEmpty().isEmail(),
		body('cargo').optional({nullable: true}).not().isEmpty(),
		body('categoria_id').optional({nullable: true}).not().isEmpty(),
		body('dependencia_id').optional({nullable: true}).not().isEmpty(),
		body('subdependencia_id').optional({nullable: true}).not().isEmpty(),
		body('usuario').optional({nullable: true}).not().isEmpty(),
		body('user_role_id').optional({nullable: true, checkFalsy: true}),
		body('estado').optional({nullable: true}).not().isEmpty(),
		body('observaciones').optional({nullable: true, checkFalsy: true}),
		body('estadocarnet').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		
		// check if pin already exist.
		let pinCount = await DB.Trabajadores.count({where:{'pin': modeldata.pin, 'idusuario': {[DB.op.ne]: recid} }});
		if(pinCount > 0){
			return res.badRequest(`${modeldata.pin} already exist.`);
		}

		
		// check if cedula already exist.
		let cedulaCount = await DB.Trabajadores.count({where:{'cedula': modeldata.cedula, 'idusuario': {[DB.op.ne]: recid} }});
		if(cedulaCount > 0){
			return res.badRequest(`${modeldata.cedula} already exist.`);
		}

		
		// check if email already exist.
		let emailCount = await DB.Trabajadores.count({where:{'email': modeldata.email, 'idusuario': {[DB.op.ne]: recid} }});
		if(emailCount > 0){
			return res.badRequest(`${modeldata.email} already exist.`);
		}

		
		// check if usuario already exist.
		let usuarioCount = await DB.Trabajadores.count({where:{'usuario': modeldata.usuario, 'idusuario': {[DB.op.ne]: recid} }});
		if(usuarioCount > 0){
			return res.badRequest(`${modeldata.usuario} already exist.`);
		}
		
        // move uploaded file from temp directory to destination directory
		if(modeldata.foto !== undefined) {
			const fileInfo = uploader.moveUploadedFiles(modeldata.foto, 'foto');
			modeldata.foto = fileInfo.filepath;
		}
		const query = {};
		const where = {};
		where['idusuario'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Trabajadores.editFields();
		let record = await DB.Trabajadores.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.Trabajadores.update(modeldata, {where: where});
		record = await DB.Trabajadores.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });

		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Trabajadores record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @GET /trabajadores/delete/{recid}
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = {};
		const where = {};
		where['idusuario'] = recid;
		query.raw = true;
		query.where = where;
		let records = await DB.Trabajadores.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
			const oldValues = JSON.stringify(record); //for audit trail
			uploader.deleteRecordFiles(record.foto, 'foto'); //delete file after record delete
			req.writeToAuditLog({ recid: record['idusuario'], oldValues });

		});
		await DB.Trabajadores.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to list trabajadores records
 * @GET /trabajadores/index/{fieldname}/{fieldvalue}
 */
router.get('/impresion/:fieldname?/:fieldvalue?', async (req, res) => {  
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
		const joinTables = []; // hold list of join tables
		joinTables.push({
			model: DB.Categorias,
			required: true,
			as: 'categorias',
			attributes: [], //already set via model class
		})

		joinTables.push({
			model: DB.Dependencias,
			required: true,
			as: 'dependencias',
			attributes: [], //already set via model class
		})

		joinTables.push({
			model: DB.Subdependencias,
			required: true,
			as: 'subdependencias',
			attributes: [], //already set via model class
		})

		query.include = joinTables;
		let search = req.query.search;
		if(search){
			let searchFields = DB.Trabajadores.searchFields();
			where[DB.op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		if(queryFilters.length){
			where[DB.op.and] = queryFilters;
		}
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = DB.getOrderBy(req, 'idusuario', 'desc');
		query.attributes = DB.Trabajadores.impresionFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;
		let result = await DB.Trabajadores.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to get  Trabajadores record for edit
 * @GET /trabajadores/edit/{recid}
 */
router.get('/editimpresion/:recid', async (req, res) => {
	try{
		const recid = req.params.recid;
		const query = {};
		const where = {};
		where['idusuario'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Trabajadores.editimpresionFields();
		let record = await DB.Trabajadores.findOne(query);
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
 * Route to update  Trabajadores record
 * @POST /trabajadores/edit/{recid}
 */
router.post('/editimpresion/:recid', 
	[
		body('estadocarnet').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.params.recid;
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = {};
		const where = {};
		where['idusuario'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Trabajadores.editimpresionFields();
		let record = await DB.Trabajadores.findOne(query);
		if(!record){
			return res.notFound();
		}
		const oldValues = JSON.stringify(record); //for audit trail
		await DB.Trabajadores.update(modeldata, {where: where});
		record = await DB.Trabajadores.findOne(query);//for audit trail
		const newValues = JSON.stringify(record); 
		req.writeToAuditLog({ recid, oldValues, newValues });

		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to view Trabajadores record
 * @GET /trabajadores/view/{recid}
 */
router.get('/vistaid/:recid', async (req, res) => {
	try{
		const recid = req.params.recid || null;
		const query = {}
		const where = {}
		const joinTables = []; // hold list of join tables
		joinTables.push({
			model: DB.Categorias,
			required: true,
			as: 'categorias',
			attributes: [], //already set via model class
		})

		joinTables.push({
			model: DB.Dependencias,
			required: true,
			as: 'dependencias',
			attributes: [], //already set via model class
		})

		joinTables.push({
			model: DB.Subdependencias,
			required: true,
			as: 'subdependencias',
			attributes: [], //already set via model class
		})

		query.include = joinTables;
		where[DB.op.and] = DB.raw('trabajadores.idusuario = :recid');
		query.replacements = {
			recid
		}

		query.raw = true;
		query.where = where;
		query.attributes = DB.Trabajadores.vistaidFields();
		let record = await DB.Trabajadores.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
