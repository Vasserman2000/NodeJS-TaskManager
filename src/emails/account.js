const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'elisha@mail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
        html: '<p style="color:blue">!</p>'
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