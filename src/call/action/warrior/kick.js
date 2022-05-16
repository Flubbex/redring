export default (user, target) => {
  target.hurt(user.attribute.get("strength"));
  if (Math.random() < 0.5) target.apply("attackFrame", 0);
};
