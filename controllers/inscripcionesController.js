const modelo=require('../models/');

const getAllInscripciones=async function (req,res){
  let datos;
  await modelo.Estudiante.findAll({
    include:[modelo.Cursos]
  }).then((r)=>{
    datos=r;
  });
  res.status(200).json(datos);
}
const getEstudianteCurso= async function(req,res){
  let id=req.params.id;
  await modelo.Estudiante.findByPk(id,{
    include:[modelo.Cursos]
  }).then((estudiantes)=>{
    if(estudiantes){
      res.status(200).json(estudiantes);
    }else{
      res.status(404).json({error:'No se encontro el estudiante'});
    }
  });

}

const createInscripciones= async function(req,res){
  modelo.Inscripciones.create({
    estudianteid: req.body.estudianteid,
    cursoid: req.body.cursoid
  }).then(()=>{
    console.log('Estudiante Inscrito');
  }).catch(err=>{
    console.log(err);
  })
}

const deleteInscripciones= function (req,res){
modelo.Inscripciones.destroy({
  where:{id:req.params.id}
}).then(()=>{
    console.log('Dado de baja');
    res.status(200).send('Se borro la inscripcion');
  }).catch(err=>{
    console.log(err);
    res.status(404).json({error:'No se encontro la inscripciones'});
  })
};
exports.getAllInscripciones=getAllInscripciones;
exports.getEstudianteCurso=getEstudianteCurso;
exports.createInscripciones=createInscripciones;
exports.deleteInscripciones=deleteInscripciones;
