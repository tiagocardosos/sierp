Ext.define('MSIERP.controller.AbstractController',{
    
    extend: 'Ext.app.Controller',
    editWidget: '',
    gridWidget: '',
    editTitle: 'Edição',
    insertTitle: 'Cadastro',
    modelClass: '',
    
    refs: [
        {
            ref: 'gridList',
            selector: 'list'
        }
        ,{
            ref: 'formEdit',
            selector: 'edit'
        }
    ],
    
    refresh: function(){
        console.log('refresh abstract');
        this.getGridList().store.load();
    },
    
    insert: function(btn, evt, opt){
        var editWind = Ext.widget(this.editWidget);
        editWind.setTitle(this.insertTitle);
    },
    
    destroy: function(){
        
        var grid = this.getGridList(),
            records = grid.getSelectionModel().getSelection();
            
        if(records.length === 0){
            Ext.Msg.alert('Atenção', 'Nenhum registro selecionado');
            return false;
        }else{
            Ext.Msg.show({
                title: 'Confirmação de exclusão de registros',
                msg: 'Tem certeza que deseja deletar o(s) registro(s) selecionado(s)?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.MessageBox.WARNING,
                scope: this,
                width: 400,
                fn: function(btn, evt){
                    if(btn === 'yes'){
                        var store = grid.store;
                        store.remove(records);
                        store.sync();
                    }
                }
            });
        }    
    },
    
    save: function(button, evt, opt){
        
        var win = button.up('window'),
            form = win.down('form').getForm(),
            id = form.getRecord()? form.getRecord().get('id') : 0;
            
        if(form.isValid()){
            var record = form.getRecord(),
                values = form.getValues();
                
            if(record){
                if(record.data['id']){
                    record.set(values);
                }
            }else{
                var record = Ext.create(this.modelClass);
                record.set(values);
                this.getGridList().store.add(record);
            }
            
            win.close();
            this.getGridList().store.sync();
        }else{
            Ext.ux.Msg.flash({
                msg: 'Há campos preenchidos incorretamente',
                type: 'error'
            });
        }
    },
    
    edit: function(){
        
        var records = this.getGridList().getSelectionModel().getSelection();    	
    	
        if(records.length === 1){
            var editWind = Ext.widget(this.editWidget);    	
            var editForm = editWind.down('form');
            var record = records[0];
            editForm.loadRecord(record);
        }else{
            return;
        }		
    }
    
});