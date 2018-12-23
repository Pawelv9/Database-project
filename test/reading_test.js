const assert = require('assert')
const User = require('../src/user')

describe('Reading users out of the database', () => {
    let tim, santa, jane, john;

    beforeEach((done) => {
        elon = new User({ name: 'Elon' });
        jane = new User({ name: 'Jane' });
        santa = new User({ name: 'Santa' }); 
        tim = new User({ name: 'Tim' });
        
        Promise.all([elon.save(), jane.save(), santa.save(), tim.save()])
           .then(() => done());
        
    });

    it('finds all users with the name of Tim', (done) => {
        User.find({ name: 'Tim' })
            .then((users) => {
                assert(users[0]._id.toString() === tim._id.toString());
                done();
            });
    });

    it('find a user with a particular id', (done) => {
        User.findOne({ _id: tim._id })
            .then((user) => {
                assert(user.name === 'Tim');
                done()
            })
    });

    it('can skip and limit the result set', (done) => {
        User.find({})
            .sort({ name: 1 })
            .skip(1).limit(2)
            .then((users) => {
                assert(users.length === 2)
                assert(users[0].name === 'Jane');
                assert(users[1].name === 'Santa');
                done();
            })
    });
});