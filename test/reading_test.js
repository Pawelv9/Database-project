const assert = require('assert')
const User = require('../src/user')

describe('Reading users out of the database', () => {
    let tim;

    beforeEach((done) => {
        tim = new User({ name: 'Tim' });
        tim.save()
           .then(() => done());
    });

    it('finds all users with the name of Tim', (done) => {
        User.find({ name: 'Tim' })
            .then((users) => {
                assert(users[0]._id.toString() === tim._id.toString());
                done();
            });
    });
});