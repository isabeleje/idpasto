
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Pendientesactualizar extends BaseModel {
	static init() {
		return super.init(
			{
				
				foto: { type: Sequelize.STRING, primaryKey: true },
				nombres: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				apellidos: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				cedula: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				cargo: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				dependencia: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				subdependencia: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				qr: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				pin: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				grupo_sanguineo: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "pendientesactualizar",
				modelName: "pendientesactualizar",
			}
		);
	}
	
	static listFields() {
		return [
			'foto', 
			'nombres', 
			'apellidos', 
			'cedula', 
			'cargo', 
			'dependencia', 
			'subdependencia', 
			'qr', 
			'pin', 
			'grupo_sanguineo'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("foto LIKE :search"), 
			Sequelize.literal("nombres LIKE :search"), 
			Sequelize.literal("apellidos LIKE :search"), 
			Sequelize.literal("cedula LIKE :search"), 
			Sequelize.literal("cargo LIKE :search"), 
			Sequelize.literal("dependencia LIKE :search"), 
			Sequelize.literal("subdependencia LIKE :search"), 
			Sequelize.literal("qr LIKE :search"), 
			Sequelize.literal("pin LIKE :search"), 
			Sequelize.literal("grupo_sanguineo LIKE :search"),
		];
	}

	
	
}
Pendientesactualizar.init();
export default Pendientesactualizar;
