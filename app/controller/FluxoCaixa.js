Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.FluxoCaixa', {
    extend: 'Ext.app.Controller',
    stores: ['FluxoCaixa'],
    models: ['FluxoCaixa'], 
	
    views: [
    'fluxoCaixa.List',
    'fluxoCaixa.Edit'
    ],
    
    refs: [
    {
        ref:'fluxoCaixaEdit', 
        selector:'fluxoCaixaEdit'
    },
    {
        ref:'fluxoCaixaList', 
        selector:'fluxoCaixaList'
    }
    ],

    init: function() {
        this.control({
            'fluxoCaixaList': {
                itemdblclick: this.edit
            },

            'fluxoCaixaList button[action=insert]': {
                click: this.insert
            },
            
            'fluxoCaixaList button[action=edit]': {
                click: this.edit
            },

            'fluxoCaixaList button[action=destroy]': {
                click: this.destroy
            },
            
            'fluxoCaixaList button[action=refresh]': {
                click: this.refresh
            },

            'fluxoCaixaEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getFluxoCaixaList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('fluxoCaixaEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getFluxoCaixaList(),
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
                        var store = this.getFluxoCaixaList().store;
                        store.remove(records);
                        this.getFluxoCaixaList().store.sync();
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
                var record = Ext.create('MSIERP.model.FluxoCaixa');
                record.set(values);
                this.getFluxoCaixaList().store.add(record);
            }

            win.close();
            this.getFluxoCaixaList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getFluxoCaixaList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('fluxoCaixaEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});