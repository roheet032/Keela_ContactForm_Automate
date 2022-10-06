///<reference types="Cypress"/>

describe('Verify the Contact Module of the Keela App',()=>{

    let logindata,formdata;
    before(() => {
      cy.fixture("logincredential.json").then((data) => {             //calling fixture file data
       logindata = data;
     })

     cy.fixture("contactformdata.json").then((data)=>{
        formdata =data;
     })
    })

    it('Verify that "Add Contact" button is clickable and functioning properly',()=>{
        cy.visit('/')
        cy.login(logindata.email,logindata.password)    //using custom command
        cy.contains('Contacts').click()
        cy.wait(2000)
        cy.get('.btn-primary').click()
        cy.url().should('include','/contacts')
    })

    it('Verify Creating Contact of user by providing First Name, Last Name and Email only',()=>{
        cy.visit('/')
        cy.login(logindata.email,logindata.password)
        cy.contains('Contacts').click()
        cy.wait(2000)
        cy.get('.btn-primary').click()
        cy.get('[aria-required="false"]').first().type(formdata.FirstName)      //using contactformdata fixture file
        cy.get('[aria-required="false"]').eq(2).type(formdata.LastName)
        cy.get('[aria-required="false"]').eq(3).type(formdata.EmailAddress)
        cy.contains('Save').click()
        cy.contains('General Updates').should('be.visible')
        
    })
    
    it('Verify Creating Contact by providing only one required field i.e either First Name,Last Name or Email',()=>{
        cy.visit('/')
        cy.login(logindata.email,logindata.password)
        cy.contains('Contacts').click()
        cy.wait(2000)
        cy.get('.btn-primary').click()
        cy.get('[aria-required="false"]').first().type(formdata.FirstName)      //using contactformdata fixture file
        cy.contains('Save').click()
        cy.contains('General Updates').should('be.visible')
    })   

    it('Verify Creating Contact without providing any details in the contact form',()=>{
        cy.visit('/')
        cy.login(logindata.email,logindata.password)
        cy.contains('Contacts').click()
        cy.wait(2000)
        cy.get('.btn-primary').click()
        cy.contains('Save').click()
        cy.get('.notification-title').should('contain','Contact must contain at least one of the required fields')

    })

    it('Verify Creating Contact by entering invalid email format into the Email Field',()=>{
        cy.visit('/')
        cy.login(logindata.email,logindata.password)
        cy.contains('Contacts').click()
        cy.wait(2000)
        cy.get('.btn-primary').click()
        cy.get('[aria-required="false"]').eq(3).type('ram@gmail{enter}')
        cy.contains('Must be a valid email address.').should('be.visible')

    })

    it('Verify Creating Contact of user by providing one required field and future date in Birth Date Field',()=>{
        cy.visit('/')
        cy.login(logindata.email,logindata.password)
        cy.contains('Contacts').click()
        cy.wait(2000)
        cy.get('.btn-primary').click()
        cy.get('[aria-required="false"]').first().type(formdata.FirstName)
        cy.get('[aria-required="false"]').eq(6).select(8)
        cy.get('[aria-required="false"]').eq(7).select('June')
        cy.get('[aria-required="false"]').eq(8).select('2023')
        cy.contains('The Birth Date must be in the past.').should('be.visible')  
    })


    it('Verify that Country, City , State/Province , Postal/Zip fields are autofilled while adding address in Address Line 1 field',()=>{
        cy.visit('/')
        cy.login(logindata.email,logindata.password)
        cy.contains('Contacts').click()
        cy.wait(2000)
        cy.get('.btn-primary').click()
        cy.get('[placeholder="Address Line 1"]').type('Kathmandu')
        cy.get('.pac-container > :nth-child(1)').click()
        cy.get('[aria-required="false"]').eq(9).should('have.value','Kathmandu')
        cy.get('[aria-required="false"]').eq(10).should('have.value','Nepal')
        cy.get('[aria-required="false"]').eq(12).should('have.value','Bagmati Province')
        cy.get('[aria-required="false"]').eq(13).should('have.value','44600')
    })
    



})