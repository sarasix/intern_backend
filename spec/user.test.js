const req = require("supertest");
const controller = require("./user");
const express = require("express");

const prepare = () => {

    return req(express().use(controller));
};

beforeAll(()=> {});

describe("/user",()=>{
    describe("GET/user",() => {
        it("basic case ",async() => {
            var res = await prepare().get("/");
            console.log(res.body);
        });
        it('400 "no user"',() => {});


    });


});
