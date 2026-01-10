import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://JNU-ACM.github.io",

  logo: "/logo.png",
  docsDir: "src",

  navbar,
  sidebar,

  toc: {
    levels: [2, 3],
  },

  copyright: false,
  footer: "由 <a href=\"https://theme-hope.vuejs.press/zh/\" target=\"_blank\">VuePress Theme Hope</a> 驱动",
  displayFooter: true,

  markdown: {
    gfm: true,
    figure: true,
    imgLazyload: true,
    imgSize: true,
    tasklist: true,
    codeTabs: true,
    tabs: true,
    mark: true,
    sub: true,
    sup: true,
    math: true,
  },

  plugins: {
    icon: {
      prefix: "fa6-solid:",
    },
  },
});
