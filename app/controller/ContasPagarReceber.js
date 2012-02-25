Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.ContasPagarReceber', {
    extend: 'Ext.app.Controller',
    stores: ['ContasPagarReceber'],
    models: ['ContasPagarReceber'], 
	
    views: [
    'contasPagarReceber.List',
    'contasPagarReceber.Edit'
    ],
    
    refs: [
    {
        ref:'contasPagarReceberEdit', 
        selector:'contasPagarReceberEdit'
    },
    {
        ref:'contasPagarReceberList', 
        selector:'contasPagarReceberList'
    }
    ],

    init: function() {
        this.control({
            'contasPagarReceberList': {
                itemdblclick: this.edit
            },

            'contasPagarReceberList button[action=insert]': {
                click: this.insert
            },
            
            'contasPagarReceberList button[action=edit]': {
                click: this.edit
            },

            'contasPagarReceberList button[action=destroy]': {
                click: this.destroy
            },
            
            'contasPagarReceberList button[action=refresh]': {
                click: this.refresh
            },

            'contasPagarReceberEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getContasPagarReceberList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('contasPagarReceberEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getContasPagarReceberList(),
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
                        var store = this.getContasPagarReceberList().store;
                        store.remove(records);
                        this.getContasPagarReceberList().store.sync();
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
                var record = Ext.create('MSIERP.model.ContasPagarReceber');
                record.set(values);
                this.getContasPagarReceberList().store.add(record);
            }

            win.close();
            this.getContasPagarReceberList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getContasPagarReceberList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('contasPagarReceberEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});