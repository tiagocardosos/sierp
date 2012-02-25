Ext.define('MSIERP.view.perfil.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.tipoPerfilUsuarioCombo',
    name : 'perfil_id',
    fieldLabel: 'Perfil',
    store: 'Perfil',
    displayField: 'dsPerfil',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
    }
});
