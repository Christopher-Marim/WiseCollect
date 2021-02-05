export default ItensInventorySchema = {
  name: "ItensInventory",
  primaryKey:'id',   
  properties: {
    id: { type: "int", indexed: true },
    cod: "string",
    qtd: "string",
    desc: "string",
    value: "string",
    info1:"string",
    info2:"string",
    info3:"string",
  },
};
