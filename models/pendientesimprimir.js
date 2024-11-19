
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Pendientesimprimir extends BaseModel {
	static init() {
		return super.init(
			{
				
				cedula: { type: Sequelize.INTEGER, primaryKey: true },
				nombres: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				cargo: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				subdependencia: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				foto: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				apellidos: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				nombre: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				pin: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				grupo_sanguineo: { type:Sequelize.ENUM('A+','A-','O+','O-','B+','B-','AB+','AB-') , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "pendientesimprimir",
				modelName: "pendientesimprimir",
			}
		);
	}
	
	static listFields() {
		return [
			'cedula', 
			'nombres', 
			'cargo', 
			'subdependencia', 
			'foto', 
			'apellidos', 
			'nombre', 
			'pin', 
			'grupo_sanguineo'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("cedula LIKE :search"), 
			Sequelize.literal("nombres LIKE :search"), 
			Sequelize.literal("cargo LIKE :search"), 
			Sequelize.literal("subdependencia LIKE :search"), 
			Sequelize.literal("foto LIKE :search"), 
			Sequelize.literal("apellidos LIKE :search"), 
			Sequelize.literal("nombre LIKE :search"), 
			Sequelize.literal("pin LIKE :search"),
		];
	}

	
	
}
Pendientesimprimir.init();
export default Pendientesimprimir;
