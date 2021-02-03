import Realm from 'realm'

import CollectsSchema from '../schemas/CollectsSchema';
import ItensSchema from '../schemas/ItensSchema';
import UserSchema from '../schemas/UserSchema';

export default function getRealm(){
    return (
        Realm.open({
        schema:[CollectsSchema, ItensSchema, UserSchema],
        schemaVersion: 5,
    })
    )
}