Ext.define('MSIERP.view.produto.List' ,{
    extend: 'MSIERP.view.AbstractList',
    alias : 'widget.produtoList',
    store: 'Produto',
    title : 'Lista de Produto(s)',
    //selModel: {mode: 'MULTI'},
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    columnLines: true, 
    initComponent: function(){
        this.tbar = [];

        this.columns = [
            Ext.create('Ext.grid.RowNumberer'),
            {header: 'ID',  dataIndex: 'id',  flex: 1},
            {header: 'Produto',  dataIndex: 'cpf',  flex: 2},
            {header: 'Fornecedor',  dataIndex: 'nome',  flex: 2},
            {header: 'Ativo',  dataIndex: 'stAtivo',  flex: 1}
        ];

        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Produto',
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