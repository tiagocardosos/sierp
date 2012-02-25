Ext.define('MSIERP.model.Funcionario', {
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