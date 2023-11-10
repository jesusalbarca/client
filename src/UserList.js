// En el cliente
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: new Map() };
  }

  componentDidMount() {
    // Conectar con el servidor y recibir el objeto Map de usuarios
    socket.on("users", (usersJSON) => {
      var usersArray = JSON.parse(usersJSON);
      var users = new Map(usersArray);
      this.setState({ users: users });
    });
  }

  render() {
    // Crear una lista de elementos <li> con los nombres de los usuarios
    var userListItems = Array.from(this.state.users.values()).map((user) => (
      <li key={user.id}>{user.name}</li>
    ));

    // Renderizar la lista de usuarios
    return (
      <div>
        <h2>Lista de usuarios:</h2>
        <ul>{userListItems}</ul>
      </div>
    );
  }
}

ReactDOM.render(<UserList />, document.getElementById("root"));
