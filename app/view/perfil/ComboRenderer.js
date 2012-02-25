Ext.define('MSIERP.view.perfil.ComboRenderer', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.tipoPerfilUsuarioComboRenderer',
    name : 'perfil_id',
    ref: 'perfil_id',
    fieldLabel: 'Tipo de despesa',
    store: 'Perfil',
    displayField: 'dsPerfil',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
        this.store.load();
    }
});
