const express= require('express');
const router=express.Router();
const estudiantesController=require('../controllers/estudiantesControllers');
const cursosController=require('../controllers/cursosController');
const inscripcionesController=require('../controllers/inscripcionesController');
router.use(express.json());

router.get('/estudiantes/',estudiantesController.getAllEstudiantes);
router.get('/estudiantes/?:id',estudiantesController.getEstudiante);
router.post('/estudiantes/',estudiantesController.createEstudiante);
router.put('/estudiantes/:id',estudiantesController.updateEstudiante);
router.delete('/estudiantes/:id',estudiantesController.deleteEstudiante);

router.get('/cursos/',cursosController.getAllCursos);
router.get('/cursos/:id',cursosController.getCurso);
router.post('/cursos/',cursosController.createCurso);
router.put('/cursos/:id',cursosController.updateCurso);
router.delete('/cursos/:id',cursosController.deleteCurso);

router.get('/inscripciones/',inscripcionesController.getAllInscripciones);
router.get('/inscripciones/:id',inscripcionesController.getEstudianteCurso);
router.post('/inscripciones/',inscripcionesController.createInscripciones);
router.delete('/inscripciones/:id',inscripcionesController.deleteInscripciones);
module.exports=router;
