const express= require('express');
const app=express();
const port =4000;
const bodyParser=require('body-parser');
const router=require('./routes/index');
const cors=require('cors')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(port,()=>{
  console.log('Servidor escuchando por el puerto:', port);
}).on('error',err=>{
  console.log('Error al iniciar al servidor:', err);
})
