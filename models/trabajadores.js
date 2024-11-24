
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Trabajadores extends BaseModel {
	static init() {
		return super.init(
			{
				
				idusuario: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				pin: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				cedula: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				nombres: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				apellidos: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				cargo: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				grupo_sanguineo: { type:Sequelize.ENUM('A+','A-','O+','O-','B+','B-','AB+','AB-') , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				foto: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				observaciones: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				estado: { type:Sequelize.ENUM('En servicio','inactivo') , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				categoria_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				dependencia_id: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				subdependencia_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				contrasena: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				email: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') },
				usuario: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				user_role_id: { type:Sequelize.INTEGER  ,defaultValue: Sequelize.literal('DEFAULT') },
				date_created: { type:Sequelize.DATE   },
				date_updated: { type:Sequelize.DATE   },
				estadocarnet: { type:Sequelize.STRING  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "trabajadores",
				modelName: "trabajadores",timestamps:true,
				createdAt: 'date_updated',updatedAt: 'date_created',
				
			}
		);
	}
	
	static listFields() {
		return [
			Sequelize.literal('trabajadores.pin AS pin'), 
			Sequelize.literal('trabajadores.cedula AS cedula'), 
			Sequelize.literal('trabajadores.nombres AS nombres'), 
			Sequelize.literal('trabajadores.apellidos AS apellidos'), 
			Sequelize.literal('trabajadores.grupo_sanguineo AS grupo_sanguineo'), 
			Sequelize.literal('trabajadores.cargo AS cargo'), 
			Sequelize.literal("dependencias.nombre AS dependencias_nombre"), 
			Sequelize.literal("subdependencias.subdependencia AS subdependencias_subdependencia"), 
			Sequelize.literal('trabajadores.foto AS foto'), 
			Sequelize.literal('trabajadores.estado AS estado'), 
			Sequelize.literal("categorias.id AS categorias_id"), 
			Sequelize.literal("dependencias.id AS dependencias_id"), 
			Sequelize.literal("subdependencias.id AS subdependencias_id"), 
			Sequelize.literal('trabajadores.idusuario AS idusuario')
		];
	}

	static exportListFields() {
		return [
			Sequelize.literal('trabajadores.pin AS pin'), 
			Sequelize.literal('trabajadores.cedula AS cedula'), 
			Sequelize.literal('trabajadores.nombres AS nombres'), 
			Sequelize.literal('trabajadores.apellidos AS apellidos'), 
			Sequelize.literal('trabajadores.grupo_sanguineo AS grupo_sanguineo'), 
			Sequelize.literal('trabajadores.cargo AS cargo'), 
			Sequelize.literal("dependencias.nombre AS dependencias_nombre"), 
			Sequelize.literal("subdependencias.subdependencia AS subdependencias_subdependencia"), 
			Sequelize.literal('trabajadores.foto AS foto'), 
			Sequelize.literal('trabajadores.estado AS estado'), 
			Sequelize.literal("categorias.id AS categorias_id"), 
			Sequelize.literal("dependencias.id AS dependencias_id"), 
			Sequelize.literal("subdependencias.id AS subdependencias_id"), 
			Sequelize.literal('trabajadores.idusuario AS idusuario')
		];
	}

	static viewFields() {
		return [
			Sequelize.literal('trabajadores.pin AS pin'), 
			Sequelize.literal('trabajadores.cedula AS cedula'), 
			Sequelize.literal('trabajadores.nombres AS nombres'), 
			Sequelize.literal('trabajadores.apellidos AS apellidos'), 
			Sequelize.literal('trabajadores.cargo AS cargo'), 
			Sequelize.literal('trabajadores.grupo_sanguineo AS grupo_sanguineo'), 
			Sequelize.literal('trabajadores.email AS email'), 
			Sequelize.literal('trabajadores.usuario AS usuario'), 
			Sequelize.literal('trabajadores.estadoCarnet AS estadocarnet'), 
			Sequelize.literal("categorias.nombre AS categorias_nombre"), 
			Sequelize.literal("dependencias.nombre AS dependencias_nombre"), 
			Sequelize.literal("subdependencias.subdependencia AS subdependencias_subdependencia"), 
			Sequelize.literal('trabajadores.estado AS estado'), 
			Sequelize.literal('trabajadores.observaciones AS observaciones'), 
			Sequelize.literal('trabajadores.foto AS foto'), 
			Sequelize.literal("categorias.id AS categorias_id"), 
			Sequelize.literal("dependencias.id AS dependencias_id"), 
			Sequelize.literal("subdependencias.id AS subdependencias_id"), 
			Sequelize.literal('trabajadores.idusuario AS idusuario')
		];
	}

	static accounteditFields() {
		return [
			'foto', 
			'grupo_sanguineo', 
			'email', 
			'idusuario'
		];
	}

	static accountviewFields() {
		return [
			'pin', 
			'cedula', 
			'nombres', 
			'apellidos', 
			'cargo', 
			'grupo_sanguineo', 
			'email', 
			Sequelize.literal('estadoCarnet AS estadocarnet'), 
			'estado', 
			'observaciones', 
			'idusuario'
		];
	}

	static editFields() {
		return [
			'pin', 
			'cedula', 
			'nombres', 
			'apellidos', 
			'grupo_sanguineo', 
			'foto', 
			'email', 
			'cargo', 
			'categoria_id', 
			'dependencia_id', 
			'subdependencia_id', 
			'usuario', 
			'user_role_id', 
			'estado', 
			'observaciones', 
			Sequelize.literal('estadoCarnet AS estadocarnet'), 
			'idusuario'
		];
	}

	static impresionFields() {
		return [
			Sequelize.literal('trabajadores.nombres AS nombres'), 
			Sequelize.literal('trabajadores.apellidos AS apellidos'), 
			Sequelize.literal("subdependencias.subdependencia AS subdependencias_subdependencia"), 
			Sequelize.literal('trabajadores.foto AS foto'), 
			Sequelize.literal('trabajadores.estadoCarnet AS estadocarnet'), 
			Sequelize.literal("categorias.id AS categorias_id"), 
			Sequelize.literal("dependencias.id AS dependencias_id"), 
			Sequelize.literal("subdependencias.id AS subdependencias_id"), 
			Sequelize.literal('trabajadores.idusuario AS idusuario')
		];
	}

	static editimpresionFields() {
		return [
			Sequelize.literal('estadoCarnet AS estadocarnet'), 
			'idusuario'
		];
	}

	static vistaidFields() {
		return [
			Sequelize.literal('trabajadores.pin AS pin'), 
			Sequelize.literal('trabajadores.cedula AS cedula'), 
			Sequelize.literal('trabajadores.nombres AS nombres'), 
			Sequelize.literal('trabajadores.apellidos AS apellidos'), 
			Sequelize.literal('trabajadores.cargo AS cargo'), 
			Sequelize.literal('trabajadores.grupo_sanguineo AS grupo_sanguineo'), 
			Sequelize.literal('trabajadores.email AS email'), 
			Sequelize.literal('trabajadores.usuario AS usuario'), 
			Sequelize.literal('trabajadores.estadoCarnet AS estadocarnet'), 
			Sequelize.literal("categorias.nombre AS categorias_nombre"), 
			Sequelize.literal("dependencias.nombre AS dependencias_nombre"), 
			Sequelize.literal("subdependencias.subdependencia AS subdependencias_subdependencia"), 
			Sequelize.literal('trabajadores.estado AS estado'), 
			Sequelize.literal('trabajadores.observaciones AS observaciones'), 
			Sequelize.literal("categorias.id AS categorias_id"), 
			Sequelize.literal("dependencias.id AS dependencias_id"), 
			Sequelize.literal("subdependencias.id AS subdependencias_id"), 
			Sequelize.literal('trabajadores.idusuario AS idusuario')
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("trabajadores.pin LIKE :search"), 
			Sequelize.literal("trabajadores.cedula LIKE :search"), 
			Sequelize.literal("trabajadores.nombres LIKE :search"), 
			Sequelize.literal("trabajadores.apellidos LIKE :search"), 
			Sequelize.literal("trabajadores.grupo_sanguineo LIKE :search"), 
			Sequelize.literal("trabajadores.cargo LIKE :search"), 
			Sequelize.literal("dependencias.nombre LIKE :search"), 
			Sequelize.literal("subdependencias.subdependencia LIKE :search"), 
			Sequelize.literal("trabajadores.estado LIKE :search"), 
			Sequelize.literal("categorias.nombre LIKE :search"),
		];
	}

	
	
}
Trabajadores.init();
export default Trabajadores;
