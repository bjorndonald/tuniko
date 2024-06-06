import Link from "@/components/Shared/Link";
import { MAX_SITE_WIDTH } from "@/constants";
import { twc } from "@/utils/cx";

export const StyledFooter = twc.footer.attrs({
  style: { maxWidth: MAX_SITE_WIDTH },
})`
    w-full
    mx-auto
    flex gap-8 tablet-md:flex-row flex-col
    px-3
    pt-6 pb-0
    mobile-lg:pt-7
    tablet-sm:pt-8
    tablet-sm:pb-12
    tablet-sm:grid-cols-5
    tablet-sm:grid-rows-[1fr_auto]
    tablet-sm:gap-y-4
    tablet-md:px-0
`;

export const Details = twc.div`
    flex
    flex-col
    col-span-2
    gap-3
`;

export const Description = twc.div.attrs({ style: { maxWidth: "32ch" } })`
    text-2xs
    text-pretty
`;

export const LinksList = twc.div`
  flex
  flex-col
  gap-3
  tablet-sm:row-span-2
`;

export const FooterLink = twc(Link)`
  text-3xs
  font-manrope
  font-semibold
  transition-colors
  text-tertiary-txt
  hocus:text-secondary-txt
  hocus:saturate-125
  hocus:dark:saturate-150
  hocus:decoration-current
`;

export const DownloadLink = twc.button`
  text-3xs
  font-manrope
  font-semibold
  transition-colors
  text-tertiary-txt
  hocus:text-secondary-txt
  hocus:saturate-125
  hocus:dark:saturate-150
  hocus:decoration-current
`;
