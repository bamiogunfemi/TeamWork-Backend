import { expect, should } from 'chai';
import request from 'supertest';
import app from '../../src';

import { newArticle, updatedArticle } from '../mocks/articles.mock';
import { staff } from '../mocks/users.mock';

should();
const artId = '94189e3d-0379-4dd2-b03d-73fa8c14b3ab';

describe('routes: /articles', () => {
  let articleId;
  let staffId;
  let staffToken;
  before((done) => {
    request(app)
      .post('/auth/signin')
      .send({ email: staff.email, password: staff.password })
      .end((err, res) => {
        staffId = res.body.data.user.id;
        staffToken = res.body.data.token;
        done(err);
      });
  });

  context('POST /articles', () => {
    it('should create a new article', (done) => {
      request(app)
        .post('/articles')
        .send(newArticle)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `${staffToken}`)
        .end((err, res) => {
          const {
            status,
            body: { data },
          } = res;
          expect(status).to.equal(201);
          expect(data).to.be.an('object');
          expect(data).to.have.property('id');
          expect(data).to.have.property('title');
          expect(data).to.have.property('article');
          expect(data).to.have.property('authorId');
          expect(data.title).to.eql(newArticle.title);
          expect(data.article).to.eql(newArticle.article);
          expect(data.authorId).to.eql(staffId);
          done(err);
        });
    });

    specify('error if token is not provided', (done) => {
      request(app)
        .post('/articles')
        .send(newArticle)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(412);
          expect(res.body.status).to.eql('error');
          expect(res.body.error.message).to.eql('authorization header not set');
          done(err);
        });
    });

    specify('validation error: title or body is not provided', (done) => {
      request(app)
        .post('/articles')
        .send({})
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `${staffToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.status).to.eql('error');
          expect(res.body.error.message).to.eql('validation error');
          expect(res.body.error.errors).to.have.property('title');
          expect(res.body.error.errors).to.have.property('article');
          done(err);
        });
    });
  });

  context.skip('GET /articles /articles/:articleId', () => {
    before(async () => {
      const res = await request(app)
        .post('/articles/')
        .send(newArticle)
        .set('Authorization', `${staffToken}`);

      articleId = res.body.data.id;
    });

    it('should fetch a specific article record', async () => {
      const res = await request(app)
        .get(`articles/${articleId}`)
        .set('Authorization', `${staffToken}`);

      res.status.should.equal(200);
    });
  });

  context('UPDATE /articles/:articleId', () => {
    before(async () => {
      const res = await request(app)
        .post('/articles/')
        .send(newArticle)
        .set('Authorization', `${staffToken}`);

      articleId = res.body.data.id;
    });

    it('should update an article', (done) => {
      request(app)
        .patch(`/articles/${articleId}`)
        .send(updatedArticle)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `${staffToken}`)
        .end((err, res) => {
          console.log('failing travis test ==>', res.body);
          const { status, body: { data } } = res;
          expect(status).to.equal(200);
          expect(data).to.be.an('object');
          expect(data).to.have.property('id');
          expect(data).to.have.property('title');
          expect(data).to.have.property('article');
          expect(data.title).to.eql(updatedArticle.title);
          expect(data.article).to.eql(updatedArticle.article);
          done(err);
        });
    });

    specify("error if article doesn't exist", (done) => {
      request(app)
        .patch(`/articles/${artId}`)
        .send(updatedArticle)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `${staffToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done(err);
        });
    });

    specify('error if article ID is invalid', (done) => {
      request(app)
        .patch(`/articles/${artId}e4a`)
        .send(updatedArticle)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `${staffToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(err);
        });
    });
  });

  context('DELETE /articles/:articleId', () => {
    it('should delete an article', (done) => {
      request(app)
        .delete(`/articles/${articleId}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `${staffToken}`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          done(err);
        });
    });

    specify("error if article doesn't exist", (done) => {
      request(app)
        .delete(`/articles/${artId}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `${staffToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done(err);
        });
    });

    specify('error if article ID is invalid', (done) => {
      request(app)
        .delete(`/articles/${artId}e4a`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `${staffToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done(err);
        });
    });
  });
});
