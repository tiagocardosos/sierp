Ext.require(['MSIERP.view.AbstractList']);

Ext.define('MSIERP.view.usuario.List' ,{
    extend: 'MSIERP.view.AbstractList',
    alias : 'widget.usuarioList',
    store: 'Usuarios',
    title : 'Lista de Usuário(s)',
    //selModel: {mode: 'MULTI'},
    //selModel: Ext.create('Ext.selection.CheckboxModel'),
    columnLines: true,
    initComponent: function(){
        
        this.tbar = [];

        this.columns = [
            Ext.create('Ext.grid.RowNumberer'),
            {header: 'ID',  dataIndex: 'id',  flex: 1},
            {header: 'Nome',  dataIndex: 'nmPessoa',  flex: 1},
            {header: 'Perfil',  dataIndex: 'dsPerfil',  flex: 1},
            {header: 'Ativo',  dataIndex: 'stAtivo',  flex: 1}
        ];

        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Usuarios',
            dock: 'bottom',
            displayInfo: true
        }];
    
    
        //this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        this.callParent(arguments);        
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