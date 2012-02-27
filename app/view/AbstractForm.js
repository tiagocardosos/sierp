Ext.define('MSIERP.view.AbstractForm',{
    extend: 'Ext.window.Window',    
    //extend: 'Ext.form.Panel',
    alias: 'widget.AbstractForm',
    bodyStyle:'padding:20px; background-color: #fff',    
    layout: 'fit',    
    autoShow: true,
    modal: true,    
    items :{
        anchor: '100%',
        labelAlign: 'right',
        labelWidth: 150,        
        allowBlank: false,
        combineErrors: false,        
        msgTarget: 'side'
    },
   defaultType: 'textfield',
   initComponent: function() {
        this.buttons = [{
            text: 'Salvar',
            action: 'save',
            iconCls: 'save'
        },
        {
            text: 'Cancelar',
            scope: this,
            iconCls: 'cancel',
            handler: this.close
        }];
    
    this.callParent(arguments);    
   }
    
});