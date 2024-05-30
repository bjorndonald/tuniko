'use client';
import Link from "@/components/Shared/Link"
import { getColoredTextClasses } from "@/utils/colored-text"


const ErrorComponent = () => {

    return (
        <div id="error" className="flex flex-col py-[65px] items-center gap-5 min-h-screen justify-center">
            <h1 className={getColoredTextClasses("red", "mb-3 text-3xl")}>
                Something went wrong
            </h1>
            <p>
                <span className="font-medium">Whoops!</span> Unfortunately an unexpected
                error occured.
            </p>
            <p className="-mt-2 text-center">
                Please{" "}
                <Link
                    title="Create issue on Github"
                    href={
                        "https://twitter.com/elackbjorn"
                    }
                >
                    share the details
                </Link>{" "}
                of this issue, so I can fix it for you.
            </p>
            <Link href={"/"} title="Home page" className="mt-3 mx-auto">
                Go back home
            </Link>
            
            <img
                src={"/site/error.gif"}
                alt={"Error Stickers https://tenor.com/view/error-gif-27338366"}
                loading={"lazy"}
                decoding={"async"}
                className={"mt-3"}
                style={{ maxWidth: 425 }}
            />
        </div>
    )
}

export default ErrorComponent;