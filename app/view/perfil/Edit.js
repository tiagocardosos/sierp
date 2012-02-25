Ext.define('MSIERP.view.perfil.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.perfilEdit',
    title : 'Edição de Usuário',
    layout: 'fit',
    padding: 10,
    autoShow: true,
    modal: true,    
    initComponent: function() {
    	
        this.items = [{
            xtype: 'form',
            style: 'background-color: #fff;',  
            fieldDefaults: {
                anchor: '100%',
                labelAlign: 'right',
                labelWidth: 140,
                allowBlank: false,                
                width : 400,
                combineErrors: false,
                msgTarget: 'side'
            },
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'textfield',
                name : 'dsPerfil',
                ref: 'dsPerfil',
                fieldLabel: 'Perfil',
                allowBlank: false
            },{
                xtype: 'fieldcontainer',
                fieldLabel: 'Ativo',
                defaultType: 'checkboxfield',
                items: [
                    {
                        name      : 'stAtivo',
                        inputValue: true,
                        checked   : true,
                        id        : 'stAtivo'
                    }
               ]}
            ]}
        ];

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