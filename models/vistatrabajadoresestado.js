
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class VistaTrabajadoresEstado extends BaseModel {
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
				
				tableName: "vista_trabajadores_estado",
				modelName: "vista_trabajadores_estado",
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
VistaTrabajadoresEstado.init();
export default VistaTrabajadoresEstado;
