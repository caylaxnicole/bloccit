const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

  beforeEach((done) => {
    this.topic;
    this.flair;
    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "Sports",
        description: "This is a forum for sports discussions."
      })
      .then((topic) => {
        this.topic = topic;
        Flair.create({
          name: "Lakers",
          color: "Purple",
          topicId: this.topic.id
        })
        .then((flair) => {
          this.flair = flair;
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
     it("should create a flair object with a name, color, and assigned topic", (done) => {
       Flair.create({
         name: "Dodgers",
         color: "Blue",
         topicId: this.topic.id
       })
       .then((flair) => {
         expect(flair.name).toBe("Dodgers");
         expect(flair.color).toBe("Blue");
         done();

       })
       .catch((err) => {
         console.log(err);
         done();
       });
     });
     it("should not create a flair with missing name, color, or assigned topic", (done) => {
      Flair.create({
       name: "Dodgers"
      })
      .then((flair) => {
       done();
      })
      .catch((err) => {
       expect(err.message).toContain("Flair.color cannot be null");
       expect(err.message).toContain("Flair.topicId cannot be null");
       done();

      })
    });
   });

   describe("#setTopic()", () => {
     it("should associate a topic and a flair together", (done) => {
       Topic.create({
         title: "Basketball",
         description: "All the things about basketball."
       })
       .then((newTopic) => {
         expect(this.flair.topicId).toBe(this.topic.id);
         this.flair.setTopic(newTopic)
         .then((flair) => {
           expect(flair.topicId).toBe(newTopic.id);
           done();
         });
       })
     });
   });

   describe("#getTopic()", () => {
     it("should return the associated topic", (done) => {
       this.flair.getTopic()
       .then((associatedTopic) => {
         expect(associatedTopic.title).toBe("Sports");
         done();
       });
     });
   });

   

});
