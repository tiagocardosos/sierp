Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.LancamentoContas', {
    extend: 'Ext.app.Controller',
    stores: ['LancamentoContas'],
    models: ['LancamentoContas'], 
	
    views: [
    'lancamentoContas.List',
    'lancamentoContas.Edit'
    ],
    
    refs: [
    {
        ref:'lancamentoContasEdit', 
        selector:'lancamentoContasEdit'
    },
    {
        ref:'lancamentoContasList', 
        selector:'lancamentoContasList'
    }
    ],

    init: function() {
        this.control({
            'lancamentoContasList': {
                itemdblclick: this.edit
            },

            'lancamentoContasList button[action=insert]': {
                click: this.insert
            },
            
            'lancamentoContasList button[action=edit]': {
                click: this.edit
            },

            'lancamentoContasList button[action=destroy]': {
                click: this.destroy
            },
            
            'lancamentoContasList button[action=refresh]': {
                click: this.refresh
            },

            'lancamentoContasEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getLancamentoContasList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('lancamentoContasEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getLancamentoContasList(),
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
                        var store = this.getLancamentoContasList().store;
                        store.remove(records);
                        this.getLancamentoContasList().store.sync();
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
                var record = Ext.create('MSIERP.model.LancamentoContas');
                record.set(values);
                this.getLancamentoContasList().store.add(record);
            }

            win.close();
            this.getLancamentoContasList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getLancamentoContasList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('lancamentoContasEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});