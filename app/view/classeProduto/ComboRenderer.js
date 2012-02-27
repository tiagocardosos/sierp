Ext.define('MSIERP.view.classeProduto.ComboRenderer', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.classeProdutoComboRenderer',
    name : 'classe_id',
    ref: 'classe_id',
    fieldLabel: 'Classe',
    store: 'ClasseProduto',
    displayField: 'dsClasse',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
        this.store.load();
    }
});
