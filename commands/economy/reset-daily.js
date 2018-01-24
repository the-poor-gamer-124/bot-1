const { Command } = require('discord.js-commando');
const diceAPI = require('../../diceAPI');

module.exports = class ResetDailyCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reset-daily',
			group: 'economy',
			memberName: 'reset-daily',
			// prettier-ignore
			description: 'Reset a user\'s last claimed daily timestamp.',
			details: 'Only the bot owner(s) may use this command.',
			aliases: ['reset-dailies', 'daily-reset', 'dailies-reset'],
			examples: ['reset-daily @Dice'],
			args: [
				{
					key: 'user',
					// prettier-ignore
					prompt: 'Who\'s wait time do you want to reset?',
					type: 'user',
					default: '',
				},
			],
			throttling: {
				usages: 2,
				duration: 30,
			},
			ownerOnly: true,
		});
	}

	async run(msg, { user }) {
		user = user || msg.author;

		// Permission checking
		if (user.bot === true) {
			// prettier-ignore
			return msg.reply('❌ You can\'t reset a bot\'s daily wait time.');
		}

		await diceAPI.setDailyUsed(user.id, false);

		// Tell the author
		return msg.reply(`🕓 Reset ${user}'s wait time.`);
	}
};
