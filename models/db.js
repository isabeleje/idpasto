
import { Sequelize, sequelize } from './basemodel.js';

// Override timezone formatting
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
	return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss');
};

import Audits from './audits.js';
import Carnetentregados from './carnetentregados.js';
import Categorias from './categorias.js';
import Dependencias from './dependencias.js';
import Listosimpresion from './listosimpresion.js';
import Pendientesactualizar from './pendientesactualizar.js';
import Pendientesentrega from './pendientesentrega.js';
import Permissions from './permissions.js';
import Roles from './roles.js';
import Subdependencias from './subdependencias.js';
import Trabajadores from './trabajadores.js';


Trabajadores.belongsTo(Categorias, { foreignKey: 'categoria_id', as: 'categorias' });

Trabajadores.belongsTo(Dependencias, { foreignKey: 'dependencia_id', as: 'dependencias' });

Trabajadores.belongsTo(Subdependencias, { foreignKey: 'subdependencia_id', as: 'subdependencias' });

Trabajadores.belongsTo(Categorias, { foreignKey: 'categoria_id', as: 'categorias2' });

Trabajadores.belongsTo(Dependencias, { foreignKey: 'dependencia_id', as: 'dependencias2' });

Trabajadores.belongsTo(Subdependencias, { foreignKey: 'subdependencia_id', as: 'subdependencias2' });

Trabajadores.belongsTo(Categorias, { foreignKey: 'categoria_id', as: 'categorias3' });

Trabajadores.belongsTo(Dependencias, { foreignKey: 'dependencia_id', as: 'dependencias3' });

Trabajadores.belongsTo(Subdependencias, { foreignKey: 'subdependencia_id', as: 'subdependencias3' });

Trabajadores.belongsTo(Categorias, { foreignKey: 'categoria_id', as: 'categorias4' });

Trabajadores.belongsTo(Dependencias, { foreignKey: 'dependencia_id', as: 'dependencias4' });

Trabajadores.belongsTo(Subdependencias, { foreignKey: 'subdependencia_id', as: 'subdependencias4' });


const op = Sequelize.Op;
const raw = Sequelize.literal; // use to include raw expression

const filterBy = function(expression, value){
	return sequelize.where(raw(expression), value);
}

// convinient functions for performing raw queries 
// return different value types

function rawQuery(queryText, options){
	return sequelize.query(queryText, options);
}

async function rawQueryList(queryText, queryParams){
	const records = await rawQuery(queryText, { replacements: queryParams, type: Sequelize.QueryTypes.SELECT });
	return records;
}

async function rawQueryOne(queryText, queryParams){
	const records = await rawQueryList(queryText, queryParams);
	return records[0] || null;
}

async function rawQueryValue(queryText, queryParams){
	const record = await rawQueryOne(queryText, queryParams);
	if(record){
		return Object.values(record)[0];
	}
	return null;
}

function getOrderBy(req, sortField = null, sortType = 'desc'){
	const orderBy = req.query.orderby || sortField;
	const orderType = req.query.ordertype || sortType;
	if (orderBy) {
		let order = raw(`${orderBy} ${orderType}`);
		return [[order]];
	}
	return null;
}

export default {
	sequelize,
	op,
	filterBy,
	raw,
	rawQuery,
	rawQueryList,
	rawQueryOne,
	rawQueryValue,
	getOrderBy,
	Audits,
	Carnetentregados,
	Categorias,
	Dependencias,
	Listosimpresion,
	Pendientesactualizar,
	Pendientesentrega,
	Permissions,
	Roles,
	Subdependencias,
	Trabajadores
}
