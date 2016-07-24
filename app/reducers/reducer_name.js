export default function( name = 'unknown', action ) {
    switch( action.type ) {
        case 'NAME_SET':
            return action.name;
            break;
    }

    return name;
}