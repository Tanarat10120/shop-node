require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Connect MongoDB
mongoose.connect('mongodb+srv://minecrafthakza10120:1234@cluster0.mqltbzi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error(err));

// ตัวอย่าง Schema
const serviceSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String // base64 string
});
const Service = mongoose.model('Service', serviceSchema);

// Routes
app.get('/services', async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

app.post('/services', async (req, res) => {
  const { name, price, category, image } = req.body;
  const newService = new Service({ name, price, category, image });
  await newService.save();
  res.json({ message: 'เพิ่มบริการสำเร็จ' });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

app.delete('/services/:id', async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: 'ลบบริการแล้ว' });
});

app.put('/services/:id', async (req, res) => {
  const { name, price, category, image } = req.body;
  await Service.findByIdAndUpdate(req.params.id, { name, price, category, image });
  res.json({ message: 'อัปเดตบริการแล้ว' });
});

app.put('/services/:id', async (req, res) => {
  const { name, price, category, image } = req.body;
  await Service.findByIdAndUpdate(req.params.id, { name, price, category, image });
  res.json({ message: 'อัปเดตบริการแล้ว' });
});
