const assert = require("assert");
const User = require("../src/user");

describe('Subdocuments', () => {
    it('can create a subdocument', (done) => {
        const tim = new User({ 
            name: 'Tim', 
            posts: [{ title: 'PostTitle' }] 
    });

    tim
      .save()
      .then(() => User.findOne({ name: "Tim" }))
      .then(user => {
        //   console.log(user.posts[0]);
        assert(user.posts[0].title === 'PostTitle');
        done();
      })
    });
});