
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Estadocarnetizacion extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				idusuario: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				estadoimpresion: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "estadocarnetizacion",
				modelName: "estadocarnetizacion",
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'idusuario', 
			Sequelize.literal('estadoImpresion AS estadoimpresion')
		];
	}

	static viewFields() {
		return [
			'id', 
			'idusuario', 
			Sequelize.literal('estadoImpresion AS estadoimpresion')
		];
	}

	static editFields() {
		return [
			'id', 
			'idusuario', 
			Sequelize.literal('estadoImpresion AS estadoimpresion')
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("estadoImpresion LIKE :search"),
		];
	}

	
	
}
Estadocarnetizacion.init();
export default Estadocarnetizacion;
