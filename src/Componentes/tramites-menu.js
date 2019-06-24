import React, { Component } from 'react'
import {browserHistory} from 'react-router-3';
import TramiteList from './tramite-list';
import CONFIG from '../Configuracion/Config'

export default class tramitesMenu extends Component {
    
    constructor(props){
        super(props)
        this.state={
          listas:[],
            codigo: this.props.params.name,
        }

        this.enviarFormulario=this.enviarFormulario.bind(this)
        this.Regresar=this.Regresar.bind(this)
    }

    componentWillMount() {
      fetch(CONFIG+'/tramite/listar/' + this.state.codigo)
      .then((response)=>{
          return response.json()
      })
      .then((tramite)=>{
          console.log("lista de tramites");
              console.log(tramite);
          this.setState({listas:tramite})
      })
      .catch(error=>{
          console.error(error)
      });
  }

    enviarFormulario=(e)=>{

        browserHistory.push('/tramite/'+this.state.codigo+'&'+"");
        e.preventDefault();
    }
    Regresar=(e)=>{
        browserHistory.push('/'+this.state.codigo);
        e.preventDefault();
    }
    render() {
      return (
        <div>
          <div >
                    <h3>Lista de Tramites
                    <ul id="nav-mobile" className="row right hide-on-med-and-down">
                        <li><a className="col seleccionar" onClick={this.Regresar}>Regresar<i className="material-icons right">reply</i></a></li>
                    </ul>
                    </h3>
                </div>
        
        <div className="container">
  
        <div className="row center-xs centrar ">
            <div className="center-xs-12 margin_top ">
                <TramiteList lista={this.state.listas} codigo={this.state.codigo} />
            </div>
        </div>
          
        <div className="row center-xs"> 
        <div className="col ">
        <button  onClick={this.enviarFormulario} className="  waves-effect waves-light btn-small botonazul2  " type="submit">Agregar<i className=" material-icons left">add</i></button>
        </div>
        </div>
        </div>
        </div>
      )
    }
}
