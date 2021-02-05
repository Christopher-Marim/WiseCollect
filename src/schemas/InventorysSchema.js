export default InventorysSchema = {
  name: "Inventorys",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    nome: "string",
    dateAt: "date",
    itens: "ItensInventory[]",
  },
};
