const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe("GET /apps", () => {
    it('Returns all json with no query strings', () => {
        return request(app)
                .get('/apps')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array');
                });
    });


    it('Returns 400 if genre doesn\'t exist', () => {
        return request(app)
                .get('/apps')
                .query({genre: "DDR"})
                .expect(400, 'genre must be one of the options')
    })

    it('Returns 400 if the data is not sorted upon request', () => {
        return request(app)
                .get('/apps')
                .query({sort: 'NONEXISTANT'})
                .expect(400, 'The sort method provided must be ranking or app')
    })

    it('Returns a sorted list', () => {
        it('should sort by title', () => {
            return request(app)
              .get('/apps')
              .query({sort: 'App'})
              .expect(200)
              .expect('Content-Type', /json/)
              .then(res => {
                expect(res.body).to.be.an('array');
                let i = 0;
                let sorted = true;
                while(sorted && i < res.body.length - 1) {
                  sorted = sorted && res.body[i].App < res.body[i + 1].App;
                  i++;
                }
                expect(sorted).to.be.true;
              });
          });
    });


    it('Each object should contain a rating and app key', () => {
        return request(app)
            .get('/apps')
            .query({appName: 'ROBLOX'})
            .expect(200)
            .then(res => {
                expect(res.body).to.have.any.keys('App');
                expect(res.body).to.have.any.keys('Rating');
                
            })
    })
});