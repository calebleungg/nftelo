module.exports = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache',
          },
        ],
      },
      {
        source: "/leaderboard",
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache',
          },
        ],
      },
    ]
  },
}