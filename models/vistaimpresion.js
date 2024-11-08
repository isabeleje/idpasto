
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class VistaImpresion extends BaseModel {
	static init() {
		return super.init(
			{
				
				cedula: { type: Sequelize.INTEGER, primaryKey: true },
				nombres: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				apellidos: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				cargo: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				estadocarnet: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "vista_impresion",
				modelName: "vista_impresion",
			}
		);
	}
	
	static listFields() {
		return [
			'cedula', 
			'nombres', 
			'apellidos', 
			'cargo', 
			Sequelize.literal('estadoCarnet AS estadocarnet')
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("cedula LIKE :search"), 
			Sequelize.literal("nombres LIKE :search"), 
			Sequelize.literal("apellidos LIKE :search"), 
			Sequelize.literal("cargo LIKE :search"), 
			Sequelize.literal("estadoCarnet LIKE :search"),
		];
	}

	
	
}
VistaImpresion.init();
export default VistaImpresion;
