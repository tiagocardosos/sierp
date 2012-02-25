Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.Perfil', {
    extend: 'Ext.app.Controller',
    stores: ['Perfil'],
    models: ['Perfil'], 
	
    views: [
    'perfil.List',
    'perfil.Edit'
    ],
    
    refs: [
    {
        ref:'perfilEdit', 
        selector:'perfilEdit'
    },
    {
        ref:'perfilList', 
        selector:'perfilList'
    }
    ],

    init: function() {
        this.control({
            'perfilList': {
                itemdblclick: this.edit
            },

            'perfilList button[action=insert]': {
                click: this.insert
            },
            
            'perfilList button[action=edit]': {
                click: this.edit
            },

            'perfilList button[action=destroy]': {
                click: this.destroy
            },
            
            'perfilList button[action=refresh]': {
                click: this.refresh
            },

            'perfilEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getPerfilList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('perfilEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getPerfilList(),
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
                        var store = this.getPerfilList().store;
                        store.remove(records);
                        this.getPerfilList().store.sync();
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
                var record = Ext.create('MSIERP.model.Perfil');
                record.set(values);
                this.getPerfilList().store.add(record);
            }

            win.close();
            this.getPerfilList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getPerfilList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('perfilEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});