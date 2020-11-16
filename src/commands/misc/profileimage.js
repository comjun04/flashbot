const Command = require('../../structures/Command')

class ProfileImageCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'profileimage',
      aliases: ['프사', '프로필사진', 'proimg', 'ㅔ개랴ㅣ댜ㅡㅁㅎㄷ', 'vmtk', 'vmfhvmftkwls', 'ㅔ개ㅑㅡㅎ'],
      description: 'commands.profileimage.DESC:Shows a profile image',
      group: 'misc',
      args: [
        {
          name: 'commands.profileimage.args.member.NAME:member',
          description: 'commands.profileimage.args.member.DESC:The member to see the profile image. Currently, only mentions are accepted.',
          type: 'common.mention:mention'
        }
      ]
    })
  }

  async run (client, msg, query, { t }) {
    if (msg.mentions.users.size > 0) return await msg.channel.send(msg.mentions.users.first().displayAvatarURL({ dynamic: true, size: 1024 }))

    if (query.args.length < 1) return await msg.reply(Command.makeUsage(this, query.cmd, t))
  }
}

module.exports = ProfileImageCommand