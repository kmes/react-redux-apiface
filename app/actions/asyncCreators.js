import { setName, setPerson } from './creators';

function refreshEntityData( entityName, dataController ) {
    return dataController.getPowerEntity({ name: entityName }).fetch();
}

function fetchValueFromEntity( entityName, fieldName, actionCreator ) {
    return (dispatch, getState, { remoteData }) =>
        refreshEntityData( entityName, remoteData )
            .then( (entity) =>
                dispatch( actionCreator(entity.get(fieldName) ) )
            );
}

export function fetchName() {
    return fetchValueFromEntity( 'person', 'name', setName );
}

export function fetchPerson() {
    return (dispatch, getState, { remoteData } ) =>
        refreshEntityData( 'person', remoteData )
            .then( (entity) =>
                dispatch( setPerson(entity.getData()) )
        );
}