Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.ParametrosSistema', {
    extend: 'Ext.app.Controller',
    stores: ['ParametrosSistema'],
    models: ['ParametrosSistema'], 
	
    views: [
    'parametrosSistema.List',
    'parametrosSistema.Edit'
    ],
    
    refs: [
    {
        ref:'parametrosSistemaEdit', 
        selector:'parametrosSistemaEdit'
    },
    {
        ref:'parametrosSistemaList', 
        selector:'parametrosSistemaList'
    }
    ],

    init: function() {
        this.control({
            'parametrosSistemaList': {
                itemdblclick: this.edit
            },

            'parametrosSistemaList button[action=insert]': {
                click: this.insert
            },
            
            'parametrosSistemaList button[action=edit]': {
                click: this.edit
            },

            'parametrosSistemaList button[action=destroy]': {
                click: this.destroy
            },
            
            'parametrosSistemaList button[action=refresh]': {
                click: this.refresh
            },

            'parametrosSistemaEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getParametrosSistemaList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('parametrosSistemaEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getParametrosSistemaList(),
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
                        var store = this.getParametrosSistemaList().store;
                        store.remove(records);
                        this.getParametrosSistemaList().store.sync();
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
                var record = Ext.create('MSIERP.model.ParametrosSistema');
                record.set(values);
                this.getParametrosSistemaList().store.add(record);
            }

            win.close();
            this.getParametrosSistemaList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getParametrosSistemaList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('parametrosSistemaEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});