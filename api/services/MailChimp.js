import MailChimp3 from 'mailchimp-api-v3'
const client = require('@mailchimp/mailchimp_marketing')
import request from 'request'
require('dotenv').config()

let mailchimp
class Mailchimp {
  constructor() {
    client.setConfig({
      apiKey: process.env.MAILCHIMP_KEY,
      server: process.env.MAILCHIMP_SERVER || 'us17',
    })
    mailchimp = new MailChimp3(process.env.MAILCHIMP_KEY)
  }

  // _init() {
  //   mailchimp.setConfig({
  //     apiKey: process.env.MAILCHIMP_KEY,
  //     server: process.env.MAILCHIMP_SERVER,
  //   })
  // MAILCHIMP_LIST_ID
  // }

  async getLists() {
    // console.log(process.env.MAILCHIMP_KEY, process.env.MAILCHIMP_SERVER)
    // client.setConfig({
    //   apiKey: process.env.MAILCHIMP_KEY,
    //   server: process.env.MAILCHIMP_SERVER, //|| 'us17',
    // })
    const response = await client.lists.getListMergeFields(
      process.env.MAILCHIMP_LIST_ID
    )
    console.log(response)
    return response
  }

  async subscribe(data) {
    return await client.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: data.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: data.firstname ? data.firstname : '',
        LNAME: data.lastname ? data.lastname : '',
      },
      tags: data.tags ? data.tags : [],
    })
  }

  static sub({ firstname, lastname, email }) {
    const url = `https://masteringbackend.us17.list-manage.com/subscribe/post-json?u=39ffc375608455a6fe549290a&amp;id=e42cd7d4b3&c=?`

    const data = []
    data.LNAME = lastname || ''
    data.FNAME = firstname || ''
    data.EMAIL = email
    return new Promise(function (resolve, reject) {
      request.post(
        {
          url: url,
          form: {
            EMAIL: email,
            LNAME: lastname || '',
            FNAME: firstname || '',
          },
          json: true,
          dataType: 'jsonp',
        },
        function (err, httpResponse, body) {
          console.log(err, httpResponse, body)
          if (err) {
            console.log(err)
            reject(err)
          }
          body = JSON.parse(body)
          if (body) {
            const message =
              'Success! Check &ldquo; ' +
              email +
              ' &rdquo; for an invite from Slack.'
            console.log(body)
            resolve(message)
          } else {
            // let { error } = body
            // if (
            //   error === 'already_invited' ||
            //   error === 'already_in_team' ||
            //   error === 'already_in_team_invited_user'
            // ) {
            //   const message =
            //     'Success! You were already invited. Visit <a href="https://backend-community.slack.com">Backend Community </a>'
            //   resolve(message)
            // } else if (error === 'invalid_email') {
            //   error = 'The email you entered is an invalid email.'
            // } else if (error === 'invalid_auth') {
            //   error =
            //     'Something has gone wrong. Please contact a system administrator.'
            // } else if (error === 'internal_error') {
            //   error = 'Please enter your name'
            // }
            // console.log(error)
            // resolve(error)
          }
        }
      )
    })
  }
}

export default Mailchimp