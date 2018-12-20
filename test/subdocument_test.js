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

    it('Can add subdocuments to an existing record', (done) => {
        const tim = new User({
            name: 'Tim',
            posts: []
        });

        tim.save()
            .then(() => User.findOne({ name: 'Tim' }))
            .then((user) => {
                user.posts.push({ title: 'New Post' })
                return user.save();
            })
            .then(() => User.findOne({ name: 'Tim'}))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done(); 
            })
    })

    it('can remove existing subdocument', (done) => {
         const tim = new User ({ 
             name: 'Tim', 
             posts: [{ title: 'New Title' }]
        });

        tim.save()
            .then(() => User.findOne({ name: 'Tim' }))
            .then((user) => {
                user.posts[0].remove();
            return user.save();
            })
            .then(() => User.findOne({ name: 'Tim' }))
            .then((user) => {
                assert(user.posts.length === 0)
                done()
            })
    });
});