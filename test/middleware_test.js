const mongoose = require("mongoose");
const User = require("../src/user");
const BlogPost = require('../src/blogPost')

const assert = require("assert");

describe('Middleware', () => {
    let tim, blogPost;

    beforeEach((done) => {
        tim = new User({ name: 'Tim' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep, it really is' });

        tim.blogPosts.push(blogPost);

        Promise.all([tim.save(), blogPost.save()])
            .then(() => done());
    });    

    it('users clean up dangling blogposts on remove', (done) => {
        tim.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            });
    })
})
