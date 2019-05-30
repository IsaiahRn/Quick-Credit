import db from '../models/index';
import sGmail from '@sendgrid/mail';
import keys from '../config/keys';
class Email {

  async formatEmail(email, firstname, status, amount) {
    await sGmail.send({
      to: email,
      from: "loans-team@quickcredit.co.rw",
      subject: "Loan request status",
      html: `Hello, ${firstname},
              Thank you for choosing Quick-Credit services!
              Your loan request of ${amount} was ${status}.
              Once again, Thanks for choosing Quick-Credit!!
        `
    });
  }
  async sendTransactionEmail(status, email, amount) {
    const queryText = 'SELECT * FROM loans WHERE loans.email=$1;';
    const { rows } = await db.query(queryText, [email]);

    const { firstname } = rows[0];

    sGmail.setApiKey(keys.SENDGRID_EMAIL_KEY);

    if (status === "approved") {
      this.formatEmail(email, firstname, "APPROVED", amount)
        .then(() => console.log('email for loan approval sent!'))
        .catch((err) => console.log(err));
    } else {
      this.formatEmail(email, firstname, "REJECTED", amount)
        .then(() => console.log('email for loan rejection sent!'))
        .catch(() => console.log('error for rejecting'));;
    }
  }
}
export default new Email();