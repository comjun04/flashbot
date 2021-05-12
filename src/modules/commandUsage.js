const makeUsageStr = (argsArr, previousArgs, cmdName, t) => {
  let summary = ''
  let descText = ''

  if (Array.isArray(previousArgs)) {
    for (const parsedArg of previousArgs) {
      summary += `${parsedArg} `
    }
  }

  for (const arg of argsArr) {
    const startBracket = arg.optional ? '[' : '<'
    const endBracket = arg.optional ? ']' : '>'
    const description = arg.description || t(`commands.${cmdName}.args.${arg.key}.DESC`)

    summary += `${startBracket}${arg.key}${endBracket} `
    descText += `${startBracket}${arg.key}: ${arg.type}${endBracket} - ${description} ${arg.optional ? t('modules.commandUsage.optional') : ''}\n`
  }

  return { summary, descText }
}

/**
 * Makes command usage.
 * @param {import('discord.js').Message} msg The message which triggered the command
 * @param {import('../structures/command/base')} cmd The command object
 * @param {import('../structures/MsgQuery')} query MsgQuery object
 * @param {Function} t The translate function
 * @param {*} ctx
 * @param {boolean} wrap Whether to wrap result with noticement text
 * @returns {string}
 */
module.exports = (msg, cmd, query, t, ctx, wrap = false) => {
  /*
   * Usage:
   * //somecmd <necessary arg> [optional arg]
   *
   * `arg1` - <type> some arg desc
   * `arg2` - <type> some another arg desc (optional)
   *
   * <Required> [Optional]
   *
   * Go to online docs for more information.
   * (Use `//help` to get the link)
   */
  // Don't show flags here.

  const { previous: previousArgs } = ctx
  let { now: argData } = ctx

  let summary = ''
  let description = ''

  if (!cmd._args.dynamic) {
    const data = makeUsageStr(cmd._args.args, null, cmd._name, t)
    summary += data.summary
    description += data.descText
  } else {
    if (!argData) {
      argData = cmd.args(msg).next().value.arg
    }

    if (argData) {
      const data = makeUsageStr([argData], previousArgs, cmd._name, t)
      summary += data.summary
      description += data.descText
    }
    summary += '......'
  }

  const finalText =
`${query.prefix}${query.cmd} ${summary}

${description}
${t('modules.commandUsage.footer')}
${t('modules.commandUsage.detailedHelpNotice', { prefix: query.prefix })}`

  if (wrap) {
    return (
`${t('modules.commandUsage.usage')}\`\`\`
${finalText}
\`\`\``
    )
  } else return finalText
}
