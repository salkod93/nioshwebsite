import axios from "axios";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";

const PIPEDRIVE_API_BASE = "https://api.pipedrive.com/v1";

function getPipedriveApiKey(): string {
  const key = process.env.PIPEDRIVE_API_KEY;
  if (!key) throw new Error("PIPEDRIVE_API_KEY is not set");
  return key;
}

async function findPersonByEmail(email: string, apiKey: string): Promise<number | null> {
  try {
    const response = await axios.get(`${PIPEDRIVE_API_BASE}/persons/search`, {
      params: {
        term: email,
        fields: "email",
        exact_match: true,
        api_token: apiKey,
      },
    });
    const items = response.data?.data?.items ?? [];
    return items.length > 0 ? items[0].item.id : null;
  } catch {
    return null;
  }
}

async function createOrUpdatePerson(
  fullName: string,
  email: string,
  apiKey: string
): Promise<number> {
  const existingId = await findPersonByEmail(email, apiKey);
  if (existingId) return existingId;

  const response = await axios.post(
    `${PIPEDRIVE_API_BASE}/persons`,
    {
      name: fullName,
      email: [{ value: email, primary: true }],
    },
    { params: { api_token: apiKey } }
  );
  return response.data.data.id;
}

async function createKawaderDeal(
  fullName: string,
  personId: number,
  cvUrl: string,
  apiKey: string
): Promise<number> {
  const response = await axios.post(
    `${PIPEDRIVE_API_BASE}/deals`,
    {
      title: `Kawader Accreditation - ${fullName}`,
      person_id: personId,
    },
    { params: { api_token: apiKey } }
  );
  const dealId = response.data.data.id;

  // Attach CV link as a note on the deal
  await axios.post(
    `${PIPEDRIVE_API_BASE}/notes`,
    {
      content: `Kawader Accreditation Request\n\nApplicant: ${fullName}\n\nCV Document: ${cvUrl}`,
      deal_id: dealId,
    },
    { params: { api_token: apiKey } }
  );

  return dealId;
}

export const kawaderRouter = router({
  submitAccreditation: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(2, "Full name is required"),
        email: z.string().email("Valid email is required"),
        // CV file sent as base64 string with metadata
        cvFileName: z.string().min(1, "File name is required"),
        cvFileBase64: z.string().min(1, "CV file is required"),
        cvMimeType: z.string().default("application/pdf"),
      })
    )
    .mutation(async ({ input }) => {
      const apiKey = getPipedriveApiKey();
      const { fullName, email, cvFileName, cvFileBase64, cvMimeType } = input;

      // 1. Upload CV to S3
      const fileBuffer = Buffer.from(cvFileBase64, "base64");
      const safeFileName = cvFileName.replace(/[^a-zA-Z0-9._-]/g, "_");
      const timestamp = Date.now();
      const s3Key = `kawader-cvs/${timestamp}-${safeFileName}`;
      const { url: cvUrl } = await storagePut(s3Key, fileBuffer, cvMimeType);

      // 2. Find or create person in Pipedrive
      const personId = await createOrUpdatePerson(fullName, email, apiKey);

      // 3. Create deal with CV link attached as note
      const dealId = await createKawaderDeal(fullName, personId, cvUrl, apiKey);

      return { success: true, dealId, personId, cvUrl };
    }),
});
