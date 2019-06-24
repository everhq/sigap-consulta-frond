import React from 'react'
import {browserHistory} from 'react-router-3';
import CONFIG from '../Configuracion/Config'
import swal from 'sweetalert';
import Tramite from './formularioRegistroTramites'
import TableHeaderTramite from './Table-Header-Tramite'
class TramiteRow extends React.Component{
    constructor(props){
        super(props)
      

        
    }
    enviarFormulario=(e)=>{

        browserHistory.push('/tramite/'+this.props.codigo+'&'+this.props.numero);
        e.preventDefault();
    }
    
    render(){
        return(
        
            <tr>
            <td className="td">{this.props.numero+1}</td>
            <td className="td">{this.props.lista.desc_tipotramite}</td>
             <td className="td">{this.props.lista.fecha_expediente}</td>
             <td className="td">
                <form action="#">
                    <label className=" ">
                    <button type="submit" onClick={this.enviarFormulario}   className="waves-effect waves-light btn-small">EDITAR</button>
                    </label>

                    </form>

            </td>         

        </tr>     
            

           
              
        )
    }




}

export default TramiteRow