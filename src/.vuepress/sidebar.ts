import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    {
      text: "招新",
      icon: "user-plus",
      link: "recruitment/",
      prefix: "recruitment/",
      children: "structure",
    },
    {
      text: "算法学习",
      icon: "code",
      link: "learning/",
      prefix: "learning/",
      children: "structure",
    },
    {
      text: "竞赛目录",
      icon: "list",
      link: "contests/",
      prefix: "contests/",
      children: "structure",
    },
  ],
});
