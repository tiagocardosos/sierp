Ext.define('MSIERP.view.unidadeProduto.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.unidadeProdutoCombo',
    name : 'unidade_id',
    fieldLabel: 'Unidade',
    store: 'UnidadeProduto',
    displayField: 'dsUnidade',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
    }
});
