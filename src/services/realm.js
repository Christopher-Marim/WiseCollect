import Realm from 'realm'

import CollectsSchema from '../schemas/CollectsSchema';
import InventorysSchema from '../schemas/InventorysSchema';
import ItensInventorySchema from '../schemas/ItensInventorySchema';
import StorageProducts from '../schemas/StorageProducts';
import ItensSchema from '../schemas/ItensSchema';
import UserSchema from '../schemas/UserSchema';

export default function getRealm(){
    return (
        Realm.open({
        schema:[CollectsSchema, ItensSchema, UserSchema,InventorysSchema,ItensInventorySchema, StorageProducts],
        schemaVersion: 7,
    })
    )
}