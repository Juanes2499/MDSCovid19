export const operadoresFiltro = [
    {
        label: 'Igual',
        value: '='
    },
    {
        label: 'Como',
        value: 'LIKE'
    },
    {
        label: 'Contiene',
        value: 'IN'
    },
    {
        label: 'Diferente de',
        value: '!='
    }
]

export const operadoresConectoresFiltro =[
    {
      label: "Operadores",
      children: [
        {
            label: 'Igual',
            value: '='
        },
        {
            label: 'Como',
            value: 'LIKE'
        },
        {
            label: 'Contiene',
            value: 'IN'
        },
        {
            label: 'Diferente de',
            value: '!='
        }
      ]
    },
    {
        label: "Conectores",
        children: [
          {
              label: 'And',
              value: '_AND'
          },
          {
              label: 'Or',
              value: '_OR'
          }
        ]
      },
  ]