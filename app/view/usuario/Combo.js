Ext.define('MSIERP.view.tipoDespesa.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.tipoDespesaCombo',
    name : 'tipo_despesa_id',
    fieldLabel: 'Tipo de despesa',
    store: 'TipoDespesas',
    displayField: 'nome',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
    }
});
