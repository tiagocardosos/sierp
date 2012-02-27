Ext.define('MSIERP.view.grupoProduto.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.grupoProdutoCombo',
    name : 'grupo_id',
    fieldLabel: 'Grupo',
    store: 'GrupoProduto',
    displayField: 'dsGrupo',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
    }
});
