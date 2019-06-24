import React from 'react'
import Formulario from './formulario'
import TramiteRow from './tramite-row'
import TramiteHeader from './tramite-header'
import {browserHistory} from 'react-router-3';
class TramiteList extends React.Component{

    
        


    render(){
        if(this.props.lista.length >0){
        return(
            
           <div className="">     
            <table className="table">
            <TramiteHeader/>
                <tbody>
                {
                    this.props.lista.map((tramite,key)=>{
                      // this.state.arreglo.push(key)
                        return (
                            
                            <TramiteRow lista={tramite} numero={key} codigo={this.props.codigo}/>
                            
                         )
                        
                        
                    })
                    
                    
                }

            </tbody>
            </table>
            </div>
            
        ) }    
        else {
            return <div className="mensaje central">No hay datos que mostrar</div>
        }
        }
        
}
export default TramiteList