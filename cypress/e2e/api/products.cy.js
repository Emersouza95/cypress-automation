describe('Valida listagem de produtos', () => {
    beforeEach(() => {
        cy.loginByApi().then((response) => {
            cy.wrap(response.body.token).as('token')
        });
    })

    it('Deve listar os produtos utilizando um token válido para fazer a consulta', () => {
        cy.then(() => {
            cy.request({
                method: 'GET',
                url: `${Cypress.env('apiUrl')}/produtos`,
                headers: {
                    Authorization: '@token'
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('quantidade');
                expect(response.body.produtos).to.be.an('array');
            });
        });
    });
})