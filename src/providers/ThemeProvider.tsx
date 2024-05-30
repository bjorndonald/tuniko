"use client";
import React from 'react'
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { type PropsWithChildren } from "react";
import { CustomThemeProvider } from './CustomThemeProvider';
const ThemeProvider = (props: PropsWithChildren) => {
  return (
      <NextThemeProvider
          attribute={"class"}
          defaultTheme={"system"}
          enableColorScheme
          disableTransitionOnChange
      >
          <CustomThemeProvider>{props.children}</CustomThemeProvider>
      </NextThemeProvider>
  )
}

export default ThemeProvider