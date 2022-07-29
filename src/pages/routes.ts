const context = require.context(".", true, /route.ts$/);

const routes: any[] = context.keys().map((path: any) => {
  return require(`${path}`).default;
});

export default routes;
