const request = require('supertest');
const app = require('../src/app');


describe('Undefined endpoint', () => {
  it('should get an undefined route error', async () => {
    const res = await request(app).get('/')

    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('code')
    expect(res.body.code).not.toEqual(0)
    expect(res.body).toHaveProperty('msg')
    expect(res.body.msg).not.toEqual('Success')
  })
})

describe('Missing parameter in request body', () => {
  it('should get a missing parameter error', async () => {
    const res = await request(app)
      .post('/records/query')
      .send({
        'startDate': '2016-01-01',
        minCount: 2500,
        maxCount: 3000
      })
    
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('code')
    expect(res.body.code).not.toEqual(0)
    expect(res.body).toHaveProperty('msg')
    expect(res.body.msg).not.toEqual('Success')
  })
})

describe('Invalid date format in request body', () => {
  it('should post an invalid date format', async () => {
    const res = await request(app)
      .post('/records/query')
      .send({
        'startDate': '2016-01-01',
        'startDate': '2020/10/01',
        minCount: 2500,
        maxCount: 3000
      })
    
    expect(res.statusCode).toEqual(400)
    expect(res.body).toHaveProperty('code')
    expect(res.body.code).not.toEqual(0)
    expect(res.body).toHaveProperty('msg')
    expect(res.body.msg).not.toEqual('Success')
  })
})

describe('Record query endpoint', () => {
  it('should post a record query that returns 0 records', async () => {
    const res = await request(app)
      .post('/records/query')
      .send({
        'startDate': '2016-01-01',
        'endDate': '2015-12-31',
        minCount: 2500,
        maxCount: 3000
      })
    
    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('code')
    expect(res.body.code).toEqual(404)
    expect(res.body).toHaveProperty('msg')
    expect(res.body.msg).not.toEqual('Success')
    expect(res.body).not.toHaveProperty('records')
  })
})


describe('Record query endpoint', () => {
  it('should post a query that returns at least on record', async () => {
    const res = await request(app)
      .post('/records/query')
      .send({
        'startDate': '2016-01-01',
        'endDate': '2019-12-31',
        minCount: 2500,
        maxCount: 3000
      })
    
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('code')
    expect(res.body.code).toEqual(0)
    expect(res.body).toHaveProperty('msg')
    expect(res.body.msg).toEqual('Success')
    expect(res.body).toHaveProperty('records')
  })
})
