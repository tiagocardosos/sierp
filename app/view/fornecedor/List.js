Ext.define('MSIERP.view.fornecedor.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.fornecedorList',
    store: 'Fornecedor',
    title : 'Lista de Fornecedore(s)',
    //selModel: {mode: 'MULTI'},
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    columnLines: true,

    initComponent: function(){
        
        this.tbar = [
            {
                text: 'Incluir',
                action: 'insert',
                iconCls: 'add',
                itemId: 'insert'
            }
            ,{
                text: 'Editar',
                action: 'edit',
                iconCls: 'edit',
                itemId: 'edit',
                disabled: true
            },
            {
                text: 'Excluir',
                action: 'destroy',
                iconCls: 'delete',
                itemId: 'delete',
                disabled: true
            }
            ,{
                text: 'Recarregar dados',
                action: 'refresh',
                iconCls: 'refresh',
                itemId: 'refresh'
            }
        ];

        this.columns = [
            Ext.create('Ext.grid.RowNumberer'),
            {header: 'ID',  dataIndex: 'id',  flex: 1},
            {header: 'CPF',  dataIndex: 'nrCpf',  flex: 1},
            {header: 'Nome',  dataIndex: 'nmPessoa',  flex: 1},
            {header: 'Telefone',  dataIndex: 'nrTelefone',  flex: 1},
            {header: 'Ativo',  dataIndex: 'stAtivo',  flex: 1}
        ];

        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'Fornecedor',
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