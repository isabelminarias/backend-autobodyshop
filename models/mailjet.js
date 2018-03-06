const mailjet = require('node-mailjet').connect('654fd21433a82f2f43fa9edb6793f117','1f5ae9f0e645da364e582e3a4909ec18')

var sendEmail = mailjet.post('send')

module.exports = sendEmail
