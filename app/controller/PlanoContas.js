Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.PlanoContas', {
    extend: 'Ext.app.Controller',
    stores: ['PlanoContas'],
    models: ['PlanoContas'], 
	
    views: [
    'planoContas.List',
    'planoContas.Edit'
    ],
    
    refs: [
    {
        ref:'planoContasEdit', 
        selector:'planoContasEdit'
    },
    {
        ref:'planoContasList', 
        selector:'planoContasList'
    }
    ],

    init: function() {
        this.control({
            'planoContasList': {
                itemdblclick: this.edit
            },

            'planoContasList button[action=insert]': {
                click: this.insert
            },
            
            'planoContasList button[action=edit]': {
                click: this.edit
            },

            'planoContasList button[action=destroy]': {
                click: this.destroy
            },
            
            'planoContasList button[action=refresh]': {
                click: this.refresh
            },

            'planoContasEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getPlanoContasList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('planoContasEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getPlanoContasList(),
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
                        var store = this.getPlanoContasList().store;
                        store.remove(records);
                        this.getPlanoContasList().store.sync();
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
                var record = Ext.create('MSIERP.model.PlanoContas');
                record.set(values);
                this.getPlanoContasList().store.add(record);
            }

            win.close();
            this.getPlanoContasList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getPlanoContasList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('planoContasEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});