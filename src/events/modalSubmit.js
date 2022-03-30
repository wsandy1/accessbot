const ModalResponse = require("../structures/ModalResponse");
const VamsysUser = require("../structures/VamsysUser");

module.exports = async (modal) => {
  try {
    if (modal.customId === 'access-form') {
      await modal.deferReply({ ephemeral: true });

      const userResponse = new ModalResponse(modal);
      const pilotId = userResponse.pilotId.toUpperCase();

      const vamsysUser = await VamsysUser.fromPilotId(userResponse.pilotId);

      if (vamsysUser.exists || !vamsysUser.doesNameMatch(userResponse.name)) {
        return await modal.followUp({content: 'Your details were incorrect. Please try again, ensuring that you have entered your details exactly as requested above.', ephemeral: true});
      }

      const nickname = userResponse.sanitisedName;
      const separator = userResponse.client.getNickSeparatorByServerID();

      await modal.member.setNickname(`${nickname}${separator}${pilotId}`);
      await modal.member.roles.add(modal.client.getRoleByServerID(modal.guildId));
      await modal.followUp({content: `Welcome to ${modal.guild.name}!`});
    }
  } catch(e) {
    modal.followUp('There was an error whilst handling your submission. Please try again later.')
    console.log(e);
  }
}