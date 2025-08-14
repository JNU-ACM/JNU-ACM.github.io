import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "江南大学ACM俱乐部",
  description: "Welcome to JNU ACM!",

  theme,
});
