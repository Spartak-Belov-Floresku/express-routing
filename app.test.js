const {app, server} = require("./app");
const supertest = require("supertest");


describe("running test for /mean?nums url", () => {

    test("GET /mean?nums=2,3,5  send correct data", async () => {

      await supertest(app)
              .get("/mean?nums=2,3,5")
              .expect(200)
              .then( response => {

                  expect(response.header["content-type"])
                    .toEqual('application/json; charset=utf-8');
                  expect(response.body)
                    .toEqual({"response":
                        {
                          "operation":"mean",
                          "value": 3
                        }
                      });
                    
                });
    });

    test("GET /mean?nums=2,3,foo  send incorrect data", async () => {

      await supertest(app)
              .get("/mean?nums=2,3,foo")
              .expect(200)
              .then( response => {

                  expect(response.header["content-type"])
                    .toEqual('application/json; charset=utf-8');
                  expect(response.body)
                    .toEqual({"response":
                        {
                          "message": "foo is not a number",
                          "status": "400 Bad Request"
                        }
                      });
                    
                });
    });

});

describe("running test for /median?nums url", () => {

    test("GET /median?nums=2,3,5  send correct data", async () => {

      await supertest(app)
              .get("/median?nums=2,3,5")
              .expect(200)
              .then( response => {

                  expect(response.header["content-type"])
                    .toEqual('application/json; charset=utf-8');
                  expect(response.body)
                    .toEqual({"response":
                        {
                          "operation":"median",
                          "value": 3
                        }
                      });
                    
                });
    });

    test("GET /median?nums=  send incorrect data", async () => {

      await supertest(app)
              .get("/median?nums=")
              .expect(200)
              .then( response => {

                  expect(response.header["content-type"])
                    .toEqual('application/json; charset=utf-8');
                  expect(response.body)
                    .toEqual({"response":
                        {
                          "message": "nums are required",
                          "status": "400 Bad Request"
                        }
                      });
                    
                });
    });

});


describe("running test for /median?nums url", () => {

  test("GET /mode?nums=2,3,5,2,9,9  send correct data", async () => {

    await supertest(app)
            .get("/mode?nums=2,3,5,2,9,9")
            .expect(200)
            .then( response => {

                expect(response.header["content-type"])
                  .toEqual('application/json; charset=utf-8');
                expect(response.body)
                  .toEqual({"response":
                      {
                        "operation":"mode",
                        "value": ["2","9"]
                      }
                    });
                  
              });
  });

  test("GET /mode?nums=2,3,5,2,nine  send incorrect data", async () => {

    await supertest(app)
            .get("/mode?nums=2,3,5,2,nine")
            .expect(200)
            .then( response => {

                expect(response.header["content-type"])
                  .toEqual('application/json; charset=utf-8');
                expect(response.body)
                  .toEqual({"response":
                      {
                        "message": "nine is not a number",
                        "status": "400 Bad Request"
                      }
                    });
                  
              });
  });

});

describe("running test for /all?nums url", () => {

  test("GET /all?nums=2,3,5,2,9,9  send correct data", async () => {

    await supertest(app)
            .get("/all?nums=2,3,5,2,9,9")
            .expect(200)
            .then( response => {

                expect(response.header["content-type"])
                  .toEqual('application/json; charset=utf-8');
                expect(response.body)
                  .toEqual({"response":
                      {
                        "operation":"all",
                        "mean":5,
                        "median":4,
                        "mode":["2","9"]
                      }
                    });
                  
              });
  });

  test("GET /all?nums=2,3,foo  send incorrect data", async () => {

    await supertest(app)
            .get("/all?nums=2,3,foo")
            .expect(200)
            .then( response => {

                expect(response.header["content-type"])
                  .toEqual('application/json; charset=utf-8');
                expect(response.body)
                  .toEqual({"response":
                      {
                        "message": "foo is not a number",
                        "status": "400 Bad Request"
                      }
                    });
                  
              });
  });

});


server.close();