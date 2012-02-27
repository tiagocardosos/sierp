Ext.define('MSIERP.view.produto.ComboRenderer', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.produtoComboRenderer',
    name : 'produto_id',
    ref: 'produto_id',
    fieldLabel: 'Produto',
    store: 'Produto',
    displayField: 'dsProduto',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
        this.store.load();
    }
});
