import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Toaster } from "react-hot-toast";

const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThirdwebProvider activeChain={activeChain}>
            <Component {...pageProps} />
            <Toaster />
        </ThirdwebProvider>
    );
}

export default MyApp;
