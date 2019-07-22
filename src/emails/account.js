const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '';

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
    to: 'vasserman2000@gmail.com',
    from: 'vasserman2000@gmail.com',
    subject: 'This is my first creation!',
    text: 'I hope this one actually gets to you.'
});