import sanityClient from "@sanity/client";
import createImageUrlBuilder from "@sanity/image-url";
export const client = sanityClient({
  projectId: "rzemcqp6",
  dataset: "production",
  apiVersion: "2022-12-08",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
