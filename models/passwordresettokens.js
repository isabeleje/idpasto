
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class PasswordResetTokens extends BaseModel {
	static init() {
		return super.init(
			{
				
				email: { type: Sequelize.STRING, primaryKey: true },
				token: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				created_ad: { type:Sequelize.DATE  ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "password_reset_tokens",
				modelName: "password_reset_tokens",
			}
		);
	}
	
	static listFields() {
		return [
			'email', 
			'token', 
			'created_ad'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("email LIKE :search"), 
			Sequelize.literal("token LIKE :search"),
		];
	}

	
	
}
PasswordResetTokens.init();
export default PasswordResetTokens;
