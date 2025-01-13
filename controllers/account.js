import { Router } from 'express';
import { body } from 'express-validator';

import utils from '../helpers/utils.js';
import uploader from '../helpers/uploader.js';

import Rbac from '../helpers/rbac.js';

import validateFormData from '../helpers/validate_form.js';
import DB from '../models/db.js';
const router = Router();
/**
 * Route to view user account record
 * @GET /account
 */
router.get(['/','/index'], async (req, res) => {
	try{
		let recid = req.user.idusuario;
		let query = {};
		let where = {};
		where['idusuario'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Trabajadores.accountviewFields();
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
 * Route to get  Trabajadores record for edit
 * @GET /trabajadores/edit/{recid}
 */
router.get(['/edit'], async (req, res) => {
	try{
		const recid = req.user.idusuario;
		const query = {};
		const where = {};
		where['idusuario'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = DB.Trabajadores.accounteditFields();
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
router.post(['/edit'], 
	[
		body('foto').optional({nullable: true}).not().isEmpty(),
		body('grupo_sanguineo').optional({nullable: true}).not().isEmpty(),
		body('email').optional({nullable: true}).not().isEmpty().isEmail(),
		body('usuario').optional({nullable: true}).not().isEmpty(),
	], validateFormData
, async (req, res) => {
	try{
		const recid = req.user.idusuario;
		let modeldata = req.getValidFormData({ includeOptionals: true });
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
		query.attributes = DB.Trabajadores.accounteditFields();
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
router.get('/currentuserdata', async function (req, res)
{
	const user = req.user;
	const userRole = user.user_role_id;
	const rbac = new Rbac(userRole);
	const pages = await rbac.getUserPages();
	const roles = await rbac.getRoleName();
    return res.ok({ user, pages, roles });
});
/**
 * Route to change user password
 * @POST /account
 */
router.post('/changepassword' , 
	[
		body('oldpassword').not().isEmpty(),
		body('newpassword').not().isEmpty(),
		body('confirmpassword').not().isEmpty().custom((value, {req}) => (value === req.body.newpassword))
	], validateFormData, async function (req, res) {
	try{
		let oldPassword = req.body.oldpassword;
		let newPassword = req.body.newpassword;

		let userId = req.user.idusuario;
		let query = {};
		let where = {
			idusuario: userId,
		};
		query.raw = true;
		query.where = where;
		query.attributes = ['contrasena'];
		let user = await DB.Trabajadores.findOne(query);
		let currentPasswordHash = user.contrasena;
		if(!utils.passwordVerify(oldPassword, currentPasswordHash)){
			return res.badRequest("Current password is incorrect");
		}
		let modeldata = {
			contrasena: utils.passwordHash(newPassword)
		}
		await DB.Trabajadores.update(modeldata, {where: where});
		return res.ok("Password change completed");
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
