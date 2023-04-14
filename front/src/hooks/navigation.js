import history from "providers/RouterProvider/history";

export const confirmNavigation = (condition, confirmLeaving, ifConfirmed) => {
  if (!condition) return;

  const unblock = history.block(({ location }) => {
    if (!window.confirm(confirmLeaving)) return;

    ifConfirmed?.();
    unblock();
    history.push(location.pathname);
  });

  return unblock;
};
