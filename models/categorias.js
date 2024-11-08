
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Categorias extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				nombre: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				estado: { type:Sequelize.ENUM('activo','inactivo') , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "categorias",
				modelName: "categorias",
			}
		);
	}
	
	static listFields() {
		return [
			'nombre', 
			'estado', 
			'id'
		];
	}

	static viewFields() {
		return [
			'nombre', 
			'estado', 
			'id'
		];
	}

	static editFields() {
		return [
			'nombre', 
			'estado', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("nombre LIKE :search"), 
			Sequelize.literal("id LIKE :search"),
		];
	}

	
	
}
Categorias.init();
export default Categorias;
