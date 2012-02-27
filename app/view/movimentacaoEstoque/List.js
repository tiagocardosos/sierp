Ext.define('MSIERP.view.movimentacaoEstoque.List' ,{
    extend: 'MSIERP.view.AbstractList',
    alias : 'widget.movimentacaoEstoqueList',
    store: 'MovimentacaoEstoque',
    title : 'Lista de Movimentações do Estoque',
    //selModel: {mode: 'MULTI'},
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    columnLines: true,
   
    initComponent: function(){
        
        this.tbar = [];

        this.columns = [
            Ext.create('Ext.grid.RowNumberer'),
            {header: 'ID',  dataIndex: 'id',  flex: 1},
            {header: 'Data',  dataIndex: 'dtMovimetacao',  flex: 1},
            {header: 'Produto',  dataIndex: 'dsProduto',  flex: 2},
            {header: 'Quantidade',  dataIndex: 'qtdMovimentacao',  flex: 1},
            {header: 'Tipo',  dataIndex: 'tpMovimentacao',  flex: 1}
        ];

        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'MovimentacaoEstoque',
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