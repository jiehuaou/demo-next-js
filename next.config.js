/**
 * proxy to other site or service
 */



module.exports = () => {
  const rewrites = () => {
    
    return [
      {
        source: "/luni",
        destination: "https://wannianrili.bmcx.com/",
      },
      {
        source: "/api/java/:path*",
        // suppose this is internal java api
        destination: "http://localhost:3000/api/mock-java/:path*",
      },
    ];
  };
  return {
    rewrites,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'avatars.githubusercontent.com',
          port: '',
          pathname: '/u/**',
        },
      ],
    },
  };
};
