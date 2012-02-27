Ext.define('MSIERP.view.usuario.Combo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.usuarioCombo',
    name : 'usuario_id',
    fieldLabel: 'Usuário',
    store: 'Usuario',
    displayField: 'nmUsuario',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
    }
});
