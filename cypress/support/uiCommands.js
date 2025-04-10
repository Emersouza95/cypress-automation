Cypress.Commands.add('loginByUI', ({ email = Cypress.env('email'), password = Cypress.env('password') } = {}) => {
    //A única responsabilidade desse custom command é entrar na tela de login e simular a autenticação pela GUI
    //Os parâmetros deste custom command estão desestruturados para poder manipular as variáveis de forma flexível e individual

    cy.visit(Cypress.env('frontendUrl'));

    cy.get('#email').type(email, { delay: 0 });
    cy.get('#password').type(password, { delay: 0 });
    cy.get('[data-testid="entrar"]').click()
});

Cypress.Commands.add('adicionaProdutoPelaHomePage', (produtoEsperado, quantidadeProdutoEsperado) => {
    cy.get('[data-testid="pesquisar"]').type(produtoEsperado, { delay: 0 });
    cy.get('[data-testid="botaoPesquisar"]').click();

    cy.wait('@getProdutos').then(({ response: { body: { quantidade, produtos } } }) => {
        expect(quantidade).to.eq(quantidadeProdutoEsperado);
        expect(produtos[0].nome).to.eq(produtoEsperado);

        cy.get('.card-title').should('have.text', produtoEsperado);
        cy.get('[data-testid="adicionarNaLista"]').click();
    });
});
