Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.ClasseProduto', {
    extend: 'Ext.app.Controller',
    stores: ['ClasseProduto'],
    models: ['ClasseProduto'], 
	
    views: [
    'classeProduto.List',
    'classeProduto.Edit'
    ],
    
    refs: [
    {
        ref:'classeProdutoEdit', 
        selector:'classeProdutoEdit'
    },
    {
        ref:'classeProdutoList', 
        selector:'classeProdutoList'
    }
    ],

    init: function() {
        this.control({
            'classeProdutoList': {
                itemdblclick: this.edit
            },

            'classeProdutoList button[action=insert]': {
                click: this.insert
            },
            
            'classeProdutoList button[action=edit]': {
                click: this.edit
            },

            'classeProdutoList button[action=destroy]': {
                click: this.destroy
            },
            
            'classeProdutoList button[action=refresh]': {
                click: this.refresh
            },

            'classeProdutoEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getClasseProdutoList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('classeProdutoEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getClasseProdutoList(),
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
                        var store = this.getClasseProdutoList().store;
                        store.remove(records);
                        this.getClasseProdutoList().store.sync();
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
                var record = Ext.create('MSIERP.model.ClasseProduto');
                record.set(values);
                this.getClasseProdutoList().store.add(record);
            }

            win.close();
            this.getClasseProdutoList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getClasseProdutoList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('classeProdutoEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});