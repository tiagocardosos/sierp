Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.CondicoesPagamento', {
    extend: 'Ext.app.Controller',
    stores: ['CondicoesPagamento'],
    models: ['CondicoesPagamento'], 
	
    views: [
    'condicoesPagamento.List',
    'condicoesPagamento.Edit'
    ],
    
    refs: [
    {
        ref:'condicoesPagamentoEdit', 
        selector:'condicoesPagamentoEdit'
    },
    {
        ref:'condicoesPagamentoList', 
        selector:'condicoesPagamentoList'
    }
    ],

    init: function() {
        this.control({
            'condicoesPagamentoList': {
                itemdblclick: this.edit
            },

            'condicoesPagamentoList button[action=insert]': {
                click: this.insert
            },
            
            'condicoesPagamentoList button[action=edit]': {
                click: this.edit
            },

            'condicoesPagamentoList button[action=destroy]': {
                click: this.destroy
            },
            
            'condicoesPagamentoList button[action=refresh]': {
                click: this.refresh
            },

            'condicoesPagamentoEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getCondicoesPagamentoList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('condicoesPagamentoEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getCondicoesPagamentoList(),
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
                        var store = this.getCondicoesPagamentoList().store;
                        store.remove(records);
                        this.getCondicoesPagamentoList().store.sync();
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
                var record = Ext.create('MSIERP.model.CondicoesPagamento');
                record.set(values);
                this.getCondicoesPagamentoList().store.add(record);
            }

            win.close();
            this.getCondicoesPagamentoList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getCondicoesPagamentoList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('condicoesPagamentoEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});