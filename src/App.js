import './App.css';
import io from 'socket.io-client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from 'react'
import Formulario from './Formulario'; 
const socket = io('http://4.178.97.147:4000')

function App() {

  const [mensaje, setMensaje] = useState('')
  const [mensajes, setMensajes] = useState([])
  const [route, setRoute] = useState(true)
  const [usuario, setUsuario] = useState({})
  const [users, setUsers] = useState([])

  const enviarMensaje = (e) => {
    e.preventDefault()
	if (mensaje.trim() === '') {
      // setError('Por favor, escribe un mensaje antes de enviar.');
		//caputar error en un futuro
		console.log(mensaje)
	} else {
		socket.emit('mensaje', mensaje)
		//Para mostrar el mensaje que envia el usuario (el servidor lo envia a los otros usuarios)
		const newmensaje = {
		  body: mensaje,
		  mio: true
		//  user: "yo" //yo
		}
		setMensajes([...mensajes,newmensaje])
		setMensaje('')
	}
  }

  //Esuchar enventos que llegan dle servidor para rendereizar los mensajes,etc (manejar el front) 
  useEffect(()=>{

    const recibirMensaje = mensaje => {
      console.log(mensaje)
      setMensajes([...mensajes, mensaje])
    }
 
    socket.on('mensaje', recibirMensaje)


    socket.on('usuario_info', usuario => {
      console.log(usuario)
      usuario.socketid = socket.id;
      console.log("SOCKET ON USUARIO_INFO: ")
      console.log(usuario.name)
      setUsuario(usuario)
    
    
    })
    
    socket.on('BienvenidoUser', datos_usuario=> {
    //enviar nuevo mensaje (luego controlar que sea en el chat general)
    //lo reciben todos menos el nuevo usuario
      let mensaje_bienbenido = datos_usuario.name + " se ha unido a chat general";
      let nuevo_mensaje = {
        body:mensaje_bienbenido,
        bienvenido:true, 
		sehaido:false
      }
      setMensajes([...mensajes, nuevo_mensaje])
    });
	
	 socket.on('AdiosUser', datos_usuario=> {
    //enviar nuevo mensaje (luego controlar que sea en el chat general)
    //lo reciben todos menos el nuevo usuario
      let mensaje_adios = datos_usuario.name + " ha abandonado la Sala :(";
      let nuevo_mensaje = {
        body:mensaje_adios,
        bienvenido:true,
		sehaido:true		
      }
      setMensajes([...mensajes, nuevo_mensaje])
    });

    socket.on('usuariosJSON', users=> {
    //para mostrar la lista de usuarios conectados
    console.log(JSON.parse(users));
    setUsers(JSON.parse(users));
    });
    //lo reciben todos los usuarios (io-emit)

  //  socket.on('login_success', mostrar_chat_general)

  }, [mensajes, users])


  // Función de callback para recibir los datos de Formulario.js y para enviarlos al servidor
  const recibirDatosFormulario = (datos) => {
    socket.emit('nuevo_usuario', datos)
    console.log(datos)
  
    //cambiar a chat general (en verdar mejor hacerlo si todo ha ido bien)
    setRoute(false)
  }



  {/* Mostrar mensajes enviados por todos los usuarios */}
  const Chat = () => {
    return (
      <div className="container">
        {/* Mostrar mensajes enviados por todos los usuarios */}

        {mensajes.map((mensaje, index) => (
          !mensaje.bienvenido ?
          <div
            className={
              mensaje.mio === true
                ? "container alert alert-primary text-left"
                : "container alert alert-secondary text-right"
            }
            key={index}
            style={{
              marginRight: mensaje.mio === true ? "0" : "auto", // Alinear a la derecha si no es del usuario "yo"
              marginLeft: mensaje.mio === true ? "auto" : "0", // Alinear a la izquierda si es del usuario "yo"
              maxWidth: "40%", // Establecer un ancho máximo para evitar que los mensajes sean demasiado anchos
            }}
          >
            {mensaje.mio && 
              <p className={mensaje.mio === true ? "text-black" : ""}>
              {mensaje.body}
             </p>
            }
             {!mensaje.mio && 
              <p className={mensaje.mio === true ? "text-black" : ""}>
              {mensaje.user}: {mensaje.body}
             </p>
              }
              
          </div>
        :  
		mensaje.sehaido ?
		
		 <div  key={index}>
              <p className="container alert alert-danger">
                {mensaje.body}
             </p>
          </div>
		:
		    <div  key={index}>
              <p className="container alert alert-info">
                {mensaje.body}
             </p>
          </div>
        ))}
        
      </div>
    );
  };


  

  return (
    <div className="App">
	
      {route && <div>
        {/* Otros componentes o contenido de la aplicación */}
        <Formulario recibirDatosFormulario={recibirDatosFormulario} /> {/* Añade el formulario como un componente */}
	   </div>
	  }
      
     
		
		
          
      {!route &&     
	  
	  <div className="App">

       
		  
		  
	  <h1>Bienvenido {usuario.name}</h1>

      <div className="container mt-5">
          <select className="">
            {/* Mostrar lista de usuarios conectados */}
            {console.log(usuario.socketid)}
            {console.log(users[0])}
            <option key="dafdafsfda" defaultValue={"Chat General"}>
                  {"Chat general"} (en uso)
            </option>
            {users.map((user, index) => {
              if (usuario.socketid === user[0]) {
				      return (
                    <option key={index} value={user[0]}>
                  {user[1].name} (No puedes hablar contigo mismo!!)
                  </option>
                );
             
              } else {
                return (
                  <option key={index} value={user[0]}>
                  {user[1].name}
                  </option>
                );
                }
            })}
          </select>
		  
        </div>
		
<div className="container mt-5">
  <h2>Chat General</h2>
  {Chat()}
  {/*newUsuarioSala()*/}
 
                <form className="form-group d-flex align-items-center" onSubmit={enviarMensaje}>

    <input
      type="text"
      onChange={e => setMensaje(e.target.value)}
      className="form-control"
      placeholder="Escribe un mensaje..."
      value={mensaje}
      style={{ marginRight: '13px' }} // Añade un margen de 5px entre el input y el botón
    />
    <button type="submit" className="btn btn-primary">
      Enviar
    </button>
	              </form>


</div>


		  
		  
		  
		  
		  
		  
        </div>


        }

    </div>
    
  );
}

export default App;
//https://www.youtube.com/watch?v=C1_Rw_H7Q3A
