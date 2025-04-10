describe('Fluxo de busca por produto', () => {
  beforeEach(() => {

    /*
    Este beforeEach serve para fazer a chamada do login pela API
    injetar no localStorage do navegador as propriedades necessárias
    e acessar diretamente a página alvo do teste, ganhando tempo de execução
    */
    cy.loginByApi().then(({ token, email }) => {
      cy.visit(`${Cypress.env('frontendUrl')}/home`, {
        onBeforeLoad(win) {
          win.localStorage.setItem('serverest/userToken', "Bearer " + token);
          win.localStorage.setItem('serverest/userEmail', email);
        },
      });
    });
    cy.intercept('GET', '**/produtos?**').as('getProdutos');
  });

  it('Adiciona produto na lista de compras', () => {
    cy.adicionaProdutoPelaHomePage('Rustic Marble Ball', 1)

    //Compara os dados que estão armazenados na fixture e o localStorage do navegador
    cy.fixture('products.json').then((produtos) => {
      const { _id, nome, preco, quantidade, amount } = produtos.find(p => p._id === 'EmVF2SNL7ybDWLxv');

      cy.window().then((win) => {
        const produtoArmazenado = JSON.parse(win.localStorage.getItem('products'))
          .find(p => p._id === 'EmVF2SNL7ybDWLxv');

        expect(produtoArmazenado).to.include({ _id, nome, preco, quantidade, amount });
      });
    });

    cy.get('h1').should('have.text', 'Lista de Compras');
  })

  it('Realiza busca por produto inexistente', () => {
    cy.get('[data-testid="pesquisar"]').type('produto inexistente', { delay: 0 });
    cy.get('[data-testid="botaoPesquisar"]').click();

    cy.wait('@getProdutos').then((interception) => {
      expect(interception.response.body.quantidade).to.eq(0)
    })

    cy.get('p').should('have.text', "Nenhum produto foi encontrado")
  })

})