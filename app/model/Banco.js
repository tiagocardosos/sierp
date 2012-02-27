Ext.define('MSIERP.model.Banco', {
    extend: 'Ext.data.Model',
    fields: [
    {
        name: 'id'
    },{
        name: 'cdBanco',
        type: 'string'
    },{
        name: 'dsBanco',
        type: 'string'
    },{
        name: 'stAtivo',
        type: 'bool'
    }
    ]
});