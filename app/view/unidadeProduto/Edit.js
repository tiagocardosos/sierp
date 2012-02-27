Ext.require(['MSIERP.view.AbstractForm']);

Ext.define('MSIERP.view.unidadeProduto.Edit', {
    extend: 'MSIERP.view.AbstractForm',
    alias : 'widget.unidadeProdutoEdit',
    title : 'Edição de Parâmetro do Sistema',
    layout: 'fit',
    padding: 10,
    autoShow: true,
    modal: true,    
    initComponent: function() {
    	
        this.items = [{
            xtype: 'form',
            border: false,            
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
                name : 'dsUnidade',
                ref: 'dsUnidade',
                fieldLabel: 'Unidade',
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