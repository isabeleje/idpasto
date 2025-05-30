
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Pendienteimpresion extends BaseModel {
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
				
				tableName: "pendienteimpresion",
				modelName: "pendienteimpresion",
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

	static exportListFields() {
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
			Sequelize.literal("nombres LIKE :search"), 
			Sequelize.literal("apellidos LIKE :search"), 
			Sequelize.literal("cedula LIKE :search"), 
			Sequelize.literal("cargo LIKE :search"), 
			Sequelize.literal("dependencia LIKE :search"), 
			Sequelize.literal("subdependencia LIKE :search"), 
			Sequelize.literal("qr LIKE :search"), 
			Sequelize.literal("pin LIKE :search"),
		];
	}

	
	
}
Pendienteimpresion.init();
export default Pendienteimpresion;
