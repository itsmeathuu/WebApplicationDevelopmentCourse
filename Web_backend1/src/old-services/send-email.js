import 'dotenv/config';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API,
});

/**
 * Gửi email
 * @param {[{ email: String, name: String}]} recipients danh sách người nhận thư
 * @param {String} subject tiêu đề thư
 * @param {String} html nội dung html
 * @param {String} text nội dung text
 * @param {function(Error?)} callback (error)
 */
const sendEmail = async (recipients, subject, html, text, callback) => {
    // Tạo địa chỉ gửi
    const sentFrom = new Sender(process.env.MAILERSEND_SENDER, process.env.MAILERSEND_SENDER_NAME);
    // Tạo các địa chỉ nhận
    const addressesTo = recipients.map(recipient => new Recipient(recipient.email, recipient.name));
    // Đặt các thông tin người gửi, người nhận, nội dung thư,...
    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setReplyTo(sentFrom)
        .setTo(addressesTo)
        .setSubject(subject)
        .setHtml(html)
        .setText(text);

    try {
        // Gửi thư đi
        await mailerSend.email.send(emailParams);
        callback(null);
    }
    catch (e) {
        callback(e);
    }
}

export default sendEmail;