import { draftMode } from "next/headers";

import PreviewDocumentsCount from "components/PreviewDocumentsCount";
import PreviewProvide
import { getClient } from "lib/sanity.client";

export default async function IndexPage() {
  const preview = draftMode().isEnabled
    ? { token: process.env.SANITY_API_READ_TOKEN }
    : undefined;

  const data = await client.fetch(query);

  if (preview) {
    return (
      <PreviewProvider token={preview.token}>
        <PreviewDocumentsCount data={data} />
      </PreviewProvider>
    );
  }

  return <DocumentsCount data={data} />;
}
