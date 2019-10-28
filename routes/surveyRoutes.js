const mongoose = require('mongoose')
// Middleware
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')

const Mailer = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thank for voting!')
    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        })

        // Great place to send an email! 
        const mailer = new Mailer(survey, surveyTemplate(survey))

        try {
            await mailer.send()
            // Saving the survey into the database
            await survey.save()
            // Updating the number of credits for the user
            req.user.credits -= 1
            const user = await req.user.save()

            // Send the updated user model so the header get updated
            res.send(user)
        } catch (err) {
            res.status(422).send(err)
        }
    })
}