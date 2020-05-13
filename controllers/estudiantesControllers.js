const modelo=require('../models/');
const bodyParser=require('body-parser');

const getAllEstudiantes=async function(req,res){
  let datos;
  await modelo.Estudiante.findAll({
    raw:true
  }).then((r)=>{
    datos=r;
  });
  console.log(datos);
  res.status(200).json(datos);
}
const getEstudiante= async function(req,res){
  let id=req.params.id;

  let datos;
   modelo.Estudiante.findByPk(id).then((estudiante)=>{
    if(estudiante){

        res.status(200).json(estudiante);
    }else{
        res.status(404).json({error:'No se encontro el estudiante'});
    }
  });

}
const createEstudiante=  async function(req,res){
  console.log(req.body.nombre);
   await modelo.Estudiante.create({
    matricula: req.body.matricula,
    apellidoPaterno: req.body.apellidoPaterno,
    apellidoMaterno: req.body.apellidoMaterno,
    nombre: req.body.nombre,
    semestreIngreso:req.body.semestreIngreso,
    creditosCursados:req.body.creditosCursados
  }).then((estudiante)=>{
    res.status(200).json(estudiante);
  },(val)=>{
    res.json({
      errors:val.errors.map((error)=>{
        return error.message
      })
    });
  });

}
const updateEstudiante=function(req,res){
  let id=req.params.id;
  let val;
  modelo.Estudiante.findByPk(id).then((estudiante)=>{
   if(estudiante){
     val=true;
   }else{
     val=false
   }
   if(val){
       modelo.Estudiante.update({
             matricula: req.body.matricula,
             apellidoPaterno: req.body.apellidoPaterno,
             apellidoMaterno: req.body.apellidoMaterno,
             nombre: req.body.nombre,
             semestreIngreso:req.body.semestreIngreso,
             creditosCursados:req.body.creditosCursados
       },
         {
           where:{id: req.params.id}
         })
       res.status(200).send('Se actualizo el estudiante');
   }else{
     res.status(404).json({error:'No se encontro el estudiante'});
   }
 })

}
const deleteEstudiante= function (req,res){
  let id=req.params.id;
  let val;
   modelo.Estudiante.findByPk(id).then((estudiante)=>{
    if(estudiante){
      val=true;
    }else{
      val=false
    }
    if(val){
        modelo.Estudiante.destroy({
          where:{id:req.params.id}
        })
        res.status(200).send('Se borro el estudiante');
    }else{
      res.status(404).json({error:'No se encontro el estudiante'});
    }
  })

};

exports.getAllEstudiantes=getAllEstudiantes;
exports.getEstudiante=getEstudiante;
exports.createEstudiante=createEstudiante;
exports.updateEstudiante=updateEstudiante;
exports.deleteEstudiante=deleteEstudiante;
