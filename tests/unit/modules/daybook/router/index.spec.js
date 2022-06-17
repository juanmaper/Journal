import daybookRouter from '@/modules/daybook/router'

describe('Daybook router module tests', () => {
  
  test('the router should have this configuration', () => {
    
    expect( daybookRouter ).toMatchObject({
      name: 'daybook',
      component: expect.any( Function ),
      children: [
        {
          path: '',
          name: 'no-entry',
          component: expect.any( Function ),
        },
        {
          path: ':id',
          name: 'entry',
          component: expect.any( Function ),
          props: expect.any( Function )
        }
      ]
    })

  })

})