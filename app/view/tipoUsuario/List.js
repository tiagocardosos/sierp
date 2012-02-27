Ext.require(['MSIERP.view.AbstractList']);

Ext.define('MSIERP.view.tipoUsuario.List' ,{
    extend: 'MSIERP.view.AbstractList',
    alias : 'widget.tipoUsuarioList',
    store: 'TipoUsuario',
    title : 'Lista de Parâmetros do Sistema',
    //selModel: {mode: 'MULTI'},
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    columnLines: true,
     initComponent: function(){
        
        this.tbar = [];

        this.columns = [
            Ext.create('Ext.grid.RowNumberer'),
            {header: 'ID',  dataIndex: 'id',  flex: 1},
            {header: 'Tipo Usuário',  dataIndex: 'dsUsuario',  flex: 1},
            {header: 'Ativo',  dataIndex: 'ativo',  flex: 1}
        ];

        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'TipoUsuario',
            dock: 'bottom',
            displayInfo: true
        }];        
        
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },
    
    onRender: function(){
        this.store.load();
        this.callParent(arguments);
    },
    
    onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
        this.down('#edit').setDisabled(selections.length !== 1);
    }
   
});