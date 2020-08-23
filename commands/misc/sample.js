const Command = require('../../classes/Command')

class SampleCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'sample',
      aliases: ['ㄴ므ㅔㅣㄷ'],
      description: 'commands.sample.DESC',
      group: 'misc'
    })
  }

  async run (_client, msg, _query, _locale) {
    return msg.channel.send('This is a sample command. Copy and paste to create a new command.')
  }
}

module.exports = SampleCommand
