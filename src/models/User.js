const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const bcrypt=require('bcrypt')
const User = sequelize.define('user', {
    firsName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
User.beforeCreate(async user=>{//encritptar la contraseña
    const hashedPassword=await bcrypt.hash(user.password,10)
    user.password=hashedPassword
})
User.prototype.toJSON = function () {//nopassword , para crear esto y quitar el passwod
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
}
module.exports = User;