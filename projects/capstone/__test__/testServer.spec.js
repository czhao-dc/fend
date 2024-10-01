const app = require('../src/server/index');
const supertest = require('supertest');
const request = supertest(app);


describe('Testing express server', () => {

    

    it('Gets the test endpoint', async ()  => {

        const response = await request.get('/test')
        expect(response.status).toEqual(200)

    })
})