Ext.require(['MSIERP.view.banco.Combo']);

Ext.define('MSIERP.view.contaCorrente.Edit', {
    extend: 'MSIERP.view.AbstractForm',
    alias : 'widget.contaCorrenteEdit',
    title : 'Edição de Conta Corrente',
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
                xtype: 'bancoCombo'
            },{
                xtype: 'textfield',
                name : 'nrAgencia',
                ref: 'nrAgencia',
                fieldLabel: 'Agencia',
                allowBlank: false
            },{
                xtype: 'textfield',
                name : 'nrContaCorrente',
                ref: 'nrContaCorrente',
                fieldLabel: 'Nº Conta',
                allowBlank: false
            },{
                xtype: 'textfield',
                name : 'nrVariacao',
                ref: 'nrVariacao',
                fieldLabel: 'Variação',
                allowBlank: true
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
                    }]
            },{
                xtype:'fieldset',
                title: 'Configurações de Boleto',
                collapsible: true,
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items :[{
                    fieldLabel: 'Convênio',
                    name: 'nrConvenio',
                    allowBlank: true                                        
                },{
                    fieldLabel: 'Contrato',
                    name: 'nrContrato',
                    allowBlank: true                                        
                },{
                    fieldLabel: 'Carteira',
                    name: 'nrCarteira',
                    allowBlank: true                                        
                },{
                    fieldLabel: 'Variação Carteira',
                    name: 'nrVariacaoCarteira',
                    allowBlank: true                    
                }]
            }
            ]}
        ];

        this.buttons = [];

        this.callParent(arguments);
    }    

});