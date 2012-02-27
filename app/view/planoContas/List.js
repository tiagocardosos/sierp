Ext.define('MSIERP.view.planoContas.List' ,{
    extend: 'MSIERP.view.AbstractList',
    alias : 'widget.planoContasList',
    store: 'PlanoContas',
    title : 'Lista de Plano de Contas',
    //selModel: {mode: 'MULTI'},
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    columnLines: true,
 
    initComponent: function(){
        
        this.tbar = [];

        this.columns = [
            Ext.create('Ext.grid.RowNumberer'),
            {header: 'ID',  dataIndex: 'id',  flex: 1},
            {header: 'Nº Classificação',  dataIndex: 'nrClassificacao',  flex: 1},
            {header: 'Plano Contas',  dataIndex: 'dsPlanoContas',  flex: 3},
            {header: 'Ativo',  dataIndex: 'stAtivo',  flex: 1}
        ];

        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'PlanoContas',
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