Ext.require(['MSIERP.view.unidadeProduto.Combo']);
Ext.require(['MSIERP.view.classeProduto.Combo']);
Ext.require(['MSIERP.view.grupoProduto.Combo']);

Ext.define('MSIERP.view.produto.Edit', {
    extend: 'MSIERP.view.AbstractForm',
    alias : 'widget.produtoEdit',
    title : 'Edição de Produto',
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
                name : 'dsProduto',
                ref: 'dsProduto',
                fieldLabel: 'Produto',
                allowBlank: false
            },{
                xtype: 'unidadeProdutoCombo',
                allowBlank: true
            },{
                xtype: 'classeProdutoCombo',
                allowBlank: true
            },{
                xtype: 'textfield',
                name : 'qtdMinima',
                ref: 'qtdMinima',
                fieldLabel: 'Est. Min.',
                allowBlank: false                
            },{
                xtype: 'textfield',
                name : 'qtdMaxima',
                ref: 'qtdMaxima',
                fieldLabel: 'Est. Max.',
                allowBlank: false                
            },{
                xtype: 'grupoProdutoCombo'
            },{
                xtype: 'textfield',
                name : 'prCusto',
                ref: 'prCusto',
                fieldLabel: 'Preço Custo',
                allowBlank: false
            },{
                xtype: 'textfield',
                name : 'prVenda',
                ref: 'prVenda',
                fieldLabel: 'Preço Venda',
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
                    }
               ]}
            ]}
        ];

        this.buttons = [];

        this.callParent(arguments);
    }    

});