const mongoose = require("mongoose");
const User = require("../src/user");
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')

const assert = require("assert");

describe('Associations', () => {
    let tim, blogPost, comment;
    beforeEach((done) => {
        tim = new User ({name: 'Tim'});
        blogPost = new BlogPost({ title: 'JS is great', content: 'Yep, it really is' });
        comment = new Comment({ content: 'Pizza'})
    
        tim.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = tim;

        Promise.all([tim.save(), blogPost.save(), comment.save()])
        .then(() => done());
    });    

    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Tim'})
            .populate('blogPosts')
            .then((user) => {
                // console.log(user.blogPosts[0]);
                assert(user.blogPosts[0].title === "JS is great");
                done();
            });
    });
});
