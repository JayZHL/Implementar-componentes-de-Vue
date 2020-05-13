const modelo=require('../models/');
let datos;

const getAllCursos= async function(req,res){
  let datos;
  await modelo.Cursos.findAll({
    raw:true
  }).then((r)=>{
    datos=r;
  });
  console.log(datos);
  res.status(200).json(datos);
}
const getCurso=function(req,res){
  let id=req.params.id;

  let datos;
   modelo.Cursos.findByPk(id).then((cursos)=>{
    if(cursos){

        res.status(200).json(cursos);
    }else{
        res.status(404).json({error:'No se encontro el curso'});
    }
  });
}
const createCurso=async function(req,res){
  await modelo.Cursos.create({
    clave: req.body.clave,
    nombre: req.body.nombre,
    creditos:req.body.creditos
 }).then((curso)=>{
   res.status(200).json(curso);
 },(val)=>{
   res.json({
     errors:val.errors.map((error)=>{
       return error.message
     })
   });
 });
}
const updateCurso=function(req,res){
  let id=req.params.id;
  let val;
  modelo.Cursos.findByPk(id).then((curso)=>{
   if(curso){
     val=true;
   }else{
     val=false
   }
   if(val){
       modelo.Cursos.update({
         clave: req.body.clave,
         nombre: req.body.nombre,
         creditos:req.body.creditos
       },
         {
           where:{id: req.params.id}
         })
       res.status(200).send('Se actualizo el curso');
   }else{
     res.status(404).json({error:'No se encontro el curso'});
   }
 })
}
const deleteCurso=function (req,res){
  let id=req.params.id;
  let val;
   modelo.Cursos.findByPk(id).then((curso)=>{
    if(curso){
      val=true;
    }else{
      val=false
    }
    if(val){
        modelo.Cursos.destroy({
          where:{id:req.params.id}
        })
        res.status(200).send('Se borro el curso');
    }else{
      res.status(404).json({error:'No se encontro el curso'});
    }
  })
};
exports.getAllCursos=getAllCursos;
exports.getCurso=getCurso;
exports.createCurso=createCurso;
exports.updateCurso=updateCurso;
exports.deleteCurso=deleteCurso;
