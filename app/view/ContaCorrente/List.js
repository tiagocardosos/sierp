Ext.define('MSIERP.view.contaCorrente.List' ,{
    extend: 'MSIERP.view.AbstractList',
    alias : 'widget.contaCorrenteList',
    store: 'ContaCorrente',
    title : 'Lista de Contas',
    //selModel: {mode: 'MULTI'},
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    columnLines: true,

    initComponent: function(){
        this.tbar = [];

        this.columns = [
            Ext.create('Ext.grid.RowNumberer'),
            {header: 'ID',  dataIndex: 'id',  flex: 1},
            {header: 'Banco',  dataIndex: 'dsBanco',  flex: 1},
            {header: 'Agência',  dataIndex: 'nrAgencia',  flex: 1},
            {header: 'Nº Conta',  dataIndex: 'nrContaCorrente',  flex: 1},
            {header: 'Tipo Conta',  dataIndex: 'tpConta',  flex: 1},
            {header: 'Ativo',  dataIndex: 'stAtivo',  flex: 1}
        ];

        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'ContaCorrente',
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