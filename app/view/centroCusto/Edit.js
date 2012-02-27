Ext.define('MSIERP.view.centroCusto.Edit', {
    extend: 'MSIERP.view.AbstractForm',
    alias : 'widget.centroCustoEdit',
    title : 'Edição de Centro de Custo',

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
                name : 'dsCentroCusto',
                ref: 'dsCentroCusto',
                fieldLabel: 'Centro de Custo',
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