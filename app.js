/**
 * Ext JS Library 4.0.2
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 *	
 * Projeto Sistema de Gestão - ERP
 * Moodox - Soluções Inteligentes
 * http://www.moodox.com.br
 * 
 * 
 */

Ext.Loader.setPath('Ext', './extjs/src');

Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true
});

Ext.require([
    'Ext.tree.*',
    'Ext.data.*',
    'Ext.tip.*',
    ]);
    
Ext.require('Ext.chart.*');

Ext.require(['Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite']);
    
Ext.application({
    
    name: 'MSIERP',
    appFolder: 'app',
    controllers: [ 
        /* Corporativo */
        'Usuario', 'Perfil', 'ParametrosFiscais', 'ParametrosSistema', 
        
        /* Financeiro */
        'LancamentoContas', 'CentroCusto', 'ContaCorrente', 'FluxoCaixa', 'FormaPagamento', 'PlanoContas', 
        'CondicoesPagamento', 'ContasPagarReceber', 'EmissaoCheques', 'CondicoesPagamento',  
        
        /* Pessoas */
        'Cliente', 'Funcionario', 'Fornecedor',
        
        /* Estoque / Compras */
        'UnidadeProduto', 'ClasseProduto', 'GrupoProduto', 'MovimentacaoEstoque', 'Produto'
    ],
    
    autoCreateViewport: true,
    
    launch: function() {
        MSIERP.app = this;
    }
});