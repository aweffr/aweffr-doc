// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'aweffr\'s tech blog',
  tagline: 'A passionate problem solver',
  url: 'https://aweffr.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.jpeg',
  organizationName: 'aweffr', // Usually your GitHub org/user name.
  projectName: 'aweffr-doc', // Usually your repo name.

  plugins: ['docusaurus-plugin-sass'],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/aweffr/aweffr-doc/tree/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/aweffr/aweffr-doc/tree/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'aweffr\'s tech blog',
        logo: {
          alt: 'My Site Logo',
          src: 'img/favicon.jpeg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: '文档',
          },
          {
            to: '/blog',
            label: '博客',
            position: 'left'
          },
          {
            to: '/resume',
            label: '关于我',
            position: 'left'
          },
          {
            href: 'https://github.com/aweffr/aweffr-doc',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '速查手册',
            items: [
              {
                label: 'Nginx 速查',
                to: '/docs/nginx-cheatsheet',
              },
              {
                label: 'ReactNative Style 速查',
                to: '/docs/react-native/react-native-style-cheatsheet'
              },
              {
                label: 'Docker (Compose) 速查',
                to: '/docs/docker-cheatsheet',
              }
            ],
          },
          {
            title: '常用站点',
            items: [
              {
                label: 'React Native Releases',
                to: 'https://github.com/facebook/react-native/blob/main/CHANGELOG.md'
              },
              {
                label: 'Django论坛',
                to: 'https://www.reddit.com/r/django/top/?t=week'
              },
              {
                label: '苏洋的博客',
                to: 'https://soulteary.com/'
              }
            ]
          },
          {
            title: '关于我',
            items: [
              {
                label: '博客',
                to: '/blog',
              },
              {
                label: '掘金',
                href: 'https://juejin.cn/user/3087084380761064',
              },
              {
                label: 'zhihu',
                href: 'https://www.zhihu.com/people/zou-le-69',
              },
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} | 沪ICP备18047501号-1`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
