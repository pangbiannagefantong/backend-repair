const SMSClient = require('@alicloud/sms-sdk');

const accessKeyId = 'LTAIjMAmj2YoC5zd';
const secretAccessKey = 'Z8YLAeZOgqk4n58HU5551TLKJCVs1S';

let smsClient = new SMSClient({accessKeyId, secretAccessKey});

module.exports = function (phone, code) {
    return new Promise((resolve, reject) => {
        smsClient.sendSMS({
            PhoneNumbers: phone,
            SignName: '滴滴工程',
            TemplateCode: 'SMS_128645465',
            TemplateParam: `{"code": "${code}"}`
            // TemplateParam: '{"code": 123456}'
        }).then(function (res) {
            let {Code} = res;
            resolve(res);
            if (Code === 'OK') {
                console.log(res);
            }
        }, function (err) {
            reject(err);
            console.log(err, 'err');
        })
    })
};
