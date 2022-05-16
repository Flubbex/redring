import effect from "../../../data/effect";

export default (user, target) => {
  target.hurt(user.attribute.get("strength") / 10);
  target.applyEffect(effect.stun);
};
