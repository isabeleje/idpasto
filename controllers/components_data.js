import { Router } from 'express';
import DB from '../models/db.js';


const router = Router();


 /**
 * Route to check if field value already exist in a Trabajadores table
 * @GET /components_data/trabajadores_email_exist/{fieldvalue}
 */
router.get('/trabajadores_email_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Trabajadores.count({ where:{ 'email': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Trabajadores table
 * @GET /components_data/trabajadores_usuario_exist/{fieldvalue}
 */
router.get('/trabajadores_usuario_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Trabajadores.count({ where:{ 'usuario': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Trabajadores table
 * @GET /components_data/trabajadores_pin_exist/{fieldvalue}
 */
router.get('/trabajadores_pin_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Trabajadores.count({ where:{ 'pin': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Trabajadores table
 * @GET /components_data/trabajadores_cedula_exist/{fieldvalue}
 */
router.get('/trabajadores_cedula_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await DB.Trabajadores.count({ where:{ 'cedula': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get categoria_id_option_list records
 * @GET /components_data/categoria_id_option_list
 */
router.get('/categoria_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT id AS value,nombre AS label FROM categorias` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get dependencia_id_option_list records
 * @GET /components_data/dependencia_id_option_list
 */
router.get('/dependencia_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT  DISTINCT id AS value,nombre AS label FROM dependencias` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get subdependencia_id_option_list records
 * @GET /components_data/subdependencia_id_option_list
 */
router.get('/subdependencia_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT id AS value,subdependencia AS label FROM subdependencias WHERE iddependencia=:lookup_dependencia_id` ;
		let queryParams = {};
		queryParams['lookup_dependencia_id'] = req.query.lookup_dependencia_id;
		let records = await DB.rawQueryList(sqltext, queryParams,);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get user_role_id_option_list records
 * @GET /components_data/user_role_id_option_list
 */
router.get('/user_role_id_option_list', async (req, res) => {
	try{
		let sqltext = `SELECT role_id AS value, role_name AS label FROM roles` ;
		
		let records = await DB.rawQueryList(sqltext);
		return res.ok(records);
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to getcount_colaboradores value
 * @GET /components_data/getcount_colaboradores
 */
router.get('/getcount_colaboradores', async (req, res) => {
	try{
		let sqltext = `SELECT COUNT(*) AS num FROM trabajadores` ;
		
		let value = await DB.rawQueryValue(sqltext);
		return res.ok(value.toString());
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to getcount_dependencias value
 * @GET /components_data/getcount_dependencias
 */
router.get('/getcount_dependencias', async (req, res) => {
	try{
		let sqltext = `SELECT COUNT(*) AS num FROM dependencias` ;
		
		let value = await DB.rawQueryValue(sqltext);
		return res.ok(value.toString());
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to getcount_subdependencias value
 * @GET /components_data/getcount_subdependencias
 */
router.get('/getcount_subdependencias', async (req, res) => {
	try{
		let sqltext = `SELECT COUNT(*) AS num FROM subdependencias` ;
		
		let value = await DB.rawQueryValue(sqltext);
		return res.ok(value.toString());
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to get barchart_estadodeimpresin records
 * @GET /components_data/barchart_estadodeimpresin
 */
router.get('/barchart_estadodeimpresin',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT trabajadores.estadocarnet, COUNT(*) AS cantidad FROM trabajadores GROUP BY trabajadores.estadocarnet` ;
		
		let records = await DB.rawQueryList(sqltext);
		chartData['labels'] = records.map(function(v){ return v.estadocarnet });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.cantidad) }),
			label: "",
			backgroundColor: ["#DC3545","#28A745","#0D6EFD","purple"], 
			borderColor: "", 
			borderWidth: "",
		};
		chartData.datasets.push(dataset1);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});
export default router;
