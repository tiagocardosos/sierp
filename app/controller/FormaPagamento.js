Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.FormaPagamento', {
    extend: 'Ext.app.Controller',
    stores: ['FormaPagamento'],
    models: ['FormaPagamento'], 
	
    views: [
    'formaPagamento.List',
    'formaPagamento.Edit'
    ],
    
    refs: [
    {
        ref:'formaPagamentoEdit', 
        selector:'formaPagamentoEdit'
    },
    {
        ref:'formaPagamentoList', 
        selector:'formaPagamentoList'
    }
    ],

    init: function() {
        this.control({
            'formaPagamentoList': {
                itemdblclick: this.edit
            },

            'formaPagamentoList button[action=insert]': {
                click: this.insert
            },
            
            'formaPagamentoList button[action=edit]': {
                click: this.edit
            },

            'formaPagamentoList button[action=destroy]': {
                click: this.destroy
            },
            
            'formaPagamentoList button[action=refresh]': {
                click: this.refresh
            },

            'formaPagamentoEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getFormaPagamentoList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('formaPagamentoEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getFormaPagamentoList(),
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
                        var store = this.getFormaPagamentoList().store;
                        store.remove(records);
                        this.getFormaPagamentoList().store.sync();
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
                var record = Ext.create('MSIERP.model.FormaPagamento');
                record.set(values);
                this.getFormaPagamentoList().store.add(record);
            }

            win.close();
            this.getFormaPagamentoList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getFormaPagamentoList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('formaPagamentoEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});