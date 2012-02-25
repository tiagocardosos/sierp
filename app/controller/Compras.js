Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.Compras', {
    extend: 'Ext.app.Controller',
    stores: ['Compras'],
    models: ['Compras'], 
	
    views: [
    'compras.List',
    'compras.Edit'
    ],
    
    refs: [
    {
        ref:'comprasEdit', 
        selector:'comprasEdit'
    },
    {
        ref:'comprasList', 
        selector:'comprasList'
    }
    ],

    init: function() {
        this.control({
            'comprasList': {
                itemdblclick: this.edit
            },

            'comprasList button[action=insert]': {
                click: this.insert
            },
            
            'comprasList button[action=edit]': {
                click: this.edit
            },

            'comprasList button[action=destroy]': {
                click: this.destroy
            },
            
            'comprasList button[action=refresh]': {
                click: this.refresh
            },

            'comprasEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getComprasList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('comprasEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getComprasList(),
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
                        var store = this.getComprasList().store;
                        store.remove(records);
                        this.getComprasList().store.sync();
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
                var record = Ext.create('MSIERP.model.Compras');
                record.set(values);
                this.getComprasList().store.add(record);
            }

            win.close();
            this.getComprasList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getComprasList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('comprasEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});