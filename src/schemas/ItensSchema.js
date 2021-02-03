export default ItensSchema = {
  name: "Itens",
  primaryKey:'id',   
  properties: {
    id: { type: "int", indexed: true },
    numberCollect: "string",
    numberEquipament: "string",
    element: "string",
    value: "string",
  },
};
