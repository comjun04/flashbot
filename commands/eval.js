const util = require('util');
const discord = require('discord.js');
const client = new discord.Client(); // for developing
const perm = require('../permission');
const config = require('../config.json');

/**
 * @name eval.js
 * @description 자바스크립트 명령어를 실행합니다.
 */

exports.name = 'eval';
exports.desc = '자바스크립트 실행. 관리자 권한 가지고 있어야 사용 가능';
exports.dev = true;
exports.callSign = ['eval'];

exports.args = [
    {
        name: "JavaScript 코드",
        desc: "실행할 JavaScript 코드",
        must: true
    }
];

exports.execute = (msg, input) => {
    if (perm.isAdmin(msg.member)) {
        try {
            var result = eval(input);
            msg.reply('입력:\n```' + input + '```\n그리고 출력:\n```' + util.inspect(result, false, null, false) + '```');
            console.log(result);
        } catch (error) {
            msg.reply(error.stack);
            console.log(error);
        }
    } else {
        msg.reply('당신은 관리자 권한을 가지고 있지 않습니다!');
    }
};