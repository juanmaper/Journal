import daybookRouter from '@/modules/daybook/router'

describe('Daybook router module tests', () => {
  
  test('the router should have this configuration', async() => {
    
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

    const promiseRoutes = []
    daybookRouter.children.forEach( child => promiseRoutes.push( child.component() ) )

    const routes = (await Promise.all( promiseRoutes )).map( r => r.default.name)

    expect( routes ).toContain('NoEntrySelected')
    expect( routes ).toContain('EntryView')

  })

})