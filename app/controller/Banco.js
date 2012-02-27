Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.Banco', {
    extend: 'Ext.app.Controller',
    stores: ['Banco'],
    models: ['Banco'], 
	
    views: [
    'banco.List',
    'banco.Edit'
    ],
    
    refs: [
    {
        ref:'bancoEdit', 
        selector:'bancoEdit'
    },
    {
        ref:'bancoList', 
        selector:'bancoList'
    }
    ],

    init: function() {
        this.control({
            'bancoList': {
                itemdblclick: this.edit
            },

            'bancoList button[action=insert]': {
                click: this.insert
            },
            
            'bancoList button[action=edit]': {
                click: this.edit
            },

            'bancoList button[action=destroy]': {
                click: this.destroy
            },
            
            'bancoList button[action=refresh]': {
                click: this.refresh
            },

            'bancoEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getBancoList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('bancoEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getBancoList(),
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
                        var store = this.getBancoList().store;
                        store.remove(records);
                        this.getBancoList().store.sync();
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
                var record = Ext.create('MSIERP.model.Banco');
                record.set(values);
                this.getBancoList().store.add(record);
            }

            win.close();
            this.getBancoList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getBancoList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('bancoEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});