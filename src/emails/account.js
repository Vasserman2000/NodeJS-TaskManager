const sgMail = require('@sendgrid/mail');

const sendgridAPIKey = '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';

sgMail.setApiKey(sendgridAPIKey);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'elisha@mail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });
    console.log('email sent')
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'elisha@mail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    });
    console.log('cancelation email sent')
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}