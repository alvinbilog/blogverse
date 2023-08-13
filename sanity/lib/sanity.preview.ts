// "use client";

// import { definePreview } from "next-sanity/preview";
// import { client } from "./client";

// function onPublicAccessOnly() {
//   throw new Error(`Unable to load preview as you're not logged in`);
// }
// if (!client.projects || !client.dataset) {
//   throw new Error(
//     `Missing projectId or dataset. Check your sanity.json or .env`
//   );
// }
// export const usePreview = definePreview({
//   projectId,
//   dataset,
//   onPublicAccessOnly,
// });
