Ext.define('MSIERP.store.Funcionario', {
    extend: 'Ext.data.Store',
    model: 'MSIERP.model.Funcionario',
    autoLoad: false,
    remoteSort: false,
    pageSize: 3,
    proxy: {
        simpleSortMode: true,
        type: 'ajax',
        api: {
            read: 'php/funcionario.php?action=fetchAll',
            create: 'php/funcionario.php?action=insert',
            update: 'php/funcionario.php?action=update',
            destroy: 'php/funcionario.php?action=delete'
        },
        actionMethods: {
            read: 'POST',
            create: 'POST',
            update: 'POST',
            destroy: 'POST'
        },  
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'data'
        },
        extraParams: { 
            start : 'start',   
            limit : 'limit',  
            sort : 'name',    
            dir : 'ASC', 
            total:'total' 
        }, 
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'REMOTE EXCEPTION',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    listeners: {
        
        write: function(proxy, operation){
            
            var obj = Ext.decode(operation.response.responseText);
            
            if(obj.success){
                Ext.ux.Msg.flash({
                    msg: obj.message,
                    type: 'success'
                });
            }else{
                Ext.ux.Msg.flash({
                    msg: obj.message,
                    type: 'error'
                });
            }
        }
        
    }
    
});