Ext.define('MSIERP.view.tipoDespesa.ComboRenderer', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.tipoDespesaComboRenderer',
    name : 'tipo_despesa_id',
    ref: 'tipo_despesa_id',
    fieldLabel: 'Tipo de despesa',
    store: 'TipoDespesas',
    displayField: 'nome',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
        this.store.load();
    }
});
