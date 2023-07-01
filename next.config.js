/**
 * proxy to other site or service
 */

module.exports = () => {
    const rewrites = () => {
      return [
        {
          source: "/luni",
          destination:  "https://wannianrili.bmcx.com/",
        },
      ];
    };
    return {
      rewrites,
    };
  };
