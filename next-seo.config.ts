const defaultSEOConfig = {
    title: "Tuniko | Help Us Translate",
    description: "This is a platform that allows users to help each other with translations for languages not supported digitally",
    cannonical: "https://tuniko.com",
    openGraph: {
        type: "website",
        url: "https://tuniko.com",
        site_name: "Tuniko",
        title: "Tuniko | Help Us Translate",
        description: "This is a platform that allows users to help each other with translations for languages not supported digitally",
        images: [
            {
                url: "https://res.cloudinary.com/b-bassey/image/upload/v1716981224/tuniko/og.png",
                width: 1020,
                height: 750,
                alt: "Tuniko Site's Opengraph Image",
            },
        ],
        profile: {
            firstName: "Bjorn-Donald",
            lastName: "Bassey",
            username: "6lackbjorn",
            gender: "male",
        },
    },
    twitter: {
        handle: "@tuniko",
        site: "@tuniko",
        cardType: "summary_large_image",
    },
}

export default defaultSEOConfig;