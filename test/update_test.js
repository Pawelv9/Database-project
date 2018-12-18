const assert = require('assert')
const User = require('../src/user')

describe('Updating records', () =>{
    let tim;

    beforeEach((done) => {
        tim = new User({ name: 'Tim' })
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
});