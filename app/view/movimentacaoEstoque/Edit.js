var dadosTipoMovimentacao = Ext.create('Ext.data.Store', {
    fields: ['val', 'desc'],
    data : [
        {"val":"E", "desc":"Entrada"},
        {"val":"S", "desc":"Saída"},
        {"val":"C", "desc":"Cancelado"},
        {"val":"D", "desc":"Devolução"}        
    ]
});

Ext.require(['MSIERP.view.produto.Combo']);

Ext.define('MSIERP.view.movimentacaoEstoque.Edit', {
    extend: 'MSIERP.view.AbstractForm',
    alias : 'widget.movimentacaoEstoqueEdit',
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
                xtype: 'datefield',
                name : 'dtMovimentacao',
                ref: 'dtMovimentacao',
                fieldLabel: 'Data Movimetação',
                allowBlank: false,
                value: new Date(),
                disabled: true
            },{
                xtype: 'textfield',
                name : 'nrNotaFiscal',
                ref: 'nrNotaFiscal',
                fieldLabel: 'Nº Nota Fiscal',
                allowBlank: false
            },{
                xtype: 'textfield',
                name : 'qtdProduto',
                ref: 'qtdProduto',
                fieldLabel: 'Quantidade',
                allowBlank: false
            },{
                xtype: 'produtoCombo'
            },{
                xtype: 'combobox',
                fieldLabel: 'Tipo Movimentação',
                store: dadosTipoMovimentacao,
                queryMode: 'local',
                displayField: 'desc',
                valueField: 'val'             
            },{                                
                xtype: 'textareafield',
                name : 'dsObservacao',
                ref: 'dsObservacao',
                fieldLabel: 'Obs.',
                grow      : true,                
                allowBlank: false
            }
            ]}
        ];

        this.buttons = [];

        this.callParent(arguments);
    }    

});