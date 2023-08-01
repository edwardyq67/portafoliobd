const User = require('../models/User');
const sequelize = require('../utils/connection');
require('../models/User')
require('../models/Category')
require('../models/News')

require('../models')
const main = async() => {
    try{
        await sequelize.sync({ force: true });
        await User.create({//crear el usuario
        firsName: "luciana",
        lastName: "yllanes",
        email: "luciana@gmail.com",
        password:"luciana1234",
        phone: "1234567"
        })
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();