import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "江南大学ACM俱乐部",
  description: "Welcome to JNU ACM!",

  bundler: viteBundler({
    viteOptions: {
      build: {
        rollupOptions: {
          onwarn(warning, warn) {
            if (
              warning.code === "INVALID_ANNOTATION" &&
              warning.id?.includes("@vueuse/core")
            )
              return;

            warn(warning);
          },
        },
      },
    },
  }),

  theme,
});
