export default CollectsSchema = {
  name: 'Collects',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    nome: 'string',
    dateAt: 'date',
    itens: 'Itens[]',
  },
};
