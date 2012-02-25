Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.TipoUsuario', {
    extend: 'Ext.app.Controller',
    stores: ['TipoUsuario'],
    models: ['TipoUsuario'], 
	
    views: [
    'tipoUsuario.List',
    'tipoUsuario.Edit'
    ],
    
    refs: [
    {
        ref:'tipoUsuarioEdit', 
        selector:'tipoUsuarioEdit'
    },
    {
        ref:'tipoUsuarioList', 
        selector:'tipoUsuarioList'
    }
    ],

    init: function() {
        this.control({
            'tipoUsuarioList': {
                itemdblclick: this.edit
            },

            'tipoUsuarioList button[action=insert]': {
                click: this.insert
            },
            
            'tipoUsuarioList button[action=edit]': {
                click: this.edit
            },

            'tipoUsuarioList button[action=destroy]': {
                click: this.destroy
            },
            
            'tipoUsuarioList button[action=refresh]': {
                click: this.refresh
            },

            'tipoUsuarioEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getTipoUsuarioList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('tipoUsuarioEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getTipoUsuarioList(),
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
                        var store = this.getTipoUsuarioList().store;
                        store.remove(records);
                        this.getTipoUsuarioList().store.sync();
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
                var record = Ext.create('MSIERP.model.TipoUsuario');
                record.set(values);
                this.getTipoUsuarioList().store.add(record);
            }

            win.close();
            this.getTipoUsuarioList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getTipoUsuarioList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('tipoUsuarioEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});