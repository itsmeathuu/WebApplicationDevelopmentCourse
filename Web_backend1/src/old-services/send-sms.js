import { Infobip, AuthType } from "@infobip-api/sdk";
import 'dotenv/config'

const infobip = new Infobip({
    baseUrl: process.env.INFOBIP_BASE_URL,
    apiKey: process.env.INFOBIP_API,
    authType: AuthType.ApiKey
});

/**
 * Gửi tin nhắn SMS
 * @param {String} from số điện thoại gửi đi (gồm mã quốc gia)
 * @param {String} to số điện thoại đến (gồm mã quốc gia)
 * @param {String} text nội dung tin nhắn
 * @param {function(Object?, Error?)?} callback (response, error)
 */
const sendSms = async (from, to, text, callback) => {
    const response = await infobip.channels.whatsapp.send({
        type: 'text',
        from: from,
        to: to,
        subject: 'test',
        content: { text: text }
    }).catch(err => { callback(err, null); return; });

    callback(response, null);
}

export default sendSms;