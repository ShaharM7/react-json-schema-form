context('Visit to json schema form website', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('Fill a simple form', () => {

        cy.fixture('data.json').then((jsonObject) => {

            for (const [key, value] of Object.entries(jsonObject)) {

                if (value.constructor.name === 'Array' || value.constructor.name === 'Object') {
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

    //cy.xpath("//h5[normalize-space()=" + key + "]/../..").xpath(addItemButtonXpath).click()
}

function buildObjectElement() {

}

function buildComplexElement(key, value) {

    if (value.constructor.name === 'Array') {
        buildArrayElement(key, value)
    } else if (value.constructor.name === 'Object') {
        buildObjectElement()
    }
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

function Inject(arrayElements) {
    for (const basicElement in arrayElements) {

    }
}