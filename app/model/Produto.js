Ext.define('MSIERP.model.Produto', {
    extend: 'Ext.data.Model',
    fields: [
    {
        name: 'id'
    },{
        name: 'dsPerfil',
        type: 'string'
    },{
        name: 'stAtivo',
        type: 'bool'
    }
    ]
});