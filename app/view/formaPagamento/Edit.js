var dadosCMB = Ext.create('Ext.data.Store', {
    fields: ['val', 'desc'],
    data : [
        {"val":"D", "desc":"Dinheiro"},
        {"val":"C", "desc":"Cartão"},
        {"val":"B", "desc":"Boleto"},
        {"val":"CH", "desc":"Cheque"}
        
    ]
});


Ext.define('MSIERP.view.formaPagamento.Edit', {
    extend: 'MSIERP.view.AbstractForm',
    alias : 'widget.formaPagamentoEdit',
    title : 'Edição de Parâmetro do Sistema',
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
                name : 'dsFormaPagamento',
                ref: 'dsFormaPagamento',
                fieldLabel: 'Forma de Pagamento',
                allowBlank: false
            },{
                xtype: 'combobox',
                fieldLabel: 'Tipo',
                store: dadosCMB,
                queryMode: 'local',
                displayField: 'desc',
                valueField: 'val'             
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