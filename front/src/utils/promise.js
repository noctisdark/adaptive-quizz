export const timeout = (dt) =>
  new Promise((resolveIn) => setTimeout(resolveIn, dt));

export const throttle = async (requestPromise, t) => {
  const [result] = await Promise.all([requestPromise, timeout(t)]);
  return result;
};
