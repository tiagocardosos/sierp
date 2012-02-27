Ext.define('MSIERP.view.grupoProduto.ComboRenderer', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.grupoProdutoComboRenderer',
    name : 'grupo_id',
    ref: 'grupo_id',
    fieldLabel: 'Grupo',
    store: 'GrupoProduto',
    displayField: 'dsGrupo',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
        this.store.load();
    }
});
