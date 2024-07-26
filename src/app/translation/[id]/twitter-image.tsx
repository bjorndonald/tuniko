import { getCorpusById } from "@/actions/corpus";
import Logo from "@/components/Shared/Logo";
import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt =
  "Tuniko - Help Us Translate! \nThis is a platform that allows users to help each other with translations for languages not supported digitally";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  // Font
  const UxumBold = fetch(
    new URL("@/assets/fonts/UxumGrotesque-Bold.woff", import.meta.url),
  ).then(res => res.arrayBuffer());
  const UxumRegular = fetch(
    new URL("@/assets/fonts/UxumGrotesque-Regular.woff", import.meta.url),
  ).then(res => res.arrayBuffer());
  const corpus = await getCorpusById(params.id);
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          gap: 12,
          padding: 24,
          background: "#0c121e",
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "Uxum",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            gap: 8,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Logo
            style={{
              color: "#0A85F7",
              fill: "#0A85F7",
              width: 80,
              height: 91.8,
            }}
          />
          <span
            style={{
              fontSize: 64,
              color: "white",
              fontWeight: "normal",
            }}
          >
            {corpus?.language_from?.name}
          </span>
        </div>

        <h1
          style={{
            width: 1000,
            color: "white",
            fontSize: 100,
            maxHeight: 120,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {corpus.text}
        </h1>
      </div>
    ),

    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Uxum",
          data: await UxumBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Uxum",
          data: await UxumRegular,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
