import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import io from 'socket.io-client'
import {useState, useEffect} from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';



const Formulario = ({ recibirDatosFormulario }) => {
  
  const [nombre, setNombre] = useState('')
  //const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  
  const login = (e) => {
  
    console.log(nombre)
    const datos ={
      name: nombre, 
      pass: pass
    //  email: email
    }
    e.preventDefault()
    //Envirar datos a App.js para que los envie al servidor
    recibirDatosFormulario(datos)
  }
  


  
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-dark">
    <div className="col-md-7">
      <div className="text-center mb-5">
        <h1 className="text-light">Iniciar Sesión</h1>
      </div>
      <form onSubmit={login}>
  
        <div className="form-group d-flex align-items-center">
          <label htmlFor="formName" className="from-group text-light m-3 mr-2">
            Nombre:
          </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresa tu nombre"
              value={nombre}
              onChange={e=> setNombre(e.target.value)}

            />
         
        </div>
		{ /*
        <div className="form-group d-flex align-items-center">
          <label htmlFor="formEmail" className=" from-group text-light m-3 mr-2">
            Email:
          </label>
            <input
              type="email"
              className="form-control"
              id="formEmail"
              placeholder="Ingresa tu email"
              value={email}
              onChange={e=> setEmail(e.target.value)}
            />
        </div>
		*/}
        <div className="form-group d-flex align-items-center">
          <label htmlFor="formPassword" className="text-light m-3 mr-2">
            Contraseña:
          </label>
            <input
              type="password"
              className="form-control"
              id="formPassword"
              placeholder="Ingresa tu contraseña"
              value={pass}
              onChange={e=> setPass(e.target.value)}
            />
        </div>
  
        <button type="submit" className="btn btn-danger btn-block mt-4">
          Iniciar Sesión
        </button>          
      </form>
      <form>
        <div className="text-center mt-4">
          <p className="text-secondary">o inicia sesión con</p>
          <button type="button" className="btn">
          <GoogleOAuthProvider clientId="967488053801-vtd7otb0c6g98pmn9efert0qej7oeooa.apps.googleusercontent.com">
            <GoogleLogin
                  type="button" 
                  onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  
                   //Envirar datos a App.js para que los envie al servidor
                    recibirDatosFormulario(credentialResponse)
                  }}
                  onError={() => {
                  console.log('Login Failed');
                  }}
            />

          </GoogleOAuthProvider>


          </button>
        </div>
      </form>


    </div>
  </div>  
  );
}

export default Formulario;
