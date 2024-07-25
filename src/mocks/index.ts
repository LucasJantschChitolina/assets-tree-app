const dataSources = {
  jaguar: {
    assets: () => import("./jaguar/assets.json"),
    locations: () => import("./jaguar/locations.json"),
  },
  apex: {
    assets: () => import("./apex/assets.json"),
    locations: () => import("./apex/locations.json"),
  },
  tobias: {
    assets: () => import("./tobias/assets.json"),
    locations: () => import("./tobias/locations.json"),
  },
};

async function loadData(source: keyof typeof dataSources) {
  const assetsPromise = dataSources[source].assets();
  const locationsPromise = dataSources[source].locations();
  const [assets, locations] = await Promise.all([
    assetsPromise,
    locationsPromise,
  ]);
  return { assets: assets.default, locations: locations.default };
}

export { loadData, dataSources };
