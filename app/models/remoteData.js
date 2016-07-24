import { Apiface, adapters } from 'apiface';

export const remoteData = new Apiface({
    adapter: new adapters.AjaxAdapter({ url: 'data' })
});

remoteData.getPowerEntity({
    name: 'person',
    uri: '/person.json'
});