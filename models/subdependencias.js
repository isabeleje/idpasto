
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Subdependencias extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				iddependencia: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				subdependencia: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				estado: { type:Sequelize.ENUM('activo','inactivo') , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "subdependencias",
				modelName: "subdependencias",
			}
		);
	}
	
	static listFields() {
		return [
			'subdependencia', 
			'estado', 
			'id'
		];
	}

	static viewFields() {
		return [
			'subdependencia', 
			'estado', 
			'id'
		];
	}

	static editFields() {
		return [
			Sequelize.literal('idDependencia AS iddependencia'), 
			'subdependencia', 
			'estado', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("subdependencia LIKE :search"), 
			Sequelize.literal("id LIKE :search"),
		];
	}

	
	
}
Subdependencias.init();
export default Subdependencias;
