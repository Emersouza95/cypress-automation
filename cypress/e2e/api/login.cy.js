describe('Fluxo de autenticação', () => {
    it('Deve realizar login com sucesso', () => {
        cy.loginByApi().then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('authorization');
            expect(response.body.message).to.eq('Login realizado com sucesso');
        });
    });

    it('Deve barrar login com email de formatação incorreta', () => {
        cy.loginByApi({ email: 'emailSemArrobaOuPontoCom' }).then((response) => {
            cy.log(response.body)
            expect(response.status).to.eq(400);
        });
    });

    it('Deve informar email ou senha inválido', () => {
        cy.loginByApi({ password: 'passwordInvalido' }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('message');
            expect(response.body.message).to.eq('Email e/ou senha inválidos');
        });
    });
});
