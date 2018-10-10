const { Command } = require('discord.js-commando');

module.exports = class LeaveChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leave-channel',
      group: 'music',
      memberName: 'leave-channel',
      description: 'Leave the voice channel the bot is currently in.',
      aliases: ['leave', 'leave-voice'],
      examples: ['leave'],
      throttling: {
        usages: 1,
        duration: 5
      }
    });
  }


  async run(msg) {
    if (msg.guild.me.voice.channel) {
      await msg.guild.me.voice.channel.leave();
      return msg.reply('Succesfully left!');
    } else {
      return msg.reply('Not in a voice channel.');
    }
  }
};
