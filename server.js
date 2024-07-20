import express from 'express';
import axios from 'axios';
import cors from 'cors';
// import nodemailer from 'nodemailer';

// const PORT = process.env.PORT || 5000;

const app = express();

// // ZeptoMail configuration
// const transporter = nodemailer.createTransport({
//     service: 'Zoho', // or another service
//     auth: {
//         user: 'your-zeptomail-email@example.com',
//         pass: 'your-zeptomail-password'
//     }
// });

// Middleware to handle JSON bodies
app.use(express.json());
app.use(cors());

// Route to get all categories
app.get('/categories', async (req, res) => {
    try {
        const response = await axios.get('https://json-server.bytexl.app/categories');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all products
app.get('/products', async (req, res) => {
    try {
        const response = await axios.get('https://json-server.bytexl.app/products');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to get all companies
app.get('/companies', async (req, res) => {
    try {
        const response = await axios.get('https://json-server.bytexl.app/companies');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Proxy route to handle all json-server requests
app.get('/companies/:company/categories/:category/products', async (req, res) => {
    const { company, category } = req.params;
    const queryParams = req.query;

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `https://json-server.bytexl.app/companies/${company}/categories/${category}/products?${queryString}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);

        // // Send transactional email notification
        // const mailOptions = {
        //     from: 'your-zeptomail-email@example.com',
        //     to: 'your-email@example.com',
        //     subject: 'Product Filter Request',
        //     text: `A user sent a filter request to your API: ${req.originalUrl}`
        // };

        // transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) {
        //         console.log('Error sending email:', error);
        //     } else {
        //         console.log('Email sent:', info.response);
        //     }
        // });
        
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });