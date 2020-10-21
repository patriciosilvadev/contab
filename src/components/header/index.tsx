import React from 'react'

import MainHeader from './header'
import MenuProfile from './menuProfile'
import Navigation from './navigation'

const menuItems = [
  { label: 'Visão Geral', link: 'dashboard' },
  {
    label: 'Vendas',
    sections: [
      {
        name: 'Controle',
        options: [
          { label: 'Frente de Caixa', link: 'pdv' },
          { label: 'Ordem de Serviço', link: 'serviceOrder' },
          { label: 'Contratos', link: 'contracts' },
          { label: 'Vendas e Orçamentos', link: 'salesAndQuotes' },
          { label: 'Parcelas a Receber', link: 'installments' },
          { label: 'Nota Fiscal de Serviço', link: 'nfs' },
          { label: 'Nota Fiscal de Produto', link: 'nf' },
          { label: 'Nota Fiscal de Consumidor', link: 'nfc' }
        ]
      },
      {
        name: 'Cadastros',
        options: [
          { label: 'Cliente', link: 'clients' },
          { label: 'Produto', link: 'products' },
          { label: 'Serviço', link: 'services' },
          { label: 'Estoque', link: 'stock' }
        ]
      }
    ]
  },
  {
    label: 'Compras',
    sections: [
      {
        name: 'Controle',
        options: [
          { label: 'Compras', link: 'shopping' },
          { label: 'Parcelas a Pagar', link: 'installmentsToPay' },
          { label: 'Notas de Compra', link: 'shoppingNotes' }
        ]
      },
      {
        name: 'Cadastros',
        options: [
          { label: 'Fornecedores', link: 'suppliers' },
          { label: 'Produto', link: 'products' },
          { label: 'Serviço', link: 'services' },
          { label: 'Estoque', link: 'stock' }
        ]
      }
    ]
  },
  {
    label: 'Financeiro',
    sections: [
      {
        name: 'Controle',
        options: [
          { label: 'Contas', link: 'bankAccounts' },
          { label: 'Extrato', link: 'extract' },
          { label: 'Contas a Pagar', link: 'billsToPay' },
          { label: 'Contas a Receber', link: 'BillsToReceive' }
        ]
      },
      {
        name: 'Cadastros',
        options: [{ label: 'Categorias', link: 'category' }]
      }
    ]
  },
  {
    label: 'Relatórios',
    sections: [
      {
        name: 'Financeiro',
        options: [
          { label: 'Fluxo de Caixa', link: 'relatorio1' },
          { label: 'DRE Gerencial', link: 'relatorio2' },
          { label: 'Posição de Contas', link: 'relatorio3' },
          { label: 'Análise de Pagamentos', link: 'relatorio4' },
          { label: 'Análise de Recebimentos', link: 'relatorio5' }
        ]
      },
      {
        name: 'Vendas',
        options: [
          { label: 'Vendas', link: 'relatorio6' },
          { label: 'Mais Vendido', link: 'relatorio7' },
          { label: 'Itens por Cliente', link: 'relatorio8' },
          { label: 'Clientes', link: 'relatorio9' }
        ]
      },
      {
        name: 'Estoque',
        options: [{ label: 'Giro de Estoque', link: 'relatorio10' }]
      }
    ]
  }
]

const Header: React.FC = () => {
  return (
    <MainHeader>
      <Navigation menu={menuItems} />
      <MenuProfile />
    </MainHeader>
  )
}

export default Header
