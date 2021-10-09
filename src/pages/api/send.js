export default function handler(req, res) {
  let response = null;

  if (req.method === 'POST') {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_APIKEY);
    const msg = {
      to: req.body.email,
      // bcc: 'aonoweb@aol.com',
      from: 'info@aonoweb.com',
      subject: 'お問合せありがとうございました。',
      text: `${req.body.name} 様\nお問合せを受け付けました。回答をお待ちください。\n\n【件名】${req.body.subject}\n${req.body.message}`,
      html: `${req.body.name} 様<br>お問合せを受け付けました。回答をお待ちください。<br><br>【件名】${req.body.subject}<br><br>${req.body.message}`
    };

    (async () => {
      try {
        response = await sgMail.send(msg);
      } catch (error) {
        console.error(error);
        if (error.response) {
          console.error(error.response.body)
        }
      }
    })();
  }

  res.status(200);
  res.send(response);
}