import { createClient } from "@sanity/client";

export const sanity = createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET,
    apiVersion: "2026-09-04",
    useCdn: true,
});