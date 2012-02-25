Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.Produto', {
    extend: 'Ext.app.Controller',
    stores: ['Produto'],
    models: ['Produto'], 
	
    views: [
    'produto.List',
    'produto.Edit'
    ],
    
    refs: [
    {
        ref:'produtoEdit', 
        selector:'produtoEdit'
    },
    {
        ref:'produtoList', 
        selector:'produtoList'
    }
    ],

    init: function() {
        this.control({
            'produtoList': {
                itemdblclick: this.edit
            },

            'produtoList button[action=insert]': {
                click: this.insert
            },
            
            'produtoList button[action=edit]': {
                click: this.edit
            },

            'produtoList button[action=destroy]': {
                click: this.destroy
            },
            
            'produtoList button[action=refresh]': {
                click: this.refresh
            },

            'produtoEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getProdutoList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('produtoEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getProdutoList(),
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
                        var store = this.getProdutoList().store;
                        store.remove(records);
                        this.getProdutoList().store.sync();
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
                var record = Ext.create('MSIERP.model.Produto');
                record.set(values);
                this.getProdutoList().store.add(record);
            }

            win.close();
            this.getProdutoList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getProdutoList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('produtoEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});