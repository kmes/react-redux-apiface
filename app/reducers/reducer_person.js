export default function( person = null, action ) {
    switch( action.type ) {
        case 'PERSON_SET':
            return action.person;
            break;
    }

    return person;
}