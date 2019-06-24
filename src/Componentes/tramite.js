import React from 'react';
import {browserHistory} from 'react-router-3';
import swal from 'sweetalert'
import CONFIG from '../Configuracion/Config'
import Select from 'react-select';
import '../App.css'

class Tramite extends React.Component {
    constructor(props) {
      super(props)
      this.state={
        codigo2:'',
        codigo:this.props.params.name,
        id:this.props.params.name,
        tipo:[],
        lista:[],
        listas:[],
        OpcionTramite:null,
        valorTipo:'',
        apt:'',
        idprograma:8,
      }
      this.guardar=this.guardar.bind(this)
      this.handleChangeTipoTramite=this.handleChangeTipoTramite.bind(this)
    }
    
    componentWillMount(){

        fetch(CONFIG+'/tramite/tipo')
        .then((response)=>{
            return response.json()
        }).then((listas)=>{
            console.log("listas");
            console.log(listas);
            var array=[];

            for(var i=0;i<listas.length;i++){
                var e={value:listas[i].desc_tipotramite,label:listas[i].desc_tipotramite}
                array.push(e);

            }

            this.setState({
                tipo:array,
                listas:listas
            });
        })
        .catch(error=>{
            console.error(error)
        });

    }

    componentDidMount(){
        var array=this.state.id.split("&",2)
        var  codigo=parseInt(array[0])
        var lista=parseInt(array[1])
        this.setState({
            lista:lista,
            codigo2:codigo
        })

        console.log(this.state.lista)
        fetch(CONFIG+'/tramite/listar/' + codigo)

        .then((response)=>{
            return response.json()
        }).then((datos)=>{

                //console.log("xdddid222"+datos[lista].id_abp)                
                document.getElementById("cod_alumno").value=datos[lista].cod_alumno;
                document.getElementById("id_programa").value=datos[lista].id_programa;
                document.getElementById("id_tipotramite").value=datos[lista].id_tipotramite;
                document.getElementById("id_apb").value=datos[lista].id_apb;
                document.getElementById("n_expediente").value=datos[lista].n_expediente;
                document.getElementById("fecha_expediente").value=datos[lista].fecha_expediente;
                
                this.setState({
                    OpcionTramite:{value:datos[lista].desc_tipotramite,label:datos[lista].desc_tipotramite},
                    
                    valorTipo:this.leertipo(datos[lista].desc_tipotramite),
                    
                    apt:datos[lista].id_apt,
                    idprograma:datos[lista].id_programa
                })
                console.log("xdddid-componentDidMount"+datos[lista].id_apt)


        })
        .catch(error=>{
            console.error(error)
        });

    }


    handleChangeTipoTramite =(Opcion)=>{
        if(Opcion!=null){

        console.log("Opcion elegida : ",Opcion);
        for(let i=0;i<this.state.listas.length;i++){
            if(this.state.listas[i].desc_tipotramite==Opcion.value){
                document.getElementById("id_tipotramite").value=this.state.listas[i].id_tipotramite;
            }
            console.log('---->'+this.state.listas[i].desc_tipotramite+'=='+Opcion.value);
        }
            this.setState({OpcionTramite:Opcion,
            valorTipo:this.leertipo(Opcion.value),
        });

        console.log("xd--")
        

        }else swal("Escoja un beneficio","","warning")
    }
    habilitar(){
        document.getElementById("cod_alumno").disabled=false;
        document.getElementById("id_programa").disabled=false;
        document.getElementById("fecha_expediente").disabled=false;
        document.getElementById("n_expediente").disabled=false;

    }

    leertipo(valor){
        let id_tipo='';
        for(let i=0; i<this.state.listas.length;i++){
            if(valor==this.state.listas[i].desc_tipotramite){
                 id_tipo=i;
            }
        }
        return id_tipo + 1;
    }
    
    guardar(){

        var cod_alumno=document.getElementById("cod_alumno").value;
        var id_programa=document.getElementById("id_programa").value;
        var id_tipotramite=document.getElementById("id_tipotramite").value;
        var id_apb=document.getElementById("id_apb").value;
        var n_expediente=document.getElementById("n_expediente").value;
        var fecha_expediente=document.getElementById("fecha_expediente").value.replace(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/g,'$3-$2-$1');
    

        console.log("xdddd  "+this.state.lista);
        console.log("cod_alumno : "+cod_alumno);
        console.log( "id_programa"+ id_programa);
        console.log("id_tipotramite "+id_tipotramite);
        console.log("id_apb "+id_apb);
        console.log("n_expediente "+n_expediente);
        console.log("fecha_expediente : "+fecha_expediente);


        if(this.state.valorTipo!="" && fecha_expediente!=""){
         console.log("la lista fake de sator "+this.state.lista)
        
         if(this.state.apt >= 0){
               console.log("entro we  crear"+this.state.lista)
               fetch(CONFIG+"tramite/insertar", // "http://localhost:8080/"
                {
                headers: {
                'Content-Type': 'application/json'
                },
                method: "POST",
                    body: JSON.stringify(
                    {
                        "cod_alumno":cod_alumno,
                        "id_programa": id_programa,
                        "id_tipotramite":this.state.valorTipo,
                        "id_apb":id_apb,
                        "n_expediente":n_expediente,
                        "fecha_expediente":fecha_expediente,
                        "id_apt":this.state.apt,
                    }

                )
                })

                .then((resp) => {
                    console.log(resp)

                    if(resp){
                        swal("guardado exitoso...!","","success")
                        console.log("funciona beneficio");
                        console.log("fecha_expediente : "+fecha_expediente);
                    }
                    else{
                        swal("Oops, el beneficio no fue editado", "","error");
                    }


                })
                .catch(error => {

                swal("Oops, Algo salió mal!!", "","error")
                console.error(error)
                });
            } else{
                console.log("entro we update "+this.state.lista)
                fetch(CONFIG+"tramite/insertar", // "http://localhost:8080/"
                {
                headers: {
                'Content-Type': 'application/json'
                },
                method: "POST",
                    body: JSON.stringify(
                    {
                        "cod_alumno":cod_alumno,
                        "id_programa": id_programa,
                        "id_tipotramite":this.state.valorTipo,
                        "id_apb":id_apb,
                        "n_expediente":n_expediente,
                        "fecha_expediente":fecha_expediente,
                        
                    }

                )
                })

                .then((resp) => {
                    console.log("need a little: "+resp)

                    if(resp){
                        swal("guardado exitoso...!","","success")
                        console.log("funciona beneficio");

                    }
                    else{
                        swal("Oops, El beneficio no fue ingresado!!", "","error");
                    }


                })
                .catch(error => {

                swal("Oops, Algo salió mal!!", "","error")
                console.error(error)
                });

    }
    
    }else{ swal("Tiene que completar todos los campos", "","warning")}
    }

  Regresar=(e)=>{
    
      browserHistory.push('/vista/tramite-m/'+this.state.codigo2);
      console.log('MIRAA'+this.state.codigo)
      e.preventDefault();
  }
    render() {
        return (
          <div>
                <div >
                    <h3>Formulario de Trámites
                    <ul id="nav-mobile" className="row right hide-on-med-and-down">
                        <li><a className="col seleccionar" onClick={this.Regresar}>Regresar<i className="material-icons right">reply</i></a></li>
                    </ul>
                    </h3>
                </div>


                <div className="container" >

                    <div className="row ">
                        <div className="col-md-12"><h4 >Datos del Trámite</h4></div>
                    </div>


                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Trámite:</h6></div>
                        <div className="col-md-9 ">
                        <Select
                            value={this.state.OpcionTramite}
                            options={this.state.tipo}
                            onChange={this.handleChangeTipoTramite}

                            />
                        </div>
                    </div>
                    <div className="row sombra">    
                        <div className="col-md-3"><h6 >Digitalizado:</h6></div>
                        <div className="col-md-9 ">
                        <Select>
                        <option value="A" selected="1">"Si"</option>
                        <option value="B">"No"</option>
                        </Select>
                        </div>
                    </div>
                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Codigo Alumno:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="text" id="cod_alumno" /></div>
                        </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >ID Programa:</h6></div>
                        <div className="col-md-9 "><input className="estilo" type="number" id="id_programa" /></div>
                        </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >ID tipo tramite:</h6></div>
                        <div className="col-md-9 "><input  className="estilo" type="number" id="id_tipotramite" disabled/></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >ID APB:</h6></div>
                        <div className="col-md-9 "><input className="estilo" type="number" id="id_apb" /></div>
                        </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >N° Expediente:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="text" id="n_expediente" /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Fecha Expediente:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="date" id="fecha_expediente" /></div>
                    </div>

                    <div className="row">

                            <div className=" col-md-6">
                                <button  onClick={this.guardar} className="  waves-effect waves-light btn-large botonazul2  " type="submit">Guardar<i className=" material-icons left">save</i></button>
                            </div>


                    </div>


                    </div>

{/*

    <div className="container" >

    <div className="row ">
        <div className="col-md-12"><h4 >Datos del Trámite</h4></div>
    </div>

    
    <div className="row sombra">
        <div className="col-md-3"><h6 >Trámite:</h6></div>
        <div className="col-md-9 ">
        <Select
            value={this.state.OpcionTramite}
            options={this.state.tipo}
            onChange={this.handleChangeTipoTramite}

            />
        </div>
    </div>
    <div className="row sombra">    
        <div className="col-md-3"><h6 >Digitalizado:</h6></div>
        <div className="col-md-9 ">
          <Select>
          <option value="A" selected="1">"Si"</option>
          <option value="B">"No"</option>
          </Select>
        </div>
    </div>
    <div className="row sombra">
        <div className="col-md-3"><h6 >Número:</h6></div>
        <div className="col-md-9"><input className="estilo" type="text" id="numero" /></div>
        </div>

    <div className="row sombra">
        <div className="col-md-3"><h6 >Año:</h6></div>
        <div className="col-md-9 "><input className="estilo" type="text" id="año" /></div>
        </div>
    
    <div className="row sombra">
        <div className="col-md-3"><h6 >Fecha:</h6></div>
          <div className="col-md-9 "><input  className="estilo" type="date" id="fecha" /></div>
    </div>

    <div className="row sombra">
        <div className="col-md-3"><h6 >N° Oficio:</h6></div>
        <div className="col-md-9 "><input className="estilo" type="text" id="n_oficio" /></div>
        </div>
        
    <div className="row sombra">
        <div className="col-md-3"><h6 >Fecha Oficio:</h6></div>
        <div className="col-md-9 "><input  className="estilo" type="date" id="fecha_oficio" /></div>
    </div>
    
    <div className="row sombra">
        <div className="col-md-3"><h6 >N° Expediente:</h6></div>
        <div className="col-md-9"><input className="estilo" type="text" id="n_expediente" /></div>
    </div>

    <div className="row sombra">
        <div className="col-md-3"><h6 >Importe a pagar:</h6></div>
        <div className="col-md-9"><input className="estilo" type="text" id="importe_pagar" /></div>
    </div>

    <div className="row sombra">
        <div className="col-md-3"><h6 >EPG:</h6></div>
        <div className="col-md-9"><input className="estilo" type="text" id="epg" /></div>
    </div>

    <div className="row sombra">
        <div className="col-md-3"><h6 >Otros pagos:</h6></div>
        <div className="col-md-9"><input className="estilo" type="text" id="otros_pagos" /></div>
    </div>

    <div className="row sombra">
        <div className="col-md-3"><h6 >Pago total:</h6></div>
        <div className="col-md-9"><input className="estilo" type="text" id="pago_total" placeholder="" disabled/></div>
    </div>

    <div className="row sombra">
        <div className="col-md-3"><h6 >Costo del Programa:</h6></div>
        <div className="col-md-9"><input className="estilo" type="text" id="costo_programa" /></div>
    </div>
    
    <div className="row">

            <div className=" col-md-6">
                <button  onClick={this.guardar} className="  waves-effect waves-light btn-large botonazul2  " type="submit">Guardar<i className=" material-icons left">save</i></button>
            </div>


    </div>


    </div>*/
}
               
                        
                </div>


            
          );
    }
  }
  
  export default Tramite;