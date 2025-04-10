describe('Fluxo de autenticação do usuário', () => {
  beforeEach(() => {
    cy.intercept('POST', `${Cypress.env('apiUrl')}/login`).as('loginRequest');
  })

  it('Deve performar a ação de login com sucesso', () => {
    cy.loginByUI();

    //Validação da API como complemento do teste executado no frontend
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.all.keys('authorization', 'message');
      expect(interception.response.body.message).to.eq('Login realizado com sucesso')

      //Validação de frontend garantindo também que a experiência do usuário é coerente conforme esperamos
      cy.get('[data-testid="home"]').should('contain.text', 'Home');
    });
  })

  it('Deve acusar Email e/ou senha inválidos ao inserir dados incorretos', () => {
    cy.loginByUI({ email: 'emailquenaoexiste@inexistente.com', password: '12345678' })

    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(401);
      expect(interception.response.body).to.have.property('message');
      expect(interception.response.body.message).to.eq('Email e/ou senha inválidos')

      cy.get('.alert').should('contain.text', 'Email e/ou senha inválidos')
    })
  });

  it('Deve acusar campos obrigatórios não preenchidos', () => {
    cy.visit('https://front.serverest.dev')

    cy.get('[data-testid="entrar"]').click()

    cy.get('.form').eq(0).should('contain', 'Email é obrigatório');
    cy.get('.form').eq(0).should('contain', 'Password é obrigatório');
  })
})