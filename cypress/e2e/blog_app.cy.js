
describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:8080/api/testing/reset')
      cy.visit('http://localhost:3000')

      const user = {
        username: 'admin',
        password: 'admin'
      }
      cy.request('POST', 'http://localhost:8080/api/users/', user) 
      cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function() {
        cy.visit('http://localhost:3000')
        cy.contains('login')
      })
  
      it('Login form is shown', function() {
        cy.contains('login').click()
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
        cy.contains('cancel')
    })


    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('admin')
            cy.get('#password').type('admin')
            cy.get('#login-button').click()
        
            cy.contains('admin logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('dsfsf')
            cy.get('#password').type('adfasfasmin')
            cy.get('#login-button').click()

            cy.contains('Wrong credentials').should('have.css', 'color', 'rgb(255, 0, 0)')

        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'admin', password: 'admin' })
        })
    
        it('A blog can be created', function() {
          cy.contains('new blog').click()
          cy.get('#title-input').type('title created by cypress')
          cy.get('#author-input').type('author created by cypress')
          cy.get('#url-input').type('url created by cypress')
          cy.contains('Create').click()
          cy.contains('title created by cypress')
          cy.contains('author created by cypress')
          cy.contains('Blog with title title created by cypress added')
        })

        it('A user can like a blog ', function() {
            cy.contains('new blog').click()
            cy.get('#title-input').type('title created by cypress')
            cy.get('#author-input').type('author created by cypress')
            cy.get('#url-input').type('url created by cypress')
            cy.contains('Create').click()

            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('likes : 1')
        })

        it('A user can delete a blog ', function() {
            cy.contains('new blog').click()
            cy.get('#title-input').type('title created by cypress')
            cy.get('#author-input').type('author created by cypress')
            cy.get('#url-input').type('url created by cypress')
            cy.contains('Create').click()

            cy.contains('view').click()
            cy.contains('Remove').click()
            cy.get('#blogs').should('not.contain', 'title created by cypress')
        })

        it.only('Blogs should appear in sorted order ', function() {
            cy.contains('new blog').click()
            cy.get('#title-input').type('title created by cypress first place')
            cy.get('#author-input').type('author created by cypress')
            cy.get('#url-input').type('url created by cypress')
            cy.contains('Create').click()

            cy.contains('new blog').click()
            cy.get('#title-input').type('title created by cypress2 second place')
            cy.get('#author-input').type('author created by cypress2')
            cy.get('#url-input').type('url created by cypress')
            cy.contains('Create').click()

            cy.get('.blog-nodetails').eq(0).contains('view').click()
            cy.get('.blog-nodetails').eq(1).contains('view').click()

            cy.get('.blog-withdetails').eq(0).contains('like').click().wait(2000).click().wait(2000)
            cy.get('.blog-withdetails').eq(1).contains('like').click()
        
            cy.visit('http://localhost:3000')

            cy.get('.blog-nodetails').eq(0).should('contain', 'title created by cypress first place')
            cy.get('.blog-nodetails').eq(1).should('contain', 'title created by cypress2 second place')
        })

    })

    

})