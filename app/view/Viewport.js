var storeFluxo = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'Entras', 'Saídas'],
    data: [
        { 'name': 'Saídas',   'data1': 7,  'data2': 8,  'data3': 16, 'data4': 10, 'data5': 3  },
        { 'name': 'Entradas',   'data1': 10, 'data2': 12, 'data3': 54, 'data4': 8,  'data5': 13 }        
    ]
});

var store = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'Contas a Pagar', 'Contas a Receber', 'Pagas', 'Recebidas'],
    data: [
        { 'name': 'Contas a Pagar',   'data1': 10, 'data2': 12, 'data3': 14, 'data4': 8,  'data5': 13 },
        { 'name': 'Contas a Receber',   'data1': 7,  'data2': 8,  'data3': 16, 'data4': 10, 'data5': 3  },
        { 'name': 'Pagas', 'data1': 5,  'data2': 2,  'data3': 14, 'data4': 12, 'data5': 7  },
        { 'name': 'Recebidas',  'data1': 2,  'data2': 14, 'data3': 6,  'data4': 1,  'data5': 23 }
    ]
});

Ext.define('MSIERP.view.Viewport', {
    extend: 'Ext.container.Viewport',
    title: 'Gestão de Construtoras - MSIERP',
    layout: 'border',
    itemId: 'viewPortPrincipal',
    items: [
    {
        xtype: 'box',
        id: 'header',
        region: 'north',
        html: '<h1>Gestão de Construtoras - MSIERP</h1>',
        height: 30
    }
    ,{
        region:'west',
        border: false,
        split: true,
        margins: '0 0 5 5',
        width: 275,
        minWidth: 150,
        maxWidth: 400,
        xtype: 'treepanel',
        title: 'Menu',
        rootVisible: false,
        autoScroll: true,
        collapsible: true,
        animate: true,
        useArrows: true,
        itemId: 'treePanelPrincipal',
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                text: 'Expandir todos',
                iconCls: 'expand', 
                handler: function(){
                    this.up('#treePanelPrincipal').expandAll();
                }
            }, {
                text: 'Contrair todos',
                iconCls: 'collapse', 
                handler: function(){
                    this.up('#treePanelPrincipal').collapseAll();
                }
            }]
        }],
        listeners: {
            itemclick: function(view, record, item, index, evt, options) {
                if (record.get('leaf')) {
                    
//                    var controller = WSExt.app.getController(record.raw['controllerName']);
//                    controller.init();
                    
                    var abaAberta = this.ownerCt.down('#tabCenter').items.findBy(function( aba ){
                        return aba.title === record.get('text');
                    });
                    
                    if(!abaAberta){
                        this.ownerCt.down('#tabCenter').add({
                            title: record.get('text') || 'Tela do sistema',
                            closable: true,
                            layout: 'fit',
                            autoDestroy: true,
                            items: {
                                xtype: record.raw['xtypeClass']
                            }
                        }).show();
                    }else{
                        this.ownerCt.down('#tabCenter').setActiveTab(abaAberta);
                    }
                    
                }
            }
        },
        store: Ext.create('Ext.data.TreeStore', {
            proxy: {
                type: 'ajax',
                url: 'php/menu.php',
                noCache : false,
                actionMethods: {
                    read: 'POST'
                }
            }
        })
    }
    ,{
        xtype: 'tabpanel',
        region: 'center', 
        margins: '10 5 5 0',
        border: false,
        itemId: 'tabCenter',
        items: [{
            title: 'Painel de Resumo',            
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'splitter',
                    height: 10
                },{
                    xtype: 'grid',
                    title: 'Resumo de Contas',
                    columns: [
                        {text: "Descrição", flex: 1, dataIndex: 'Author', sortable: true},
                        {text: "Tipo Conta", width: 180, dataIndex: 'Title', sortable: true},
                        {text: "Data Vencimento", width: 115, dataIndex: 'Manufacturer', sortable: true},
                        {text: "Valor", width: 100, dataIndex: 'ProductGroup', sortable: true}
                    ],
                    flex: 1,
                    width: '100%',
                    height: '20%'
                },{
                    xtype: 'splitter',
                    height: 10
                },{
                        layout:'column',
                        items: [{
                            title: 'Fluxo de Caixa',
                            columnWidth: .50,
                            //Gráfico de Fluxo de Caixa
                            items: {
                                xtype: 'chart',
                                width: 500,
                                height: 300,
                                animate: true,
                                store: storeFluxo,
                                theme: 'Base:gradients',
                                series: [{
                                    type: 'pie',
                                    field: 'data1',
                                    showInLegend: true,
                                    tips: {
                                        trackMouse: false,
                                        /*width: 100,
                                        height: 18,*/
                                        renderer: function(storeItem, item) {
                                            // calculate and display percentage on hover
                                            var total = 0;
                                            storeFluxo.each(function(rec) {
                                                total += rec.get('data1');
                                            });
                                            this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
                                        }
                                    },
                                    highlight: {
                                        segment: {
                                            margin: 5
                                        }
                                    },
                                    label: {
                                        field: 'name',
                                        display: 'rotate',
                                        contrast: true,
                                        font: '12px Arial'
                                    }
                                }]
                            }                            
                        },{
                            title: 'Contas Pagar vs Receber',
                            columnWidth: .50,
                            //Gráfico de Contas
                            items: {
                                xtype: 'chart',
                                width: 500,
                                height: 300,
                                animate: true,
                                store: store,
                                theme: 'Base:gradients',
                                series: [{
                                    type: 'pie',
                                    field: 'data1',
                                    showInLegend: true,
                                    tips: {
                                        trackMouse: false,
                                        /*width: 100,
                                        height: 18,*/
                                        renderer: function(storeItem, item) {
                                            // calculate and display percentage on hover
                                            var total = 0;
                                            store.each(function(rec) {
                                                total += rec.get('data1');
                                            });
                                            this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
                                        }
                                    },
                                    highlight: {
                                        segment: {
                                            margin: 5
                                        }
                                    },
                                    label: {
                                        field: 'name',
                                        display: 'rotate',
                                        contrast: true,
                                        font: '12px Arial'
                                    }
                                }]
                            }                            
                        }]                   
                }
            ]
        }]
    }]
            
});
