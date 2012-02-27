Ext.define('MSIERP.view.centroCusto.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.centroCustoCombo',
    name : 'centro_custo_id',
    fieldLabel: 'Centro de Custo',
    store: 'CentroCusto',
    displayField: 'dsCentroCusto',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
    }
});
