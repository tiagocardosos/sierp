Ext.define('MSIERP.view.produto.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.produtoCombo',
    name : 'produto_id',
    fieldLabel: 'Produto',
    store: 'Produto',
    displayField: 'dsProduto',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
    }
});
