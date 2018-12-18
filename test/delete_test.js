const assert = require("assert");
const User = require("../src/user");

describe('Deleting a user', () => {
    let tim;

    beforeEach((done) => {
        tim = new User({ name: 'Tim'})
        tim.save()
            .then(() => done());
    });

    it('model instance remove', (done) => {
        tim.remove()
            .then(() => User.findOne({ name: 'Tim' }))
            .then((user) => {
                assert(user === null);
                done();
            })
    });

    it('class method remove', (done) => {
        User.deleteOne({ name: 'Tim' })
            .then(() => User.findOne({ name: 'Tim' }))
            .then((user) => {
                assert(user === null);
                done();
            })
    });

    it('class method findAndRemove', (done) => {
        User.findOneAndDelete({ name: 'Tim' })
            .then(() => User.findOne({ name: 'Tim' }))
            .then((user) => {
                assert(user === null);
                done();
            })
    });

    it('class method findByIdAndRemove', (done) => {
        User.findOneAndDelete(tim._id)
          .then(() => User.findOne({ name: "Tim" }))
          .then(user => {
            assert(user === null);
            done();
          });
    })
});