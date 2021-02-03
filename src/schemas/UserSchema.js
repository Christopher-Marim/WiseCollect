export default UserSchema = {
    name: "User",
    primaryKey: "id",
    properties: {
      id: { type: "int", indexed: true },
      nome: "string",
      email: "string",
      senha: "string",
      token:"string",
      logado:'bool'
    },
  };
  