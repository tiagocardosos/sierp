<?php

$menu = "{ 
            children: [
                    {
                        text:'Gestão Corporativa',
                        expanded: true,
                        children:[
                            {
                                text:'Usuários',
                                leaf: true,
                                xtypeClass: 'usuarioList'
                            },{
                                text:'Perfis de Usuários',
                                leaf:true,
                                xtypeClass: 'perfilList'
                            },{
                                text:'Parâmetros Fiscais',
                                leaf:true,
                                xtypeClass: 'parametrosFiscaisList'
                            },{
                                text:'Parâmetros do Sistema',
                                leaf:true,
                                xtypeClass: 'parametrosSistemaList'
                            }
                        ]
                    },{
                        text:'Gestão de Pessoas',
                        expanded: true,
                        children:[
                            {
                                text:'Clientes',
                                leaf: true,
                                xtypeClass: 'clienteList'
                            },{
                                text:'Fornecedores',
                                leaf:true,
                                xtypeClass: 'fornecedorList'
                            },{
                                text:'Funcionários',
                                leaf:true,
                                xtypeClass: 'funcionarioList'
                            }
                        ]
                    },{
                        text:'Gestão Financeira',
                        expanded: true,
                        children:[
                            {
                                text:'Contas Pagar / Receber',
                                leaf:true,
                                xtypeClass: 'contasPagarReceberList'
                            },{
                                text:'Fluxo de Caixa',
                                leaf:true,
                                xtypeClass: 'fluxoCaixaList'
                            },{
                                text:'Lançamento de Contas',
                                leaf:true,
                                xtypeClass: 'lancamentoContasList'
                            },{
                                text:'Emissão de Cheques',
                                leaf:true,
                                xtypeClass: 'emissaoChequesList'
                            },{
                                text:'Plano de Contas',
                                leaf:true,
                                xtypeClass: 'planoContasList'
                            },{
                                text:'Centro de Custo',
                                leaf:true,
                                xtypeClass: 'centroCustoList'
                            },{
                                text:'Formas de Pagamento',
                                leaf:true,
                                xtypeClass: 'formaPagamentoList'
                            },{
                                text:'Condições de Pagamento',
                                leaf:true,
                                xtypeClass: 'condicoesPagamentoList'
                            },{
                                text:'Conta Corrente',
                                leaf:true,
                                xtypeClass: 'contaCorrenteList'
                            },{
                                text:'Relatórios Financeiros',
                                expanded: false,
                                iconCls : 'relatorio',
                                children:[
                                    {
                                        text:'Extrato de Movimentações',
                                        leaf: true,
                                        iconCls : 'relatorio',
                                        xtypeClass: 'extratoRel'
                                    },{
                                        text:'Fluxo de Caixa',
                                        leaf: true,
                                        iconCls : 'relatorio',
                                        xtypeClass: 'fluxoCaixaRel'
                                    },{
                                        text:'Contas a Pagar / Receber',
                                        leaf: true,
                                        iconCls : 'relatorio',
                                        xtypeClass: 'emissaoChequesRel'
                                    },{
                                        text:'Emissão de Cheques',
                                        leaf: true,
                                        iconCls : 'relatorio',
                                        xtypeClass: 'emissaoChequesRel'
                                    }
                                ]
                            },{
                                text:'Gráficos Financeiros',
                                expanded: false,
                                iconCls : 'grafico',
                                children:[
                                    {
                                        text:'Fluxo de Caixa',
                                        leaf: true,
                                        iconCls : 'grafico',
                                        xtypeClass: 'fluxoCaixaGra'
                                    },{
                                        text:'Contas a Pagar / Receber',
                                        leaf: true,
                                        iconCls : 'grafico',
                                        xtypeClass: 'contaPagarReceberGra'
                                    },{
                                        text:'Movimentação por cliente',
                                        leaf: true,
                                        iconCls : 'grafico',
                                        xtypeClass: 'clienteCaixaGra'
                                    }
                                ]
                            }
                        ]
                    }
                    ,
                    {
                        text:'Gestão de Estoque / Compras',
                        expanded: true,
                        children:[
                            {
                                text:'Produto',
                                leaf:true,
                                xtypeClass: 'produtoList'
                            },
                            {
                                text:'Movimentação',
                                leaf:true,
                                xtypeClass: 'movimentacaoEstoqueList'
                            },{
                                text:'Classe',
                                leaf:true,
                                xtypeClass: 'classeProdutoList'
                            },{
                                text:'Unidade',
                                leaf:true,
                                xtypeClass: 'unidadeProdutoList'
                            },{
                                text:'Grupo',
                                leaf:true,
                                xtypeClass: 'grupoProdutoList'
                            },{
                                text:'Relatórios Financeiros',
                                expanded: false,
                                iconCls : 'relatorio',
                                children:[
                                    {
                                        text:'Entradas',
                                        leaf: true,
                                        iconCls : 'relatorio',
                                        xtypeClass: 'entradaList'
                                    },{
                                        text:'Saídas',
                                        leaf: true,
                                        iconCls : 'relatorio',
                                        xtypeClass: 'saidaList'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        text:'Sair do Sistema',
                        iconCls : 'porta-fora',
                        leaf: true,
                        xtypeClass: 'sairSistema'
                                
                    }
                ]
            }";
echo $menu;
