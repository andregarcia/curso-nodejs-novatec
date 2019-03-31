const app = require('../server/app')
const request = require('supertest')(app)
const assert = require('assert')

describe('Main routes', () => {
    it.skip('test throw error', () => {
        throw new Error('Deu ruim... =/')
    })

    //test promisse -> PREFIRO ASSIM
    it('GET /', () => {
        return request
            .get('/')
            .expect(200)
            .then((result) => {
                assert.equal('Pong!', result.text)
            })
    })

    //test com callback
    it('GET /not-found', (done) => {
        request
            .get('/not-found')        
            .expect(404)
            .end((err, result) => {
                assert.equal('not found', result.body.message)
                done()
            })
    })
})