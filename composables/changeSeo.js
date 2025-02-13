export const useChangeSeo = (imageId) => {
  const route = useRoute();
  const config = useRuntimeConfig();

  const siteUrl =
    config.public.siteUrl ?? "https://horizontal-slider-chi.vercel.app";

  return useHead({
    titleTemplate: () => {
      return "ევექსი - 1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.";
    },
    meta: [
      { name: "og:title", content: "ევექსი" },
      {
        name: "og:description",
        content: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
      },
      {
        name: "og:url",
        content: () => {
          return siteUrl + route.fullPath;
        },
      },
      {
        name: "og:image",
        content: () => {
          return imageId
            ? siteUrl + `/images/1001-back-120/${imageId}.webp`
            : siteUrl + "/images/share-image.webp";
        },
      },
      { name: "og:image:alt", content: "თავს მოუარე!" }, // Optionally, add an alt tag for accessibility
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ევექსი" },
      {
        name: "twitter:description",
        content: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
      },
      {
        name: "twitter:image",
        content: () => {
          return imageId
            ? `/images/1001-back-120/${imageId}.webp`
            : "/images/share-image.webp";
        },
      },
      {
        name: "description",
        content: "1001 მიზეზი, თუ რატომ უნდა იცხოვრო დიდხანს.",
      },
    ],
  });
};
