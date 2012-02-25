Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.CentroCusto', {
    extend: 'Ext.app.Controller',
    stores: ['CentroCusto'],
    models: ['CentroCusto'], 
	
    views: [
    'centroCusto.List',
    'centroCusto.Edit'
    ],
    
    refs: [
    {
        ref:'centroCustoEdit', 
        selector:'centroCustoEdit'
    },
    {
        ref:'centroCustoList', 
        selector:'centroCustoList'
    }
    ],

    init: function() {
        this.control({
            'centroCustoList': {
                itemdblclick: this.edit
            },

            'centroCustoList button[action=insert]': {
                click: this.insert
            },
            
            'centroCustoList button[action=edit]': {
                click: this.edit
            },

            'centroCustoList button[action=destroy]': {
                click: this.destroy
            },
            
            'centroCustoList button[action=refresh]': {
                click: this.refresh
            },

            'centroCustoEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getCentroCustoList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('centroCustoEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getCentroCustoList(),
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
                        var store = this.getCentroCustoList().store;
                        store.remove(records);
                        this.getCentroCustoList().store.sync();
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
                var record = Ext.create('MSIERP.model.CentroCusto');
                record.set(values);
                this.getCentroCustoList().store.add(record);
            }

            win.close();
            this.getCentroCustoList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getCentroCustoList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('centroCustoEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});