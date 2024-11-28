
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Categoris extends BaseModel {
	static init() {
		return super.init(
			{
				
				idusuario: { type: Sequelize.INTEGER, primaryKey: true },
				pin: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				cedula: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				nombres: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				apellidos: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				cargo: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				grupo_sanguineo: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				foto: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				observaciones: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				estado: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				categoria_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				dependencia_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				subdependencia_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				contrasena: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				email: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				usuario: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				user_role_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				date_created: { type:Sequelize.DATE  ,defaultValue: Sequelize.literal('DEFAULT') },
				date_updated: { type:Sequelize.DATE  ,defaultValue: Sequelize.literal('DEFAULT') },
				estadocarnet: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "categoris",
				modelName: "categoris",
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'nombre', 
			'estado', 
			'cedula', 
			'nombres', 
			'cargo', 
			'dependencia', 
			'subdependencia', 
			'foto', 
			'idusuario', 
			'pin', 
			'apellidos', 
			'grupo_sanguineo', 
			'observaciones', 
			'categoria_id', 
			'dependencia_id', 
			'subdependencia_id', 
			'contrasena', 
			'email', 
			'usuario', 
			'user_role_id', 
			'date_created', 
			'date_updated', 
			'estadocarnet'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("nombre LIKE :search"), 
			Sequelize.literal("estado LIKE :search"), 
			Sequelize.literal("cedula LIKE :search"), 
			Sequelize.literal("nombres LIKE :search"), 
			Sequelize.literal("cargo LIKE :search"), 
			Sequelize.literal("dependencia LIKE :search"), 
			Sequelize.literal("subdependencia LIKE :search"), 
			Sequelize.literal("foto LIKE :search"), 
			Sequelize.literal("idusuario LIKE :search"), 
			Sequelize.literal("pin LIKE :search"), 
			Sequelize.literal("apellidos LIKE :search"), 
			Sequelize.literal("grupo_sanguineo LIKE :search"), 
			Sequelize.literal("observaciones LIKE :search"), 
			Sequelize.literal("contrasena LIKE :search"), 
			Sequelize.literal("email LIKE :search"), 
			Sequelize.literal("usuario LIKE :search"), 
			Sequelize.literal("estadocarnet LIKE :search"),
		];
	}

	
	
}
Categoris.init();
export default Categoris;
