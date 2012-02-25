Ext.define('MSIERP.view.AbstractForm',{
    extend: 'Ext.form.Panel',
    alias: 'widget.abstractform',
    padding: '5 5 0 5',
    bodyPadding: 10,
    border: false,
    style: 'background-color:#fff',
    bodyPadding : '10',
    fieldDefaults:{
        anchor: '100%',
        labelAlign: 'right',
        labelWidth: 150,        
        allowBlank: false,
        combineErrors: false,        
        msgTarget: 'side'
    },
    defaultType: 'textfield'
});