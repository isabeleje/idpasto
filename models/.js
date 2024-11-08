
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class  extends BaseModel {
	static init() {
		return super.init(
			{
				
				cedula: { type: Sequelize.INTEGER, primaryKey: true },
				nombre_completo: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				cargo: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				nombre: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				subdependencia: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				estadocarnet: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "viewEstadoImpresion",
				modelName: "viewEstadoImpresion",
			}
		);
	}
	
	static listFields() {
		return [
			'cedula', 
			'nombre_completo', 
			'cargo', 
			'nombre', 
			'subdependencia', 
			Sequelize.literal('estadoCarnet AS estadocarnet')
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("cedula LIKE :search"), 
			Sequelize.literal("nombre_completo LIKE :search"), 
			Sequelize.literal("cargo LIKE :search"), 
			Sequelize.literal("nombre LIKE :search"), 
			Sequelize.literal("subdependencia LIKE :search"), 
			Sequelize.literal("estadoCarnet LIKE :search"),
		];
	}

	
	
}
.init();
export default ;
