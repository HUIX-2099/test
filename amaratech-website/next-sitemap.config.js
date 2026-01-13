/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://amaratechit.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'Anthropic-AI',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://amaratechit.com/sitemap-0.xml',
    ],
  },
  exclude: ['/admin/*', '/api/*'],
  changefreq: 'monthly',
  priority: 0.7,
};
