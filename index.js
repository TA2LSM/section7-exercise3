const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: Date,
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => {
    console.log("Connected to MongoDB/mongo-exercises database...");
  })
  .catch((err) => {
    console.error("Couldn't connect to the database!", err);
  });

// (1) Tüm yayınlanmış 15$ ve üstü bedelli kurslarını listele
// async function getCourses() {
//   return await Course.find({ price: { $gte: 15 } }).sort("price");
// }

// (2) Birinci adımdakine alternatif olarak başlığında "by" geçen tüm kursları listele
async function getCourses() {
  return await Course.find({ name: /.*by.*/ }).sort("name");
}

async function start() {
  const courseList = await getCourses();
  console.log(courseList);
}

start();
