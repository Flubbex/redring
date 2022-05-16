export default {
  name: "Bash",
  type: "combat",
  description:
    "Bash the enemy down for {{=it.baseAttribute.strength*2}} damage. Has a 25% chance to stun the enemy for 1 turn.",
  windup: 0,
  cooldown: 5000,
  call: "bash",
  image: "game-icon-shield-bash"
};
