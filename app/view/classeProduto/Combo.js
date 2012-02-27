Ext.define('MSIERP.view.classeProduto.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.classeProdutoCombo',
    name : 'classe_id',
    fieldLabel: 'Classe',
    store: 'ClasseProduto',
    displayField: 'dsClasse',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
    }
});
