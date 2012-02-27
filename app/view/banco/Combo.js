Ext.define('MSIERP.view.banco.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.bancoCombo',
    name : 'banco_id',
    fieldLabel: 'Banco',
    store: 'Banco',
    displayField: 'dsBanco',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
    }
});
