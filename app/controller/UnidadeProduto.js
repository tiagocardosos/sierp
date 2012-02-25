Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.UnidadeProduto', {
    extend: 'Ext.app.Controller',
    stores: ['UnidadeProduto'],
    models: ['UnidadeProduto'], 
	
    views: [
    'unidadeProduto.List',
    'unidadeProduto.Edit'
    ],
    
    refs: [
    {
        ref:'unidadeProdutoEdit', 
        selector:'unidadeProdutoEdit'
    },
    {
        ref:'unidadeProdutoList', 
        selector:'unidadeProdutoList'
    }
    ],

    init: function() {
        this.control({
            'unidadeProdutoList': {
                itemdblclick: this.edit
            },

            'unidadeProdutoList button[action=insert]': {
                click: this.insert
            },
            
            'unidadeProdutoList button[action=edit]': {
                click: this.edit
            },

            'unidadeProdutoList button[action=destroy]': {
                click: this.destroy
            },
            
            'unidadeProdutoList button[action=refresh]': {
                click: this.refresh
            },

            'unidadeProdutoEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getUnidadeProdutoList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('unidadeProdutoEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getUnidadeProdutoList(),
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
                        var store = this.getUnidadeProdutoList().store;
                        store.remove(records);
                        this.getUnidadeProdutoList().store.sync();
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
                var record = Ext.create('MSIERP.model.UnidadeProduto');
                record.set(values);
                this.getUnidadeProdutoList().store.add(record);
            }

            win.close();
            this.getUnidadeProdutoList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getUnidadeProdutoList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('unidadeProdutoEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});