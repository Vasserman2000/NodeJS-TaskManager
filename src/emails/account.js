const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
    to: 'vasserman2000@gmail.com',
    from: 'vasserman2000@gmail.com',
    subject: 'This is my first creation!',
    text: 'I hope this one actually gets to you.'
});