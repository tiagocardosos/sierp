Ext.define('MSIERP.view.grupoProduto.Edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.grupoProdutoEdit',
    title : 'Edição de Parâmetro do Sistema',
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
                xtype: 'textfield',
                name : 'stAtivo',
                ref: 'stAtivo',
                fieldLabel: 'Ativo',
                allowBlank: false                
            }
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