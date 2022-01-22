export default function handler(req, res) {
  let response = null;

  if (req.method === 'POST') {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_APIKEY);
    const msg = {
      to: req.body.email,
      cc: 'info@t-aono.net',
      from: 'noreply@t-aono.net',
      subject: 'お問合せありがとうございました。',
      text: `${req.body.name} 様\nお問合せを受け付けました。回答にしばらくお時間を頂けると幸いです。\n\n【件名】${req.body.subject}\n${req.body.message}`
    };

    (async () => {
      try {
        response = await sgMail.send(msg);
        res.status(200);
        res.send(response);
      } catch (error) {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
          res.status(error.code);
          res.json(error.response.body);
        }
      }
    })();
  }
}
