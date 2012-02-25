Ext.define('MSIERP.model.Usuario', {
    extend: 'Ext.data.Model',
    fields: [
    {
        name: 'id'
    }, 
    {
        name: 'cpf',
        type: 'string'
    }, 
    {
        name: 'nome',
        type: 'string'
    }, 
    {
        name: 'email',
        type: 'string'
    }, 
    {
        name: 'stAtivo',
        type: 'bool'
    }
    ]
});