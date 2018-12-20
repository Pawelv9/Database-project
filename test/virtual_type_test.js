const assert = require("assert");
const User = require("../src/user");

describe('Virtual Types', () => {
    it('postCount returns number of posts', (done) => {
        const tim = new User({ 
            name: 'Tim',
            posts: [{ title: 'Post' }]    
        });
        
        tim.save()
            .then((user) => {
                assert(tim.postCount === 1);
                done();
            })
    });
});