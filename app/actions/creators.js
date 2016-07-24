export function setName( name ) {
    return {
        type: 'NAME_SET',
        name
    };
}

export function setPerson( person ) {
    return {
        type: 'PERSON_SET',
        person
    };
}