Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.ParametrosFiscais', {
    extend: 'Ext.app.Controller',
    stores: ['ParametrosFiscais'],
    models: ['ParametrosFiscais'], 
	
    views: [
    'parametrosFiscais.List',
    'parametrosFiscais.Edit'
    ],
    
    refs: [
    {
        ref:'parametrosFiscaisEdit', 
        selector:'parametrosFiscaisEdit'
    },
    {
        ref:'parametrosFiscaisList', 
        selector:'parametrosFiscaisList'
    }
    ],

    init: function() {
        this.control({
            'parametrosFiscaisList': {
                itemdblclick: this.edit
            },

            'parametrosFiscaisList button[action=insert]': {
                click: this.insert
            },
            
            'parametrosFiscaisList button[action=edit]': {
                click: this.edit
            },

            'parametrosFiscaisList button[action=destroy]': {
                click: this.destroy
            },
            
            'parametrosFiscaisList button[action=refresh]': {
                click: this.refresh
            },

            'parametrosFiscaisEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getParametrosFiscalList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('parametrosFiscaisEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getParametrosFiscalList(),
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
                        var store = this.getParametrosFiscalList().store;
                        store.remove(records);
                        this.getParametrosFiscalList().store.sync();
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
                var record = Ext.create('MSIERP.model.ParametrosFiscais');
                record.set(values);
                this.getParametrosFiscalList().store.add(record);
            }

            win.close();
            this.getParametrosFiscalList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getParametrosFiscalList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('parametrosFiscaisEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});