
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Public extends BaseModel {
	static init() {
		return super.init(
			{
				
				cedula: { type: Sequelize.INTEGER, primaryKey: true },
				nombres: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				apellidos: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				cargo: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				foto: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				dependencia: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				subdependencia: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				estado: { type:Sequelize.ENUM('En servicio','inactivo') , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "public",
				modelName: "public",
			}
		);
	}
	
	static listFields() {
		return [
			'cedula', 
			'nombres', 
			'apellidos', 
			'cargo', 
			'foto', 
			'dependencia', 
			'subdependencia', 
			'estado'
		];
	}

	static viewFields() {
		return [
			'cedula', 
			'nombres', 
			'apellidos', 
			'cargo', 
			'foto', 
			'dependencia', 
			'subdependencia', 
			'estado'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("cedula LIKE :search"), 
			Sequelize.literal("nombres LIKE :search"), 
			Sequelize.literal("apellidos LIKE :search"), 
			Sequelize.literal("cargo LIKE :search"), 
			Sequelize.literal("foto LIKE :search"), 
			Sequelize.literal("dependencia LIKE :search"), 
			Sequelize.literal("subdependencia LIKE :search"),
		];
	}

	
	
}
Public.init();
export default Public;
