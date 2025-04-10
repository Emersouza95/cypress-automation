Cypress.Commands.add('loginByApi', ({
    // Este custom command faz login diretamente pela API e salva o token para uso futuro
    email = Cypress.env('email'),
    password = Cypress.env('password')
} = {}) => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}/login`,
        failOnStatusCode: false,
        body: {
            email,
            password,
        },
    }).then((response) => {
        if (response.status === 200) {
            Cypress.env('userToken', response.body.authorization);
        }
        return response;
    });
});
