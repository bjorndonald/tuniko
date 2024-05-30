import React from "react";
import {
    Description,
    Details,
    FooterLink,
    LinksList,
    StyledFooter,
} from "./footer.styles";
import cx from "@/utils/cx";
import Logo from "@/components/Shared/Logo";
import photo from '@/assets/images/photo.jpg'
import { linksGroups } from "./footer.data";
import Image from "next/image";

const Heart = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
)

const Footer = () => {
    return (
        <div className="w-screen border-t pb-12 border-divider">

        <StyledFooter>
            <Details>
                <FooterLink
                    title="Bjorn-Donald - Home Page"
                    href={"/"}
                    className={cx(
                        "self-start",
                        "flex flex-row items-center text-xs font-bold",
                        "gap-2 no-underline saturate-125 dark:saturate-150",
                        "hocus:underline hocus:decoration-brand-500",
                        "dark:hocus:decoration-brand-300",
                    )}
                >
                    <Logo width={60} />
                    {/* <span className="text-accent">Bjorn-Donald</span> */}
                </FooterLink>
                <Description>
                    <div className="flex flex-col gap-2">
                        <div className="">"Let's help each other translate languages not supported digitally."</div>
                        <div className="flex flex-row justify-start items-center text-center gap-1">Built with <Heart /> by
                            <a href="https://twitter.com/6lackbjorn" target="_blank" className="link link-primary font-semibold" rel="noreferrer">Bjorn</a>

                            <div className="avatar">
                                <div className="relative w-6 rounded-full">
                                    <Image className="w-6 h-6 rounded-half" src={photo} alt={"Photo of Bjorn-Donald Bassey"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Description>

            </Details>
                <div className="grid grow grid-cols-3 tablet-md:col-span-4 tablet-md:gap-6 gap-3">

            
            {linksGroups.map(group => {
                return (
                    <LinksList key={group.title}>
                        <div
                            className={
                                "select-none font-manrope text-3xs font-bold uppercase tracking-wider text-tertiary-txt"
                            }
                        >
                            {group.title}
                        </div>
                        <ul
                            title={group.a11yTitle}
                            aria-label={group.a11yTitle}
                            className="flex flex-col gap-2"
                        >
                            {group.links.map(link => {
                                const className = `hocus:${link.className}`;
                                return (
                                    <li key={link.title}>
                                        <FooterLink
                                            title={link.a11yTitle || link.title}
                                            href={link.href}
                                            className={className}
                                            {...link.props}
                                            prefetch={false}
                                        >
                                            {link.title}
                                        </FooterLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </LinksList>
                );
            })}
                </div>
        </StyledFooter>
        </div>
    );
};

export default Footer;