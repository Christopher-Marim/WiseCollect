

const inicialState = {
  refresh: false,
  currentID: null,
  currentIDitem: null,
  collects: [],
};

const reducer = (state = inicialState, action) => {

  switch (action.type) {
    case "ADD_COLLECT":
      const collect = {
        id: Math.random(),
        nome: action.payload[0],
        dateAt: action.payload[1],
        itens: [],
      };
      
      return ({
        ...state,
        collects: [...state.collects, collect],
      });
      
    case "DEL_COLLECT":
      let indexCollectToRemove = state.collects.findIndex(
        (x) => x.id == action.payload[0]
      );
      state.collects.splice(indexCollectToRemove, 1);
      return { ...state, collects: [...state.collects]};

    case "EDIT_COLLECT":
      return {
        ...state,
        collects: [
          ...state.collects.map((item, index) => {
            if (index === action.payload[0]) {
              return {
                ...item,
                nome: action.payload[1],
              };
            }
            return item;
          }),
        ],
      };

    case "CURRENT_ID":
      
      return {
        ...state,
        currentID: action.payload[0],
      };
    case "CURRENT_ID_ITEM":
      
      return {
        ...state,
        currentIDitem: action.payload[0],
      };
    case "ADD_ITEM":
        const item = {
          id: Math.random(),
          numberCollect: action.payload[1],
          numberEquipament: action.payload[2],
          element: action.payload[3],
          value:action.payload[4]
        };
        let auxCollects = [...state.collects];
        auxCollects[state.currentID].itens.push(item)

        return {
          ...state,
          collects: [...auxCollects] 
        };


    case "REFRESH":
      return {
        ...state,
        refresh: action.payload[0],
      };
      case "DEL_ITEM":
        let indexItemToRemove = state.collects[state.currentID].itens.findIndex(
          (x) => x.id == action.payload[0]
        );
       let delItem = state.collects[state.currentID].itens.splice(indexItemToRemove, 1);
        return { ...state,  ...state.collects[state.currentID], itens: [...delItem] };
    case "EDT_ITEM":
     state.collects[state.currentID].itens[state.currentIDitem].value = action.payload;
      return { ...state, collects: [...state.collects] };

    default:
      return state;
  }
};

export default reducer;
