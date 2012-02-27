Ext.define('MSIERP.view.banco.Edit', {
    extend: 'MSIERP.view.AbstractForm',
    alias : 'widget.bancoEdit',
    title : 'Edição de Banco',
    initComponent: function() {
    	
        this.items = [{
            xtype: 'form',
            border: false,
            fieldDefaults: {
                anchor: '100%',
                labelWidth: 140,
                labelAlign: 'right',
                allowBlank: false,                
                width : 450,
                combineErrors: false,
                msgTarget: 'side'
            },
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype: 'textfield',
                name : 'cdBanco',
                ref: 'cdBanco',
                fieldLabel: 'Código',
                allowBlank: false
            },{
                xtype: 'textfield',
                name : 'dsBanco',
                ref: 'dsBanco',
                fieldLabel: 'Banco',
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

        this.buttons = [];

        this.callParent(arguments);
    }    

});