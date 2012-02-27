Ext.define('MSIERP.view.cliente.Edit', {
    extend: 'MSIERP.view.AbstractForm',
    alias : 'widget.clienteEdit',
    title : 'Edição de Parâmetro do Sistema',
    bodyStyle:'padding:10px;',        
    initComponent: function() {
    	
        this.items = [{
            xtype: 'form',
            border: false,  
            fieldDefaults: {
                anchor: '100%',
                labelAlign: 'right',
                labelWidth: 140,
                allowBlank: false,                
                width : 600,
                combineErrors: false,
                msgTarget: 'side'
            },
            defaultType: 'textfield',
            defaults: {
                anchor: '100%'
            },
            items: [{
                xtype:'tabpanel',
                plain:true,
                activeTab: 0,
                width : 600,
                height:235,
                defaults:{bodyStyle:'padding:10px'},
                items:[{
                    title:'Dados Pessoais',
                    defaults: {
                        width: 430,
                        labelAlign: 'right',
                        labelWidth: 120
                    },
                    defaultType: 'textfield',
                    items: [{
                        fieldLabel: 'Nome',
                        name: 'nmPessoa',
                        allowBlank:false
                    },{
                        xtype: 'datefield',
                        fieldLabel: 'Nacimento',
                        name: 'dtNacimento'
                    },{
                        fieldLabel: 'CPF',
                        name: 'nrCPF'
                    }, {
                        fieldLabel: 'Email',
                        name: 'email',
                        vtype:'email'
                    }]
                },{
                    title:'Endereço',
                    defaults: {width: 230},
                    defaultType: 'textfield',

                    items: [{
                        fieldLabel: 'Home',
                        name: 'home',
                        value: '(888) 555-1212'
                    },{
                        fieldLabel: 'Business',
                        name: 'business'
                    },{
                        fieldLabel: 'Mobile',
                        name: 'mobile'
                    },{
                        fieldLabel: 'Fax',
                        name: 'fax'
                    }]
                },{
                    title:'Telefone',
                    defaults: {width: 230},
                    defaultType: 'textfield',

                    items: [{
                        fieldLabel: 'Home',
                        name: 'home',
                        value: '(888) 555-1212'
                    },{
                        fieldLabel: 'Business',
                        name: 'business'
                    },{
                        fieldLabel: 'Mobile',
                        name: 'mobile'
                    },{
                        fieldLabel: 'Fax',
                        name: 'fax'
                    }]
                },{
                    title:'E-mail',
                    defaults: {width: 230},
                    defaultType: 'textfield',

                    items: [{
                        fieldLabel: 'Home',
                        name: 'home',
                        value: '(888) 555-1212'
                    },{
                        fieldLabel: 'Business',
                        name: 'business'
                    },{
                        fieldLabel: 'Mobile',
                        name: 'mobile'
                    },{
                        fieldLabel: 'Fax',
                        name: 'fax'
                    }]
                },{
                    cls: 'x-plain',
                    title: 'Observações',
                    layout: 'fit',
                    items: {
                        xtype: 'htmleditor',
                        name: 'bio2',
                        fieldLabel: 'Biography'
                    }
                }]
            }]
           }
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