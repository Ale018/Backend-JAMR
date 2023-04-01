var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel');

/* GET users listing. */
router.get('/',async function(req, res, next) {
  const resultado = await userModel.find();
  res.send(resultado);
});

/*------------------------ Post products listing. ------------------------*/
router.post('/', async function(req, res, next) {
  let datos = {
    username: req.body.username,
    password: req.body.password,
    apellidos: req.body.apellidos,
    nombre: req.body.nombre,
    rol: req.body.rol,
  };
  
  let user = new userModel(datos);
  let resultado = await user.save();
  res.send('Usuario agregado exitosamente');
});

/*------------------------ PUT products listing. ------------------------*/
router.put('/',async function(req, res, next) {
  const filter = {_id: req.body._id}; //Condición de Query
  const update = {nombre: req.body.nombre, apellidos: req.body.apellidos}; //Campos a modificar


  const resultado = await userModel.findOneAndUpdate(filter, update, {
    new:true,
    upsert: true
  });

  res.json("Se actualizo el usuario");
});

/*------------------------ DELETE products listing. ------------------------*/
router.delete('/:_id',async function(req, res, next) {
  const result = await userModel.find({_id: req.params._id}).exec();


  if(result.length > 0){
    await userModel.deleteOne({_id:req.params._id});
    res.json("Eliminando usuario");
  }else{
    res.json({error:"No se encontro el usuario con clave " + req.params._id})
  }
});


module.exports = router;
