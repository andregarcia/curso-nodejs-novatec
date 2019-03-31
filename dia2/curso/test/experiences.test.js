const app = require('../server/app')
const request = require('supertest')(app)
const assert = require('assert')
const db = require('../server/config/mongo')

describe('experiences routes', () => {

  let id;
  beforeEach((done) => {
    let obj = {name: 'Tests'}
    db.collection('experiences').insert(obj, (err,result) =>{
      id = result._id.toString()
      done()
    })
  })
  afterEach((done) => {
    db.collection('experiences').remove({}, done)
  })


  it('GET /experiences', () => {

    return request
    .get('/experiences')
    .expect(200)
    .then( result => {
      assert.ok(result.body.length)
      assert.equal(result.body.length, 1)
      assert.equal(result.body[0].name , 'Tests')
    })

  })
  it('GET /experiences/:id', () => {
    return request
    .get(`/experiences/${id}`)
    .expect(200)
    .then( result => {
      assert.equal(result.body._id, id)
      assert.equal(result.body.name, 'Tests')
    })

  })
  it('POST /experiences', () => {
    let obj = {name : 'Test Post'}
    return request
    .post('/experiences')
    .send(obj)
    .expect(201)
    .then(result => {
      assert.ok(result.body._id)
      assert.ok(result.body.name)
      assert.equal(result.body.name, 'Test Post')
    })

  })
  it('PUT /experiences/:id', () => {
    let obj = {name : 'Test Put'}
    return request
    .put(`/experiences/${id}`)
    .send(obj)
    .expect(200)
    .then(result => {
      assert.deepEqual(result.body, {n:1, nModified:1, ok:1})
    })

  })
  it('DELETE /experiences/:id', () => {
    return request
    .delete(`/experiences/${id}`)
    .expect(204)
    .then(result => {
      assert.equal(result.text, '')
    })

  })
})
