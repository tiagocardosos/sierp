Ext.define('MSIERP.view.planoContas.ComboRenderer', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.planoContasComboRenderer',
    name : 'plano_contas_id',
    ref: 'plano_contas_id',
    fieldLabel: 'Plano Contas',
    store: 'PlanoContas',
    displayField: 'dsPlanoContas',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
        this.store.load();
    }
});
