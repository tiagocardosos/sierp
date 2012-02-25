Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.EmissaoCheques', {
    extend: 'Ext.app.Controller',
    stores: ['EmissaoCheques'],
    models: ['EmissaoCheques'], 
	
    views: [
    'emissaoCheques.List',
    'emissaoCheques.Edit'
    ],
    
    refs: [
    {
        ref:'emissaoChequesEdit', 
        selector:'emissaoChequesEdit'
    },
    {
        ref:'emissaoChequesList', 
        selector:'emissaoChequesList'
    }
    ],

    init: function() {
        this.control({
            'emissaoChequesList': {
                itemdblclick: this.edit
            },

            'emissaoChequesList button[action=insert]': {
                click: this.insert
            },
            
            'emissaoChequesList button[action=edit]': {
                click: this.edit
            },

            'emissaoChequesList button[action=destroy]': {
                click: this.destroy
            },
            
            'emissaoChequesList button[action=refresh]': {
                click: this.refresh
            },

            'emissaoChequesEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getEmissaoChequesList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('emissaoChequesEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getEmissaoChequesList(),
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
                        var store = this.getEmissaoChequesList().store;
                        store.remove(records);
                        this.getEmissaoChequesList().store.sync();
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
                var record = Ext.create('MSIERP.model.EmissaoCheques');
                record.set(values);
                this.getEmissaoChequesList().store.add(record);
            }

            win.close();
            this.getEmissaoChequesList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getEmissaoChequesList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('emissaoChequesEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});