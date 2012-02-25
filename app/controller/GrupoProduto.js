Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.GrupoProduto', {
    extend: 'Ext.app.Controller',
    stores: ['GrupoProduto'],
    models: ['GrupoProduto'], 
	
    views: [
    'grupoProduto.List',
    'grupoProduto.Edit'
    ],
    
    refs: [
    {
        ref:'grupoProdutoEdit', 
        selector:'grupoProdutoEdit'
    },
    {
        ref:'grupoProdutoList', 
        selector:'grupoProdutoList'
    }
    ],

    init: function() {
        this.control({
            'grupoProdutoList': {
                itemdblclick: this.edit
            },

            'grupoProdutoList button[action=insert]': {
                click: this.insert
            },
            
            'grupoProdutoList button[action=edit]': {
                click: this.edit
            },

            'grupoProdutoList button[action=destroy]': {
                click: this.destroy
            },
            
            'grupoProdutoList button[action=refresh]': {
                click: this.refresh
            },

            'grupoProdutoEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getGrupoProdutoList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('grupoProdutoEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getGrupoProdutoList(),
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
                        var store = this.getGrupoProdutoList().store;
                        store.remove(records);
                        this.getGrupoProdutoList().store.sync();
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
                var record = Ext.create('MSIERP.model.GrupoProduto');
                record.set(values);
                this.getGrupoProdutoList().store.add(record);
            }

            win.close();
            this.getGrupoProdutoList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getGrupoProdutoList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('grupoProdutoEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});