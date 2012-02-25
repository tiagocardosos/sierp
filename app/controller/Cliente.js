Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.Cliente', {
    extend: 'Ext.app.Controller',
    stores: ['Cliente'],
    models: ['Cliente'], 
	
    views: [
    'cliente.List',
    'cliente.Edit'
    ],
    
    refs: [
    {
        ref:'clienteEdit', 
        selector:'clienteEdit'
    },
    {
        ref:'clienteList', 
        selector:'clienteList'
    }
    ],

    init: function() {
        this.control({
            'clienteList': {
                itemdblclick: this.edit
            },

            'clienteList button[action=insert]': {
                click: this.insert
            },
            
            'clienteList button[action=edit]': {
                click: this.edit
            },

            'clienteList button[action=destroy]': {
                click: this.destroy
            },
            
            'clienteList button[action=refresh]': {
                click: this.refresh
            },

            'clienteEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getClienteList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('clienteEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getClienteList(),
            records = grid.getSelectionModel().getSelection();

        if(records.length === 0){
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }else{
            Ext.Msg.show({
                title : 'Confirmação',
                msg : 'Tem certeza que deseja deletar o(s) registro(s) selecionado(s)?',
                buttons : Ext.Msg.YESNO,
                icon : Ext.MessageBox.WARNING,
                scope : this,
                width : 450,
                fn : function(btn, ev){
                    if (btn == 'yes') {
                        var store = this.getClienteList().store;
                        store.remove(records);
                        this.getClienteList().store.sync();
                    }
                }
            });
        }
    },

    save: function(button) {	
        
        var win     = button.up('window'),
            form    = win.down('form').getForm(),
            id      = form.getRecord() ? form.getRecord().get('id') : 0;
        
        if (form.isValid()) {
            var record = form.getRecord(),
                values = form.getValues();

            if (record){
                if(record.data['id']){
                    record.set(values);
                }
            } else{
                var record = Ext.create('MSIERP.model.Cliente');
                record.set(values);
                this.getClienteList().store.add(record);
            }

            win.close();
            this.getClienteList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getClienteList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('clienteEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});