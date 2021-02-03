import { useState, useEffect } from "react";
import getRealm from "../services/realm";

  const useRealm = () => {
  const [store, setStore] = useState(null);


  function createInStore(schema, object) {
    store.write(() => {
      store.create(schema, object);
    });
    return;
  }

  function deleteInStore(object) {
    store.write(() => {
      store.delete(object);
    });
    return;
  }

  function updateInStore(schema, object) {
    store.write(() => {
      store.create(schema, object, "modified");
    });
    return;
  }

  function getAllStore(schema) {
    return store.objects(schema);
  }

  function findFilteredInStore(schema, filter) {
    const objects = store.objects(schema);
    return objects.filtered(filter);
  }

  return {
    createInStore,
    deleteInStore,
    updateInStore,
    getAllStore,
    findFilteredInStore,
    store,
  };
}

export default useRealm;
