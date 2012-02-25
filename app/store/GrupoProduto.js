Ext.define('MSIERP.store.GrupoProduto', {
    extend: 'Ext.data.Store',
    model: 'MSIERP.model.GrupoProduto',
    autoLoad: false,
    remoteSort: false,
    pageSize: 3,
    proxy: {
        simpleSortMode: true,
        type: 'ajax',
        api: {
            read: 'php/grupoProduto.php?action=fetchAll',
            create: 'php/grupoProduto.php?action=insert',
            update: 'php/grupoProduto.php?action=update',
            destroy: 'php/grupoProduto.php?action=delete'
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