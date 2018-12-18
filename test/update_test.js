const assert = require('assert')
const User = require('../src/user')

describe('Updating records', () =>{
    let tim;

    beforeEach((done) => {
        tim = new User({ name: 'Tim', postCount: 0 })
        tim.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Arnold');
                done();
            });
    }

    it('instance using set n save', (done) => {
        tim.set('name', 'Arnold');
        assertName(tim.save(), done)
    });

    it('A model instance can update', (done) => {
        assertName(tim.update({ name: 'Arnold' }), done)
    });
    
    it('A model class can update', (done) => {
        assertName(
            User.update({ name: 'Tim' }, { name: 'Arnold' }),
            done    
        );
    });

    it('A model class can update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'Tim' }, { name: 'Arnold' }),
            done
        );
    })

    it('A model class can find a record with an ID and update', (done) => {
        assertName(
            User.findByIdAndUpdate(tim._id, { name: 'Arnold' }),
            done  
            );
    })

    it('A user can have their postcount incremented by 1', (done) => {
        User.update({name: 'Tim'}, { $inc:  { postCount: 1 } })
        .then(() => User.findOne({ name: 'Tim'}))
        .then((user) => {
            assert(user.postCount === 1);
            done()
        })
    });
});