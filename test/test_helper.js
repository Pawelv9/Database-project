const mongoose = require('mongoose');

// default Promise implementation
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', () => {
            console.warn('Warning', error);
        });
});

beforeEach(done => {
  const { users, comments, blogposts } = mongoose.connection.collections; 
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    })
  });
});