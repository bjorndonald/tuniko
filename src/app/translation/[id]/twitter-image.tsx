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
  const interSemiBold = fetch(
    new URL("@/assets/fonts/Inter-SemiBold.ttf", import.meta.url),
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo
          style={{
            color: "#0A85F7",
            fill: "#0A85F7",
            width: 256,
            height: 256,
          }}
        />
        <h1
          style={{
            color: "white",
            fontSize: 128,
          }}
        >
          Tuniko - Help Us Translate
        </h1>
        <span
          style={{
            color: "white",
            fontSize: 88,
          }}
        >
          {corpus.language_from.name} - {corpus.language_to.name}
        </span>
        <h4
          style={{
            color: "white",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: 112,
          }}
        >
          {corpus.text}
        </h4>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interSemiBold,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
