const miRegistro={
  props:{
    matricula:Number,
    apellidoPaterno:String,
    apellidoMaterno:String,
    nombre:String,
    semestreIngreso: Number,
    creditosCursados: Number
  },
  template:`<form @submit.prevent="enviar">
      <input placeholder="matricula" v-model="matricula" :matricula="matricula">
      <br>
      <input placeholder="nombre" v-model="nombre" :nombre="nombre">
      <br>
      <input placeholder="paterno" v-model="apellidoPaterno" :apellidoPaterno="apellidoPaterno">
      <br>
      <input placeholder="materno" v-model="apellidoMaterno" :apellidoMaterno="apellidoMaterno">
      <br>
      <input placeholder="semestre" v-model="semestreIngreso" :semestreIngreso="semestreIngreso">
      <br>
      <input placeholder="creditos" v-model="creditosCursados" :creditosCursados="creditosCursados">
      <br>
      <button type="submit">Enviar</button>
    </form>`,
methods: {
    enviar: function () {
        //this.$emit('matricula');
        console.log(this.nombre);
        let obj={
          matricula:this.matricula,
          apellidoPaterno:this.apellidoPaterno,
          apellidoMaterno:this.apellidoMaterno,
          nombre:this.nombre,
          semestreIngreso: this.semestreIngreso,
          creditosCursados: this.creditosCursados
        }
        console.log(obj)
        fetch('http://localhost:4000/estudiantes/',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj)
        }).
        then(response => {
             return response.json();
        }).catch(err=>{
          console.log(err);
        })
        console.log('enviado');
    },
    cancelado: function () {
      console.log('cancelado');
    }
  }
}
const miRegistroInscripciones={
  props:{
    estudianteid: Number,
    cursoid: Number
  },
  template:`<form @submit.prevent="enviar">
      <input placeholder="estudianteid" v-model="estudianteid" :estudianteid="estudianteid">
      <br>
      <input placeholder="cursoid" v-model="cursoid" :cursoid="cursoid">
      <br>

      <button type="submit">Enviar</button>
    </form>`,
methods: {
    enviar: function () {
        //this.$emit('matricula');
        let obj={
          estudianteid:this.estudianteid,
          cursoid:this.cursoid
        }
        console.log(obj)
        fetch('http://localhost:4000/inscripciones/',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj)
        }).
        then(response => {
             return response.json();
        }).catch(err=>{
          console.log(err);
        })
        console.log('enviado');
    },
    cancelado: function () {
      console.log('cancelado');
    }
  }
}
const miRegistroCursos={
  props:{
    clave: Number,
    nombre: String,
    creditos: Number
  },
  template:`<form @submit.prevent="enviar">
      <input placeholder="clave" v-model="clave" :clave="clave">
      <br>
      <input placeholder="nombre" v-model="nombre" :nombre="nombre">
      <br>
      <input placeholder="creditos" v-model="creditos" :creditos="creditos">
      <br>

      <button type="submit">Enviar</button>
    </form>`,
methods: {
    enviar: function () {
        //this.$emit('matricula');
        let obj={
          clave: this.clave,
          nombre: this.nombre,
          creditos: this.creditos
        }
        console.log(obj)
        fetch('http://localhost:4000/cursos/',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(obj)
        }).
        then(response => {
             return response.json();
        }).catch(err=>{
          console.log(err);
        })
        console.log('enviado');
    },
    cancelado: function () {
      console.log('cancelado');
    }
  }
}
const miAlerta = {
    props: {
        titulo: String,
        idcurso:Number
    },
    template:`
<div class="modal" tabindex="-1" role="dialog" style="display: block; padding-right: 17px;">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{titulo}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelado">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p><slot></slot></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="entendidoCurso">Ok</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancelado">Cancel</button>
      </div>
    </div>
  </div>
</div>`,
    methods: {
        cancelado: function () {
            this.$emit('cancelado');
        },
        entendidoCurso: function(){
          this.$emit('miOk');
          fetch('http://localhost:4000/inscripciones/'+this.idcurso,{
              method:'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              }
          }).
          then(response => {
              return response.json();
          })
        }
    }
}
const miAlerta2 = {
    props: {
        titulo: String,
        matricula:Number,
        idcurso:Number
    },
    template:`
<div class="modal" tabindex="-1" role="dialog" style="display: block; padding-right: 17px;">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{titulo}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelado">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p><slot></slot></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="entendido">Ok</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancelado">Cancel</button>
      </div>
    </div>
  </div>
</div>`,
    methods: {
        entendido: function () {
            this.$emit('miOk');
            console.log(this.matricula);
            fetch('http://localhost:4000/estudiantes/'+this.matricula,{
                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).
            then(response => {
                return response.json();
            })
        },
        cancelado: function () {
            this.$emit('cancelado');
        },
        entendidoCurso: function(){
          this.$emit('miOk');
          fetch('http://localhost:4000/inscripciones/'+this.idcurso,{
              method:'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              }
          }).
          then(response => {
              return response.json();
          })
        }
    }
}
const miAlertacursos = {
    props: {
        titulo: String,
        clave:Number,
        idcurso: Number,
    },
    template:`
<div class="modal" tabindex="-1" role="dialog" style="display: block; padding-right: 17px;">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">{{titulo}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cancelado">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p><slot></slot></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="entendidoCurso">Ok</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancelado">Cancel</button>
      </div>
    </div>
  </div>
</div>`,
    methods: {
        entendido: function () {
            this.$emit('miOk');
            fetch('http://localhost:4000/cursos/'+this.clave,{
                method:'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).
            then(response => {
                return response.json();
            })
        },
        cancelado: function () {
            this.$emit('cancelado');
        },
        entendidoCurso: function(){
          console.log('Porbando')
          this.$emit('miOk');
          fetch('http://localhost:4000/cursos/'+this.idcurso,{
              method:'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              }
          }).
          then(response => {
              return response.json();
          })
        }
    }
}
const miTablaEstudiantes = {
    data: function () {
        return {
            estudiantes: [],
            alertaRegistro: false,
            alertaNuevoAlumno: false,
            alertaNuevaInscripcion: false,
            alertaCurso: false,
            matricula:0,
            curso:'',
            idcurso:0
        }
    },
    methods: {
      confirmarBorradoRegistro: function (m) {
          console.log(m);
          this.matricula = m;
          this.alertaRegistro = true;

      },
      confirmarBorradoCurso: function (c,id) {
            this.curso = c;
            this.idcurso = id;
            this.alertaCurso = true;
        },
      confirmarNuevoAlumno:function(){
        this.alertaNuevoAlumno=true;
      },
      confirmarNuevoInscripcion:function(){
        this.alertaNuevaInscripcion=true;
      }
    },
    components: {
        dialogAlerta: miAlerta,
        dialogRegistro: miRegistro,
        dialogInscripciones: miRegistroInscripciones
    },
    template: `
<div>
    <h4 style="text-align: center">
        <slot></slot>
    </h4>
    <div class="panel panel-default ">
        <dialog-alerta v-if="alertaRegistro" @miOk="alertaRegistro=false" @cancelado="alertaRegistro=false" titulo="Atención" :matricula="matricula" >
            ¿Estás seguro que quieres borrar el registro con id {{matricula}}?
        </dialog-alerta>
        <dialog-alerta v-if="alertaCurso" @miOk="alertaCurso=false" @cancelado="alertaCurso=false" titulo="Atención" :idcurso="idcurso">
            ¿Estás seguro que quieres quitarle el curso  {{curso}}?
        </dialog-alerta v-if>
        <dialog-registro v-if="alertaNuevoAlumno">
        </dialog-registro>
        <dialog-inscripciones v-if="alertaNuevaInscripcion">
        </dialog-inscripciones>
        <table class="table table-striped table-bordered ">
            <thead>
                <tr>
                    <th style="text-align: center">ID</th>
                    <th style="text-align: center">Matricula</th>
                    <th style="text-align: center">Nombre</th>
                    <th style="text-align: center">Apellido Paterno</th>
                    <th style="text-align: center">Apellido Materno</th>
                    <th style="text-align: center">Semestre Ingreso</th>
                    <th style="text-align: center">Creditos Cursados</th>
                    <th style="text-align: center">Cursos Asociados</th>
                    <th style="text-align: center">
                        <button type="button" class="btn btn-primary btn-default btn-sm" title="Nuevo Alumno" @click="confirmarNuevoAlumno">
                              <span class="glyphicon glyphicon-plus" aria-hidden="false">
                              </span>
                        </button>
                    </th>
                 </tr>
            </thead>
            <tbody>
                <tr v-for="e in estudiantes">
                    <td style="text-align: center">{{e.id}}</td>
                    <td style="text-align: center">{{e.matricula}}</td>
                    <td style="text-align: center">{{e.nombre}}</td>
                    <td style="text-align: center">{{e.apellidoPaterno}}</td>
                    <td style="text-align: center">{{e.apellidoMaterno}}</td>
                    <td style="text-align: center">{{e.semestreIngreso}}</td>
                    <td style="text-align: center">{{e.creditosCursados}}</td>
                    <td>
                        <div style="text-align: end; vertical-align: middle; ">
                            <button type="button" class="btn btn-info btn-default btn-sm" title="Inscribir en un curso" @click="confirmarNuevoInscripcion">
                              <span class="glyphicon glyphicon-plus" aria-hidden="false">
                              </span>
                            </button>
                        </div>
                        <p style="text-align: end" v-for="c in e.Cursos">
                            {{c.nombre}}
                            <button type="button" class="btn btn-default btn-sm"
                                        :title="'Dar de baja en el curso: '+c.nombre" @click="confirmarBorradoCurso(c.nombre,c.id)">
                                <span class="glyphicon glyphicon-remove" aria-hidden="false"></span>
                            </button>
                        </p>

                    </td>
                    <td>
                        <div style="text-align: center; ">
                            <button type="button" class="btn btn-danger btn-default btn-sm"
                                    :title="'Eliminar registro de matricula '+e.nombre" @click="confirmarBorradoRegistro(e.nombre)">
                              <span class="glyphicon glyphicon-remove" aria-hidden="false">
                              </span>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>`,
    mounted: function () {
        let resultados = null;
        fetch('http://localhost:4000/inscripciones',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).
        then(response => {
            return response.json();
        }).
        then(datos =>{
            datos.forEach(e => {
                if(!e.Cursos)
                    e.Cursos = [];

                e.Cursos.forEach(c => {
                    fetch(c.nombre,{
                        method:'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).
                    then(respCurso => {
                        return respCurso.json();
                    }).
                    then(datoCurso =>{
                        e.Cursos.push(datoCurso.nombre);
                    }).
                    catch(error => {
                        console.log(error);
                    });
                })
            })
            this.estudiantes = datos;
        }).
        catch(error => {
            console.log(error);
        });
    }
}
const miTablaCursos = {
    data: function () {
        return {
            cursos: [],
            alertaRegistro: false,
            alertaCurso: false,
            alertaNuevoCurso: false,
            matricula:0,
            curso:'',
            idcurso:0
        }
    },
    methods: {
      confirmarBorradoRegistro: function (m) {
          this.matricula = m;
          this.alertaRegistro = true;
      },
      confirmarBorradoCurso: function (c,id) {
            this.curso = c;
            this.idcurso = id;
            this.alertaCurso = true;
        },
      confirmarRegistroCursos: function (c) {
            this.curso = c;
            this.alertaNuevoCurso = true;
        }

    },
    components: {
        dialogAlerta: miAlertacursos,
        dialogRegistroCursos: miRegistroCursos
    },
    template: `
<div>
    <h4 style="text-align: center">
        <slot></slot>
    </h4>
    <div class="panel panel-default ">
        <dialog-alerta v-if="alertaRegistro" @ok="alertaRegistro=false" @cancelado="alertaRegistro=false" titulo="Atención">
            ¿Estás seguro que quieres borrar el registro con matrícula {{matricula}}?
        </dialog-alerta>
        <dialog-alerta v-if="alertaCurso" @ok="alertaCurso=false" @cancelado="alertaCurso=false" titulo="Atención" :idcurso="idcurso">
            ¿Estás seguro que quieres quitar el curso {{curso}}?
        </dialog-alerta>
        <dialog-registro-cursos v-if="alertaNuevoCurso">
        </dialog-registro-cursos>
        <table class="table table-striped table-bordered ">
            <thead>
                <tr>
                    <th style="text-align: center">ID</th>
                    <th style="text-align: center">Clave</th>
                    <th style="text-align: center">Nombre</th>
                    <th style="text-align: center">Creditos</th>
                    <th style="text-align: center">
                        <button type="button" class="btn btn-primary btn-default btn-sm" title="Nuevo Cursos" @click="confirmarRegistroCursos">
                              <span class="glyphicon glyphicon-plus" aria-hidden="false">
                              </span>
                        </button>
                    </th>
                 </tr>
            </thead>
            <tbody>
                <tr v-for="e in cursos">
                    <td style="text-align: center">{{e.id}}</td>
                    <td style="text-align: center">{{e.clave}}</td>
                    <td style="text-align: center">{{e.nombre}}</td>
                    <td style="text-align: center">{{e.creditos}}</td>

                    <td>
                        <div style="text-align: center; ">
                            <button type="button" class="btn btn-danger btn-default btn-sm"
                                    :title="'Eliminar registro de matricula '+e.nombre" @click="confirmarBorradoCurso(e.nombre,e.id)">
                              <span class="glyphicon glyphicon-remove" aria-hidden="false">
                              </span>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>`,
    mounted: function () {
        let resultados = null;
        fetch('http://localhost:4000/cursos',{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).
        then(response => {
            return response.json();
        }).
        then(datos =>{
            datos.forEach(e => {
                if(!e.cursosNombre)
                    e.cursosNombre = [];
                e.cursosNombre.forEach(c => {
                    fetch(c,{
                        method:'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).
                    then(respCurso => {
                        return respCurso.json();
                    }).
                    then(datoCurso =>{
                        e.cursosNombre.push(datoCurso.nombre);
                    }).
                    catch(error => {
                        console.log(error);
                    });
                })
            })
            this.cursos = datos;
        }).
        catch(error => {
            console.log(error);
        });
    }
}

const app = new Vue({
    el:'#miApp',
    data: {
      alerta: false
    },
    components: {
        miTablaEstudiantes: miTablaEstudiantes,
        miTablaCursos: miTablaCursos,
        miAlerta: miAlerta,
        miAlerta2: miAlerta2,
        miRegistro: miRegistro,
        miRegistroInscripciones: miRegistroInscripciones
    }
});
