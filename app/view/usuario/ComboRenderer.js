Ext.define('MSIERP.view.usuario.ComboRenderer', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.usuarioComboRenderer',
    name : 'usuario_id',
    ref: 'usuario_id',
    fieldLabel: 'Usuário',
    store: 'Usuario',
    displayField: 'nmUsuario',
    valueField: 'id',
    queryMode: 'local',
    typeAhead: true,
    forceSelection: true,
    initComponent: function() {
        this.callParent(arguments);
        this.store.load();
    }
});
