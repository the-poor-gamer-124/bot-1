const { Command } = require('discord.js-commando');
const { respond } = require('../../providers/simpleCommandResponse');

module.exports = class JoinChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'join-channel',
      group: 'music',
      memberName: 'join-channel',
      description: 'Join the voice channel of the member.',
      aliases: ['join', 'join-voice'],
      examples: ['join'],
      throttling: {
        usages: 1,
        duration: 5
      }
    });
  }

  async run(msg) {
    const vc = msg.member.voice.channel;

    if (vc && vc.permissionsFor(msg.guild.me).has('CONNECT')) {
      await msg.member.voice.channel.join();
      respond(msg);
      return null;
    } else if (vc) {
      return msg.reply('I don\'t have permissions to join that voice channel.');
    } else {
      return msg.reply('You aren\'t in a voice channel.');
    }
  }
};
