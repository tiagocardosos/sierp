Ext.define('MSIERP.view.unidadeProduto.ComboRenderer', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.unidadeProdutoComboRenderer',
    name : 'unidade_id',
    ref: 'unidade_id',
    fieldLabel: 'Unidade',
    store: 'UnidadeProduto',
    displayField: 'dsUnidade',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
        this.store.load();
    }
});
