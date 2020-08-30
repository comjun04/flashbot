/**
 * @name serverinfo.js
 * @description 서버 정보 보여주는 명령어
 */

const { MessageEmbed } = require('discord.js')
const moment = require('moment-timezone')
const Command = require('../../classes/Command')

class ServerInfoCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'serverinfo',
      aliases: ['server-info', '서버정보', 'ㄴㄷㄱㅍㄷ갸ㅜ래', 'ㄴㄷㄱㅍㄷㄱ-ㅑㅜ래', 'tjqjwjdqh'],
      description: 'commands.serverinfo.DESC:Shows current server infomation.',
      group: 'info',
      guildOnly: true
    })
  }

  async run (client, msg, _query, locale) {
    const { t, tn } = client.locale

    let data
    const guild = msg.guild
    const useEmbed = msg.channel.permissionsFor(client.user).has('EMBED_LINKS')

    const members = await guild.members.fetch()
    const [bots, users] = members.partition((member) => member.user.bot)
    const userCount = users.size
    const botCount = bots.size
    const memberCountText = `:adult: ${tn('commands.serverinfo.memberCount.value.userCount', locale, userCount)}\n` +
      `:robot: ${tn('commands.serverinfo.memberCount.value.botCount', locale, botCount)}`

    const channelCache = guild.channels.cache
    const textChannelCount = channelCache.filter((c) => c.type === 'text').size
    const voiceChannelCount = channelCache.filter((c) => c.type === 'voice').size
    const categoryCount = channelCache.filter((c) => c.type === 'category').size
    const newsChannelCount = channelCache.filter((c) => c.type === 'news').size
    const channelCountText = `:keyboard: ${tn('commands.serverinfo.channelCount.value.textChannelCount', locale, textChannelCount)}\n` +
      `:microphone2: ${tn('commands.serverinfo.channelCount.value.voieChannelCount', locale, voiceChannelCount)}\n` +
      `:file_folder: ${tn('commands.serverinfo.channelCount.value.categoryCount', locale, categoryCount)}\n` + 
      `:newspaper: ${tn('commands.serverinfo.channelCount.value.newsChannelCount', locale, newsChannelCount)}`

    const verificationLevel = guild.verificationLevel
    const verificationLevelText = `**${t(`verificationLevel.${verificationLevel}.name`, locale)}** (\`${verificationLevel}\`)\n`
      + t(`verificationLevel.${verificationLevel}.description`, locale)

    const createdAt = moment(guild.createdAt).tz('Asia/Seoul').format(t('commands.serverinfo.createdAt.value', locale))

    if (useEmbed) {
      data = new MessageEmbed()
        .setTitle(t('commands.serverinfo.title', locale, guild.name))
        .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
        .setFooter(msg.author.tag, msg.author.avatarURL({ dynamic: true, size: 1024 }))
        .addField(':desktop: ' + t('commands.serverinfo.name', locale), guild.name, true)
        .addField(':id: ' + t('commands.serverinfo.id', locale), guild.id, true)
        .addField(`:crown: ${t('commands.serverinfo.owner', locale)}`, `<@${guild.owner.id}> ${guild.owner.user.tag} (${guild.owner.id})`)
        .addField(`:map: ${t('commands.serverinfo.region', locale)}`, `${t('regions.' + guild.region, locale)} (\`${guild.region}\`)`)
        .addField(':shield: ' + t('commands.serverinfo.verificationLevel', locale), verificationLevelText)
        .addField(':busts_in_silhouette: ' + tn('commands.serverinfo.memberCount.title', locale, guild.memberCount), memberCountText)
        .addField(':tv: ' + tn('commands.serverinfo.channelCount.title', locale, guild.channels.cache.size), channelCountText)
        .addField(':birthday: ' + t('commands.serverinfo.createdAt.title', locale), createdAt)
    }

    return msg.channel.send(data)
  }
}

module.exports = ServerInfoCommand
