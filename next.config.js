module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    redirectUrl: process.env.REDIRECT_URL,
  },
}
