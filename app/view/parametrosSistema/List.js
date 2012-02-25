Ext.define('MSIERP.view.parametrosSistema.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.parametrosSistemaList',
    store: 'ParametrosSistema',
    title : 'Lista de Parâmetros do Sistema',
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
            {header: 'CPF',  dataIndex: 'cpf',  flex: 1},
            {header: 'Nome',  dataIndex: 'nome',  flex: 1},
            {header: 'E-mail',  dataIndex: 'email',  flex: 1},
            {header: 'Ativo',  dataIndex: 'ativo',  flex: 1}
        ];

        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            store: 'ParametrosSistema',
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