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
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next tests
    done();
  });
});