Ext.define('MSIERP.view.planoContas.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.planoContasCombo',
    name : 'plano_contas_id',
    fieldLabel: 'Plano Contas',
    store: 'PlanoContas',
    displayField: 'dsPlanoContas',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
    }
});
