const { response } = require("express");
const User = require('../models/user');

const getUsers = async (req, res = response) => {

    const from = Number(req.query.from) || 0;

    const users = await User.find()
        .find({ _id: { $ne: req.uid } }) //retorno todos los id menos el de la request osea menos el que esta logueado
        .sort('-online')  //ordena por los onlinme primero
        .skip(from)
        .limit(20) //esto sirve para hacer paginacion buscar de a 20

    res.json({
        ok:true,
        users
    });

}

module.exports = {
    getUsers
}