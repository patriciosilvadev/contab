export default {
  API_STRIPE_TEST:
    'pk_test_51HPrCBAovamKBaC1fH8Lau08e554LGOfjCF72kAJT9DUHpQqUUZ5LWnxiXTFNQkhYZzAgyB6gzDbWGXs8sQRmpkI00S0vZ1D3O',

  PLAN_TEST_BASIC_PRODUCT_ID: 'prod_I3q8dVmru5Nm8u',
  PLAN_TEST_BASIC_PRICE_ID: 'price_1HTiRsAovamKBaC1840JyApY',
  PLAN_TEST_CONTROL_PRODUCT_ID: 'prod_I45qf3JAQg7Dgv',
  PLAN_TEST_CONTROL_PRICE_ID: 'price_1HTxelAovamKBaC1k27Yxw5C',
  PLAN_TEST_ADVANCED_PRODUCT_ID: 'prod_I45sHdJ1IhmDYA',
  PLAN_TEST_ADVANCED_PRICE_ID: 'price_1HTxgeAovamKBaC1v0uqDiLT',

  PLAN_BASIC_PRODUCT_ID: 'prod_I3q80WnG3lxwcE',
  PLAN_BASIC_PRICE_ID: 'price_1HTiS2AovamKBaC16BOlZ4uI',
  PLAN_CONTROL_PRODUCT_ID: 'prod_I3q9Xq28vrh0DZ',
  PLAN_CONTROL_PRICE_ID: 'price_1HTiSqAovamKBaC1gNh1sv1V',
  PLAN_ADVANCED_PRODUCT_ID: 'prod_I3q97MsnEbj1dk',
  PLAN_ADVANCED_PRICE_ID: 'price_1HTiTNAovamKBaC104OtjzbV',

  TYPE_CLIENT: 'Cliente',
  TYPE_SUPPLIER: 'Fornecedor',
  TYPE_PRODUCT: 'Produto',
  TYPE_NF: 'NF',
  TYPE_NFC: 'NFC',

  FILTER_ALL: 'ALL',
  FILTER_ACTIVE: 'ACTIVE',
  FILTER_INACTIVE: 'INACTIVE',
  FILTER_CANCELED: 'CANCELED',
  FILTER_PENDING: 'PENDING',
  FILTER_SENT: 'SENT',

  PF: 'Pessoa Física',
  PJ: 'Pessoa Jurídica',
  PF_TYPE: 'PF',
  PJ_TYPE: 'PJ',

  IND_INSCR_SOCIAL_Y: 'Y',
  IND_INSCR_SOCIAL_N: 'N',
  IND_INSCR_SOCIAL_I: 'I',
  IND_INSCR_SOCIAL_Y_LABEL: 'Contribuinte',
  IND_INSCR_SOCIAL_N_LABEL: 'Não contribuinte',
  IND_INSCR_SOCIAL_I_LABEL: 'Contribuinte isento',

  DEFAULT_ORDER: 'id',
  DEFAULT_HEADERS: [{ field: 'name', displayName: 'Nome' }],

  UNIT_LIST: [
    { value: 'RL', label: 'RL' },
    { value: 'UNI', label: 'UNI' },
    { value: 'CJ', label: 'CJ' },
    { value: 'l', label: 'l' },
    { value: 'JG', label: 'JG' },
    { value: 'PC', label: 'PC' },
    { value: 'KT', label: 'KT' },
    { value: 'UND', label: 'UND' },
    { value: 'UN', label: 'UN' },
    { value: 'Quantidade', label: 'Quantidade' },
    { value: 'Kilograma', label: 'Kilograma' }
  ],
  PRODUCT_ORIGIN_LIST: [
    { value: 0, label: '0 - Nacional' },
    { value: 1, label: '1 - Nacional' },
    { value: 2, label: '2 - Estrangeira - Adquirida no mercado interno' },
    {
      value: 3,
      label:
        '3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40%'
    },
    {
      value: 4,
      label:
        '4 - Nacional, cuja produção tenha sido feita em conformidade com a MP 252(MP do BEM)'
    },
    {
      value: 5,
      label:
        '5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%'
    },
    {
      value: 6,
      label:
        '6 - Estrangeira - Importação direta, sem similar nacional, constante em lista de Resolução CAMEX'
    },
    {
      value: 7,
      label:
        '7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista de Resolução CAMEX'
    },
    {
      value: 8,
      label:
        '8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%'
    }
  ]
}
