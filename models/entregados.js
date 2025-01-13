
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Entregados extends BaseModel {
	static init() {
		return super.init(
			{
				
				cedula: { type: Sequelize.INTEGER, primaryKey: true },
				nombres: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				cargo: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				dependencia: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				subdependencia: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				foto: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "entregados",
				modelName: "entregados",
			}
		);
	}
	
	static listFields() {
		return [
			'cedula', 
			'nombres', 
			'cargo', 
			'dependencia', 
			'subdependencia', 
			'foto'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("cedula LIKE :search"), 
			Sequelize.literal("nombres LIKE :search"), 
			Sequelize.literal("cargo LIKE :search"), 
			Sequelize.literal("dependencia LIKE :search"), 
			Sequelize.literal("subdependencia LIKE :search"), 
			Sequelize.literal("foto LIKE :search"),
		];
	}

	
	
}
Entregados.init();
export default Entregados;
