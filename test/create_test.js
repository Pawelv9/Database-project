const assert = require('assert');
const User = require('../src/user');

describe ('Creating records', () => {
    it('saves a user', (done) => {
        const tim = new User({ name: 'Tim' })
    
        tim.save()
        .then(() => {
            assert(!tim.isNew);
            done();
        });
    });
});

