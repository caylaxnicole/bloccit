const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;


describe("Topic", () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "Top ten vacation sites in the world",
        description: "A guide to planning you next dream vacation."
      })
      .then((topic) => {
        this.topic = topic;
        Post.create({
          title: "My first visit to the Grand Canyon",
          body: "I saw some rocks.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#create()", () => {
     it("should create a topic object with a title, and description", (done) => {
       Topic.create({
         title: "Pros of owning a cat",
         description: "1. They clean themselves.",
       })
       .then((topic) => {
         expect(topic.title).toBe("Pros of owning a cat");
         expect(topic.description).toBe("1. They clean themselves.");
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
   });

  describe("#getPosts()", () => {
    it("should return the associated posts for each topic", (done) => {
      this.topic.getPosts()
      .then((associatedPosts) => {
        associatedPosts.map(post => {
          expect(post.topicId).toBe(this.topic.id);
        })
        done();
      });
    });
  })
});
