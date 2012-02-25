Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.Usuario', {
    extend: 'Ext.app.Controller',
    stores: ['Usuarios'],
    models: ['Usuario'], 
	
    views: [
    'usuario.List',
    'usuario.Edit'
    ],
    
    refs: [
    {
        ref:'usuarioEdit', 
        selector:'usuarioEdit'
    },
    {
        ref:'usuarioList', 
        selector:'usuarioList'
    }
    ],

    init: function() {
        this.control({
            'usuarioList': {
                itemdblclick: this.edit
            },
            
//            'tipoGanhoList': {
//                meuevento: this.disparandoNossoEvento
//            },

            'usuarioList button[action=insert]': {
                click: this.insert
            },
            
            'usuarioList button[action=edit]': {
                click: this.edit
            },

            'usuarioList button[action=destroy]': {
                click: this.destroy
            },
            
            'usuarioList button[action=refresh]': {
                click: this.refresh
            },

            'usuarioEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    disparandoNossoEvento: function(){
        console.log('Evento customizado detectado');
    },
    
    refresh: function(){
        this.getUsuarioList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('usuarioEdit');
        view.setTitle('Inserindo novo tipo de Ganho');
    },
    
    destroy: function() {
        
        var grid    = this.getUsuarioList(),
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
                        var store = this.getUsuarioList().store;
                        store.remove(records);
                        this.getUsuarioList().store.sync();
                    }
                }
            });
        }
    },

    save: function(button, evt, opt) {	
        
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
                var record = Ext.create('MSIERP.model.Usuario');
                record.set(values);
                this.getUsuarioList().store.add(record);
            }

            win.close();
            this.getUsuarioList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getUsuarioList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('usuarioEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});