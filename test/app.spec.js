import { expect } from "chai";
import request from "supertest";
import app from "../src";

describe("server setup", () => {
  it("app should be a function", () => {
    expect(app).to.be.a("function");
  });

  it("should redirect to docs route", done => {
    request(app)
      .get("/")
      .end((err, res) => {
        expect(res.status).to.equal(302);
        done(err);
      });
  });

  it("should return error on an invalid route", done => {
    request(app)
      .get("/404")
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.eql("endpoint doesn't exist");
        done(err);
      });
  });
});
