Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.Fornecedor', {
    extend: 'Ext.app.Controller',
    stores: ['Fornecedor'],
    models: ['Fornecedor'], 
	
    views: [
    'fornecedor.List',
    'fornecedor.Edit'
    ],
    
    refs: [
    {
        ref:'fornecedorEdit', 
        selector:'fornecedorEdit'
    },
    {
        ref:'fornecedorList', 
        selector:'fornecedorList'
    }
    ],

    init: function() {
        this.control({
            'fornecedorList': {
                itemdblclick: this.edit
            },

            'fornecedorList button[action=insert]': {
                click: this.insert
            },
            
            'fornecedorList button[action=edit]': {
                click: this.edit
            },

            'fornecedorList button[action=destroy]': {
                click: this.destroy
            },
            
            'fornecedorList button[action=refresh]': {
                click: this.refresh
            },

            'fornecedorEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getFornecedorList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('fornecedorEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getFornecedorList(),
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
                        var store = this.getFornecedorList().store;
                        store.remove(records);
                        this.getFornecedorList().store.sync();
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
                var record = Ext.create('MSIERP.model.Fornecedor');
                record.set(values);
                this.getFornecedorList().store.add(record);
            }

            win.close();
            this.getFornecedorList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getFornecedorList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('fornecedorEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});