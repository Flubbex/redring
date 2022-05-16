export default {
  name: "Kick",
  type: "combat",
  description:
    "Kick the enemy for {{=it.baseAttribute.strength}} damage. Has a 50% chance to interrupt.",
  windup: 0,
  cooldown: 3000,
  call: "kick",
  image: "game-icon-boot-kick"
};
