context('Visit to json schema form website', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Fill a simple form', () => {

        cy.fixture('data.json').then((jsonObject) => {

            cy.log(jsonObject)
            cy.log(jsonObject.keys);
            cy.log(jsonObject.values)

            for (const [key, value] of Object.entries(jsonObject)) {
                
                cy.log(key)
                cy.log(value)

                if (isArray(key)) {

                    cy.log("Is key array ? ", isArray(key))
                    cy.log("Is value array ? ", isArray(value))
                    buildComplexElement(key, value)
                } else {
                    buildBasicElement(key, value)
                }
            }
        })
    })
})


const addItemButtonXpath = "./button[contains(@class, 'array-item-add')]";

function buildArrayElement(key, value) {

    const arrayElement = cy.xpath("//h5[normalize-space()=" + key + "]/../..")

    arrayElement.xpath(addItemButtonXpath).click()

}

function buildObjectElement(key, value) {

}

function buildComplexElement(key, value) {
    buildArrayElement(key, value)
}

function buildBasicElement(key, value) {

    const basicElement = Cypress.$('#root_' + key.toString())

    cy.wrap(basicElement).then((element) => {

        const typeAttribute = element.prop('type')
        const tagNameAttribute = element.prop('tagName')
        const ariaHaspopupAttribute = element.prop('aria-haspopup')

        if ((typeAttribute === 'text' || typeAttribute === 'number') && tagNameAttribute === 'INPUT') {
            cy.wrap(basicElement).clear().type(value.toString())
        }

        if (tagNameAttribute === 'DIV' && ariaHaspopupAttribute === 'listbox') {
            cy.wrap(basicElement).click().find('[data-value=' + value.toString() + ']').click()
        }

        if (typeAttribute === 'checkbox' && tagNameAttribute === 'INPUT') {

            if (value) {
                cy.wrap(basicElement).check()
            } else {
                cy.wrap(basicElement).uncheck()
            }
        }
    })
}

function isArray(key) {
    return Object.prototype.toString.call(key) === '[object Array]';
}