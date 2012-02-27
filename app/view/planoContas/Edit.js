var dadosTipoConta = Ext.create('Ext.data.Store', {
    fields: ['val', 'desc'],
    data : [
        {"val":"P", "desc":"Pagar"},
        {"val":"R", "desc":"Receber"}
    ]
});

Ext.require(['MSIERP.view.planoContas.Combo']);

Ext.define('MSIERP.view.planoContas.Edit', {
    extend: 'MSIERP.view.AbstractForm',
    alias : 'widget.planoContasEdit',
    title : 'Edição de Plano de Conta',

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
                xtype: 'planoContasCombo',
                name : 'idPlanoContasPai',
                ref: 'idPlanoContasPai',                
                fieldLabel: 'Plano de Contas Pai',
                allowBlank: false
            },{
                xtype: 'textfield',
                name : 'Plano de Contas',
                ref: 'dsPlanoContas',
                fieldLabel: 'Descrição',
                allowBlank: false
            },{
                xtype: 'textfield',
                name : 'nrClassificiacao',
                ref: 'nrClassificiacao',
                fieldLabel: 'Nº Classificação',
                allowBlank: true
            },{
                xtype: 'combobox',
                fieldLabel: 'Tipo Conta',
                store: dadosTipoConta,
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