var config = require('./config.js');
var r = require('../lib');
var util = require('./util.js');
var Promise = require('bluebird');
var assert = require('assert');

var uuid = util.uuid;
var connection; // global connection
var dbName;

function It(testName, generatorFn) {
    it(testName, function(done) {
        Promise.coroutine(generatorFn)(done);
    })
}

It("Init for `document-manipulation.js`", function* (done) {
    try {
        connection = yield r.connect();
        assert(connection);
        done();
    }
    catch(e) {
        done(e);
    }
})

It("`add` should work", function* (done) {
    try {
        var result = yield r.expr(1).add(1).run(connection);
        assert.equal(result, 2);

        result = yield r.expr(1).add(1).add(1).run(connection);
        assert.equal(result, 3);

        result = yield r.expr(1).add(1, 1).run(connection);
        assert.equal(result, 3);

        result = yield r.add(1, 1, 1).run(connection);
        assert.equal(result, 3);

        done();
    }
    catch(e) {
        done(e);
    }
})
It("`add` should throw if no argument has been passed", function* (done) {
    try {
        result = yield r.expr(1).add().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `add` cannot be undefined after:\nr.expr(1)") {
            done();
        }
        else {
            done(e);
        }
    }
})

It("`add` should throw if no argument has been passed -- r.add", function* (done) {
    try {
        result = yield r.add().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `r.add` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`add` should throw if just one argument has been passed -- r.add", function* (done) {
    try {
        result = yield r.add(1).run(connection);
    }
    catch(e) {
        if (e.message === "Second argument of `r.add` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})

It("`sub` should work", function* (done) {
    try {
        result = yield r.expr(1).sub(1).run(connection);
        assert.equal(result, 0);

        result = yield r.sub(5, 3, 1).run(connection);
        assert.equal(result, 1);

        done();
    }
    catch(e) {
        done(e);
    }
})
It("`sub` should throw if no argument has been passed", function* (done) {
    try {
        result = yield r.expr(1).sub().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `sub` cannot be undefined after:\nr.expr(1)") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`sub` should throw if no argument has been passed -- r.sub", function* (done) {
    try {
        result = yield r.sub().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `r.sub` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`sub` should throw if just one argument has been passed -- r.sub", function* (done) {
    try {
        result = yield r.sub(1).run(connection);
    }
    catch(e) {
        if (e.message === "Second argument of `r.sub` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`mul` should work", function* (done) {
    try {
        result = yield r.expr(2).mul(3).run(connection);
        assert.equal(result, 6);

        result = yield r.mul(2, 3, 4).run(connection);
        assert.equal(result, 24);

        done();
    }
    catch(e) {
        done(e);
    }
})
It("`mul` should throw if no argument has been passed", function* (done) {
    try {
        result = yield r.expr(1).mul().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `mul` cannot be undefined after:\nr.expr(1)") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`mul` should throw if no argument has been passed -- r.mul", function* (done) {
    try {
        result = yield r.mul().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `r.mul` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`mul` should throw if just one argument has been passed -- r.mul", function* (done) {
    try {
        result = yield r.mul(1).run(connection);
    }
    catch(e) {
        if (e.message === "Second argument of `r.mul` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`div` should work", function* (done) {
    try {
        result = yield r.expr(24).div(2).run(connection);
        assert.equal(result, 12);

        result = yield r.div(20, 2, 5, 1).run(connection);
        assert.equal(result, 2);

        done();
    }
    catch(e) {
        done(e);
    }
})
It("`div` should throw if no argument has been passed", function* (done) {
    try {
        result = yield r.expr(1).div().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `div` cannot be undefined after:\nr.expr(1)") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`div` should throw if no argument has been passed -- r.div", function* (done) {
    try {
        result = yield r.div().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `r.div` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`div` should throw if just one argument has been passed -- r.div", function* (done) {
    try {
        result = yield r.div(1).run(connection);
    }
    catch(e) {
        if (e.message === "Second argument of `r.div` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`mod` should work", function* (done) {
    try {
        result = yield r.expr(24).mod(7).run(connection);
        assert.equal(result, 3);

        result = yield r.mod(24, 7).run(connection);
        assert.equal(result, 3);

        done();
    }
    catch(e) {
        done(e);
    }
})
It("`mod` should throw if no argument has been passed", function* (done) {
    try {
        result = yield r.expr(1).mod().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `mod` cannot be undefined after:\nr.expr(1)") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`mod` should throw if more than two arguments -- r.mod", function* (done) {
    try {
        result = yield r.mod(24, 7, 2).run(connection);
    }
    catch(e) {
        if (e.message === "Too many arguments for `r.mod`.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`and` should work", function* (done) {
    try {
        result = yield r.expr(true).and(false).run(connection);
        assert.equal(result, false);

        result = yield r.expr(true).and(true).run(connection);
        assert.equal(result, true);

        result = yield r.and(true, true, true).run(connection);
        assert.equal(result, true);

        result = yield r.and(true, true, true, false).run(connection);
        assert.equal(result, false);

        done();
    }
    catch(e) {
        done(e);
    }
})
It("`and` should throw if no argument has been passed", function* (done) {
    try {
        result = yield r.expr(1).and().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `and` cannot be undefined after:\nr.expr(1)") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`and` should throw if no argument has been passed -- r.and", function* (done) {
    try {
        result = yield r.and().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `r.and` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`and` should throw if just one argument has been passed -- r.and", function* (done) {
    try {
        result = yield r.and(1).run(connection);
    }
    catch(e) {
        if (e.message === "Second argument of `r.and` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`or` should work", function* (done) {
    try {
        result = yield r.expr(true).or(false).run(connection);
        assert.equal(result, true);

        result = yield r.expr(false).or(false).run(connection);
        assert.equal(result, false);

        result = yield r.or(true, true, true).run(connection);
        assert.equal(result, true);

        result = yield r.or(false, false, false, false).run(connection);
        assert.equal(result, false);
        done();
    }
    catch(e) {
        done(e);
    }
})
It("`or` should throw if no argument has been passed", function* (done) {
    try {
        result = yield r.expr(1).or().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `or` cannot be undefined after:\nr.expr(1)") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`or` should throw if no argument has been passed -- r.or", function* (done) {
    try {
        result = yield r.or().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `r.or` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`or` should throw if just one argument has been passed -- r.or", function* (done) {
    try {
        result = yield r.or(1).run(connection);
    }
    catch(e) {
        if (e.message === "Second argument of `r.or` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`eq` should work", function* (done) {
    try {
        result = yield r.expr(1).eq(1).run(connection);
        assert.equal(result, true);

        result = yield r.expr(1).eq(2).run(connection);
        assert.equal(result, false);

        result = yield r.eq(1, 1, 1, 1).run(connection);
        assert.equal(result, true);

        result = yield r.eq(1, 1, 2, 1).run(connection);
        assert.equal(result, false);

        done();
    }
    catch(e) {
        done(e);
    }
})
It("`eq` should throw if no argument has been passed", function* (done) {
    try {
        result = yield r.expr(1).eq().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `eq` cannot be undefined after:\nr.expr(1)") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`eq` should throw if no argument has been passed -- r.eq", function* (done) {
    try {
        result = yield r.eq().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `r.eq` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`eq` should throw if just one argument has been passed -- r.eq", function* (done) {
    try {
        result = yield r.eq(1).run(connection);
    }
    catch(e) {
        if (e.message === "Second argument of `r.eq` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`ne` should work", function* (done) {
    try {
        result = yield r.expr(1).ne(1).run(connection);
        assert.equal(result, false);

        result = yield r.expr(1).ne(2).run(connection);
        assert.equal(result, true);

        result = yield r.ne(1, 1, 1, 1).run(connection);
        assert.equal(result, false);

        result = yield r.ne(1, 1, 2, 1).run(connection);
        assert.equal(result, true);


        done();
    }
    catch(e) {
        done(e);
    }
})
It("`ne` should throw if no argument has been passed", function* (done) {
    try {
        result = yield r.expr(1).ne().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `ne` cannot be undefined after:\nr.expr(1)") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`ne` should throw if no argument has been passed -- r.ne", function* (done) {
    try {
        result = yield r.ne().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `r.ne` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`ne` should throw if just one argument has been passed -- r.ne", function* (done) {
    try {
        result = yield r.ne(1).run(connection);
    }
    catch(e) {
        if (e.message === "Second argument of `r.ne` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`gt` should work", function* (done) {
    try {
        result = yield r.expr(1).gt(2).run(connection);
        assert.equal(result, false);
        result = yield r.expr(2).gt(2).run(connection);
        assert.equal(result, false);
        result = yield r.expr(3).gt(2).run(connection);
        assert.equal(result, true);

        result = yield r.gt(10, 9, 7, 2).run(connection);
        assert.equal(result, true);

        result = yield r.gt(10, 9, 9, 1).run(connection);
        assert.equal(result, false);

        done();
    }
    catch(e) {
        done(e);
    }
})
It("`gt` should throw if no argument has been passed", function* (done) {
    try {
        result = yield r.expr(1).gt().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `gt` cannot be undefined after:\nr.expr(1)") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`gt` should throw if no argument has been passed -- r.gt", function* (done) {
    try {
        result = yield r.gt().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `r.gt` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`gt` should throw if just one argument has been passed -- r.gt", function* (done) {
    try {
        result = yield r.gt(1).run(connection);
    }
    catch(e) {
        if (e.message === "Second argument of `r.gt` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`ge` should work", function* (done) {
    try {
        result = yield r.expr(1).ge(2).run(connection);
        assert.equal(result, false);
        result = yield r.expr(2).ge(2).run(connection);
        assert.equal(result, true);
        result = yield r.expr(3).ge(2).run(connection);
        assert.equal(result, true);

        result = yield r.ge(10, 9, 7, 2).run(connection);
        assert.equal(result, true);

        result = yield r.ge(10, 9, 9, 1).run(connection);
        assert.equal(result, true);

        result = yield r.ge(10, 9, 10, 1).run(connection);
        assert.equal(result, false);

        done();
    }
    catch(e) {
        done(e);
    }
})
It("`ge` should throw if no argument has been passed", function* (done) {
    try {
        result = yield r.expr(1).ge().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `ge` cannot be undefined after:\nr.expr(1)") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`ge` should throw if no argument has been passed -- r.ge", function* (done) {
    try {
        result = yield r.ge().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `r.ge` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`ge` should throw if just one argument has been passed -- r.ge", function* (done) {
    try {
        result = yield r.ge(1).run(connection);
    }
    catch(e) {
        if (e.message === "Second argument of `r.ge` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`lt` should work", function* (done) {
    try {
        result = yield r.expr(1).lt(2).run(connection);
        assert.equal(result, true);
        result = yield r.expr(2).lt(2).run(connection);
        assert.equal(result, false);
        result = yield r.expr(3).lt(2).run(connection);
        assert.equal(result, false);

        result = yield r.lt(0, 2, 4, 20).run(connection);
        assert.equal(result, true);

        result = yield r.lt(0, 2, 2, 4).run(connection);
        assert.equal(result, false);

        result = yield r.lt(0, 2, 1, 20).run(connection);
        assert.equal(result, false);

        done();
    }
    catch(e) {
        done(e);
    }
})
It("`lt` should throw if no argument has been passed", function* (done) {
    try {
        result = yield r.expr(1).lt().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `lt` cannot be undefined after:\nr.expr(1)") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`lt` should throw if no argument has been passed -- r.lt", function* (done) {
    try {
        result = yield r.lt().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `r.lt` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`lt` should throw if just one argument has been passed -- r.lt", function* (done) {
    try {
        result = yield r.lt(1).run(connection);
    }
    catch(e) {
        if (e.message === "Second argument of `r.lt` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`le` should work", function* (done) {
    try {
        result = yield r.expr(1).le(2).run(connection);
        assert.equal(result, true);
        result = yield r.expr(2).le(2).run(connection);
        assert.equal(result, true);
        result = yield r.expr(3).le(2).run(connection);
        assert.equal(result, false);

        result = yield r.le(0, 2, 4, 20).run(connection);
        assert.equal(result, true);

        result = yield r.le(0, 2, 2, 4).run(connection);
        assert.equal(result, true);

        result = yield r.le(0, 2, 1, 20).run(connection);
        assert.equal(result, false);

        done();
    }
    catch(e) {
        done(e);
    }
})
It("`le` should throw if no argument has been passed", function* (done) {
    try {
        result = yield r.expr(1).le().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `le` cannot be undefined after:\nr.expr(1)") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`le` should throw if no argument has been passed -- r.le", function* (done) {
    try {
        result = yield r.le().run(connection);
    }
    catch(e) {
        if (e.message === "First argument of `r.le` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`le` should throw if just one argument has been passed -- r.le", function* (done) {
    try {
        result = yield r.le(1).run(connection);
    }
    catch(e) {
        if (e.message === "Second argument of `r.le` cannot be undefined.") {
            done();
        }
        else {
            done(e);
        }
    }
})
It("`not` should work", function* (done) {
    try {
        result = yield r.expr(true).not().run(connection);
        assert.equal(result, false);
        result = yield r.expr(false).not().run(connection);
        assert.equal(result, true);

        done();
    }
    catch(e) {
        done(e);
    }
})


It("End for `document-manipulation.js`", function* (done) {
    try {
        connection.close();
        done();
    }
    catch(e) {
        done(e);
    }
})


