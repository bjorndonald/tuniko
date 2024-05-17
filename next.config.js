const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer({
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
                port: "",
                pathname: "**",
            },
        ],
        domains: [
            "res.cloudinary.com",
            "cdn.hashnode.com",
        ]
    }
})
