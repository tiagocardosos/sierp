Ext.define('MSIERP.view.banco.ComboRenderer', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.bancoComboRenderer',
    name : 'banco_id',
    ref: 'banco_id',
    fieldLabel: 'Banco',
    store: 'Banco',
    displayField: 'dsBanco',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
        this.store.load();
    }
});
