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
        tipoB:[],
        lista:[],
        listas:[],
        listasB:[],
        OpcionTramite:null,
        OpcionBeneficio:null,
        valorTipo:'',
        valorTipoB:'',
        apt:'',
        idprograma:8,
        selectedOption: '',
      }
      this.guardar=this.guardar.bind(this)
      this.handleChangeTipoTramite=this.handleChangeTipoTramite.bind(this)
      this.handleChangeBeneficio=this.handleChangeBeneficio.bind(this)
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
        var array=this.state.id.split("&",2)
        var  codigo=parseInt(array[0])
        fetch(CONFIG+'/beneficio/listar/' +codigo)
        .then((response)=>{
            return response.json()
        }).then((listasb)=>{
            console.log("listasb--->"+codigo);
            console.log(listasb);
            var array=[];

            for(var i=0;i<listasb.length;i++){
                var e={value:listasb[i].benef_otrogado,label:listasb[i].benef_otrogado}
                array.push(e);

            }

            this.setState({
                tipoB:array,
                listasB:listasb
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
                
                
                //document.getElementById("id_tipotramite").value=datos[lista].id_tipotramite;
                document.getElementById("n_tramite").value=datos[lista].n_tramite;
                //document.getElementById("id_apb").value=datos[lista].id_apb;
                document.getElementById("anio_tramite").value=datos[lista].anio_tramite;
                document.getElementById("usuario_emision").value=datos[lista].usuario_emision;
                document.getElementById("fecha_emision").value=datos[lista].fecha_emision;
                document.getElementById("n_oficio").value=datos[lista].n_oficio;
                document.getElementById("fecha_oficio").value=datos[lista].fecha_oficio;
                document.getElementById("anio_oficio").value=datos[lista].anio_oficio;
                document.getElementById("n_expediente").value=datos[lista].n_expediente;
                document.getElementById("fecha_expediente").value=datos[lista].fecha_expediente;
                document.getElementById("importe_oficio").value=datos[lista].importe_oficio;
                document.getElementById("importe_matricula_epg").value=datos[lista].importe_matricula_epg;
                document.getElementById("importe_otros").value=datos[lista].importe_otros;
                document.getElementById("importe_total").value=datos[lista].importe_total;
                
                this.setState({
                    OpcionTramite:{value:datos[lista].desc_tipotramite,label:datos[lista].desc_tipotramite},
                    OpcionBeneficio:{value:datos[lista].beneficio_otorgado,label:datos[lista].beneficio_otorgado},
                    valorTipo:this.leertipo(datos[lista].desc_tipotramite),
                    valorTipoB:this.leertipoB(datos[lista].beneficio_otorgado),
                    
                    apt:datos[lista].id_apt,
                    //idprograma:datos[lista].id_programa
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
                //document.getElementById("id_tipotramite").value=this.state.listas[i].id_tipotramite;
            }
            console.log('---->'+this.state.listas[i].desc_tipotramite+'=='+Opcion.value);
        }
            this.setState({OpcionTramite:Opcion,
            valorTipo:this.leertipo(Opcion.value),
        });

        console.log("xd--")
        

        }else swal("Escoja un beneficio","","warning")
    }

    handleChangeBeneficio=(Opcion)=>{
        if(Opcion!=null){

        console.log("Opcion elegida B : ",Opcion);
        for(let i=0;i<this.state.listasB.length;i++){
            if(this.state.listasB[i].benef_otrogado==Opcion.value){
                //document.getElementById("id_apb").value=this.state.listasB[i].id_apb;
            }
            console.log('---->'+this.state.listasB[i].benef_otrogado+'=='+Opcion.value);
        }
            this.setState({OpcionBeneficio:Opcion,
            valorTipoB:this.leertipoB(Opcion.value),
        });

        console.log("xd--")
        

        }else swal("Escoja un beneficio","","warning")
    }
    habilitar(){
        
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

    leertipoB(valor){
        let id_tipo='';
        for(let i=0; i<this.state.listasB.length;i++){
            if(valor==this.state.listasB[i].benef_otrogado){
                 id_tipo=i;
            }
        }
        return id_tipo + 1;
    }
    
    guardar(){

        
        var n_tramite=document.getElementById("n_tramite").value;
        //var id_tipotramite=document.getElementById("id_tipotramite").value;
        //var id_apb=document.getElementById("id_apb").value;
        var anio_tramite=document.getElementById("anio_tramite").value;
        var usuario_emision=document.getElementById("usuario_emision").value;
        var fecha_emision=document.getElementById("fecha_emision").value.replace(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/g,'$3-$2-$1');
        var n_oficio=document.getElementById("n_oficio").value;
        var fecha_oficio=document.getElementById("fecha_oficio").value.replace(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/g,'$3-$2-$1');        
        var anio_oficio=document.getElementById("anio_oficio").value;
        var n_expediente=document.getElementById("n_expediente").value;
        var fecha_expediente=document.getElementById("fecha_expediente").value.replace(/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/g,'$3-$2-$1');
        var importe_oficio=document.getElementById("importe_oficio").value;
        var importe_matricula_epg=document.getElementById("importe_matricula_epg").value;
        var importe_otros=document.getElementById("importe_otros").value;
        var importe_total=document.getElementById("importe_total").value;
        

        console.log("xdddd  "+this.state.lista);
        //console.log("cod_alumno : "+cod_alumno);
        
        //console.log("id_tipotramite "+id_tipotramite);
        //console.log("id_apb "+id_apb);
        console.log("n_expediente "+n_expediente);
        console.log("fecha_expediente : "+fecha_expediente);


        if(this.state.valorTipo!="" /*&& fecha_expediente!=""*/){
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
                        "cod_alumno":this.state.codigo2,
                        "id_tipotramite":this.state.valorTipo,
                        "n_tramite":n_tramite,
                        "anio_tramite": anio_tramite,
                        "usuario_emision": usuario_emision,
                        "fecha_emision": fecha_emision,
                        "n_oficio":n_oficio,
                        "fecha_oficio": fecha_oficio,
                        "anio_oficio": anio_oficio,
                        "id_apb":this.state.valorTipoB,
                        "n_expediente":n_expediente,
                        "fecha_expediente":fecha_expediente,
                        "importe_oficio":importe_oficio,
                        "importe_matricula_epg": importe_matricula_epg,
                        "importe_otros": importe_otros,
                        "importe_total": importe_total,
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
                        "cod_alumno":this.state.codigo2,
                        "id_tipotramite":this.state.valorTipo,
                        "n_tramite":n_tramite,
                        "anio_tramite": anio_tramite,
                        "usuario_emision": usuario_emision,
                        "fecha_emision": fecha_emision,
                        "n_oficio":n_oficio,
                        "fecha_oficio": fecha_oficio,
                        "anio_oficio": anio_oficio,
                        "id_apb":this.state.valorTipoB,
                        "n_expediente":n_expediente,
                        "fecha_expediente":fecha_expediente,
                        "importe_oficio":importe_oficio,
                        "importe_matricula_epg": importe_matricula_epg,
                        "importe_otros": importe_otros,
                        "importe_total": importe_total,
                        
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

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }
    render() {
        const { selectedOption } = this.state;
  	const value = selectedOption && selectedOption.value;
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
                        <Select 
                        value={value}
                        onChange={this.handleChange}
                        options={[
                          { value: 'one', label: 'SI' },
                          { value: 'two', label: 'NO' },
                        ]}
                        />
                        </div>
                    </div>
                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Número:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="text" id="n_tramite" /></div>
                        </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Año:</h6></div>
                        <div className="col-md-9 "><input className="estilo" type="text" id="anio_tramite" /></div>
                        </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Usuario:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="text" id="usuario_emision" /></div>
                        </div>
                    
                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Fecha:</h6></div>
                        <div className="col-md-9 "><input  className="estilo" type="date" id="fecha_emision" /></div>
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
                        <div className="col-md-3"><h6 >Año Oficio:</h6></div>
                        <div className="col-md-9 "><input className="estilo" type="text" id="anio_oficio" /></div>
                        </div>
                    
                    <div className="row sombra">
                        <div className="col-md-3"><h6 >N° Expediente:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="text" id="n_expediente" /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Fecha Expediente:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="date" id="fecha_expediente" /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Beneficio %:</h6></div>
                        <div className="col-md-9 ">
                        <Select
                            value={this.state.OpcionBeneficio}
                            options={this.state.tipoB}
                            onChange={this.handleChangeBeneficio}

                            />
                        </div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Importe a pagar S/:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_oficio" /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >EPG S/:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_matricula_epg" /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Otros pagos S/:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_otros" /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Pago total S/:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_total"/></div>
                    </div>

                    

                   
                    <div className="row">

                            <div className=" col-md-6">
                                <button  onClick={this.guardar} className="  waves-effect waves-light btn-large botonazul2  " type="submit">Guardar<i className=" material-icons left">save</i></button>
                            </div>


                    </div>


                    </div>


               
                        
                </div>


            
          );
    }
  }
  
  export default Tramite;