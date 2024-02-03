const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Используем cors
app.use(cors({
  origin: 'https://tangerine-rabanadas-ec6fdc.netlify.app', // Укажите домен вашего сайта
  methods: 'POST',
  credentials: true,
}));

// Парсинг данных из тела запроса
app.use(bodyParser.json());

// Обработка POST запроса
app.post('/send-email', (req, res) => {
  const { name, email, message, senderEmail } = req.body;

  // Создание объекта транспорта Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ytcenko1970@gmail.com',
      pass: 'z28031999Z'
    }
  });

  // Настройка письма
  const mailOptions = {
    from: senderEmail || 'ytcenko1970@gmail.com',
    to: 'ytcenko1970@gmail.com',
    subject: 'Новое сообщение с сайта',
    text: `Имя: ${name}\nEmail: ${email}\nСообщение: ${message}`
  };

  // Отправка письма
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Ошибка отправки письма');
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ success: true });
    }
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on https://creategift.website`);
});
