module.exports = {
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: 'cache-control',
            value: 'no-cache',
          },
        ],
      },
      {
        source: "/leaderboard",
        headers: [
          {
            key: 'cache-control',
            value: 'no-cache',
          },
        ],
      },
    ]
  },
}