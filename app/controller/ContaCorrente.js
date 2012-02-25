Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.ContaCorrente', {
    extend: 'Ext.app.Controller',
    stores: ['ContaCorrente'],
    models: ['ContaCorrente'], 
	
    views: [
    'contaCorrente.List',
    'contaCorrente.Edit'
    ],
    
    refs: [
    {
        ref:'contaCorrenteEdit', 
        selector:'contaCorrenteEdit'
    },
    {
        ref:'contaCorrenteList', 
        selector:'contaCorrenteList'
    }
    ],

    init: function() {
        this.control({
            'contaCorrenteList': {
                itemdblclick: this.edit
            },

            'contaCorrenteList button[action=insert]': {
                click: this.insert
            },
            
            'contaCorrenteList button[action=edit]': {
                click: this.edit
            },

            'contaCorrenteList button[action=destroy]': {
                click: this.destroy
            },
            
            'contaCorrenteList button[action=refresh]': {
                click: this.refresh
            },

            'contaCorrenteEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getContaCorrenteList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('contaCorrenteEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getContaCorrenteList(),
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
                        var store = this.getContaCorrenteList().store;
                        store.remove(records);
                        this.getContaCorrenteList().store.sync();
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
                var record = Ext.create('MSIERP.model.ContaCorrente');
                record.set(values);
                this.getContaCorrenteList().store.add(record);
            }

            win.close();
            this.getContaCorrenteList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getContaCorrenteList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('contaCorrenteEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});