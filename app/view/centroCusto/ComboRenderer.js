Ext.define('MSIERP.view.centroCusto.ComboRenderer', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.centroCustoComboRenderer',
    name : 'centro_custo_id',
    ref: 'centro_custo_id',
    fieldLabel: 'Centro de Custo',
    store: 'CentroCusto',
    displayField: 'dsCentroCusto',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
        this.store.load();
    }
});
