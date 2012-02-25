Ext.require('Ext.window.MessageBox');

Ext.define('MSIERP.controller.Funcionario', {
    extend: 'Ext.app.Controller',
    stores: ['Funcionario'],
    models: ['Funcionario'], 
	
    views: [
    'funcionario.List',
    'funcionario.Edit'
    ],
    
    refs: [
    {
        ref:'funcionarioEdit', 
        selector:'funcionarioEdit'
    },
    {
        ref:'funcionarioList', 
        selector:'funcionarioList'
    }
    ],

    init: function() {
        this.control({
            'funcionarioList': {
                itemdblclick: this.edit
            },

            'funcionarioList button[action=insert]': {
                click: this.insert
            },
            
            'funcionarioList button[action=edit]': {
                click: this.edit
            },

            'funcionarioList button[action=destroy]': {
                click: this.destroy
            },
            
            'funcionarioList button[action=refresh]': {
                click: this.refresh
            },

            'funcionarioEdit button[action=save]': {
                click: this.save
            }
        });
    },
    
    refresh: function(){
        this.getFuncionarioList().store.load();
    },
    
    insert: function(btn, evt, opt) {
        var view = Ext.widget('funcionarioEdit');
        view.setTitle('Inserindo novo Usuário');
    },
    
    destroy: function() {
        
        var grid    = this.getFuncionarioList(),
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
                        var store = this.getFuncionarioList().store;
                        store.remove(records);
                        this.getFuncionarioList().store.sync();
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
                var record = Ext.create('MSIERP.model.Funcionario');
                record.set(values);
                this.getFuncionarioList().store.add(record);
            }

            win.close();
            this.getFuncionarioList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
            
        }
        
    },
    
    edit: function(){
        
        var records = this.getFuncionarioList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget('funcionarioEdit');    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }

});