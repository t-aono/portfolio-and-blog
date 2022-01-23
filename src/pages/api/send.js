export default function handler(req, res) {
  let response = null;

  if (req.method === 'POST') {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_APIKEY);
    const msg = {
      to: req.body.email,
      cc: 'info@t-aono.net',
      from: 'noreply@t-aono.net',
      subject: '【t-aono.net】お問合せ受付け完了',
      text: `${req.body.name} 様

お問い合わせありがとうございました。
内容を確認してご連絡致します。

もし連絡が届かない場合はお手数ですがメールを頂けると幸いです。
info@t-aono.net

- - - - - - - 
【件名】${req.body.subject}\n${req.body.message}`
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
          res.send(response);
        }
      }
    })();
  }
}
