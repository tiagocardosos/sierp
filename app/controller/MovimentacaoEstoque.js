Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.MovimentacaoEstoque', {
    extend: 'Ext.app.Controller',
    stores: ['MovimentacaoEstoque'],
    models: ['MovimentacaoEstoque'], 
	
    views: [
    'movimentacaoEstoque.List',
    'movimentacaoEstoque.Edit'
    ],
    
    refs: [
    {
        ref:'movimentacaoEstoqueEdit', 
        selector:'movimentacaoEstoqueEdit'
    },
    {
        ref:'movimentacaoEstoqueList', 
        selector:'movimentacaoEstoqueList'
    }
    ],

    init: function() {
        this.control({
            'movimentacaoEstoqueList': {
                itemdblclick: this.edit
            },

            'movimentacaoEstoqueList button[action=insert]': {
                click: this.insert
            },
            
            'movimentacaoEstoqueList button[action=edit]': {
                click: this.edit
            },

            'movimentacaoEstoqueList button[action=destroy]': {
                click: this.destroy
            },
            
            'movimentacaoEstoqueList button[action=refresh]': {
                click: this.refresh
            },

            'movimentacaoEstoqueEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getMovimentacaoEstoqueList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('movimentacaoEstoqueEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getMovimentacaoEstoqueList(),
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
                        var store = this.getMovimentacaoEstoqueList().store;
                        store.remove(records);
                        this.getMovimentacaoEstoqueList().store.sync();
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
                var record = Ext.create('MSIERP.model.MovimentacaoEstoque');
                record.set(values);
                this.getMovimentacaoEstoqueList().store.add(record);
            }

            win.close();
            this.getMovimentacaoEstoqueList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getMovimentacaoEstoqueList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('movimentacaoEstoqueEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});