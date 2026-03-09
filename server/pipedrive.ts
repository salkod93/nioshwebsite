import axios from "axios";
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";

const PIPEDRIVE_API_BASE = "https://api.pipedrive.com/v1";

function getPipedriveApiKey(): string {
  const key = process.env.PIPEDRIVE_API_KEY;
  if (!key) throw new Error("PIPEDRIVE_API_KEY is not set");
  return key;
}

/**
 * Search for an existing person in Pipedrive by email.
 * Returns the person ID if found, null otherwise.
 */
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

/**
 * Create a new person in Pipedrive.
 */
async function createPerson(
  firstName: string,
  lastName: string,
  email: string,
  apiKey: string
): Promise<number> {
  const response = await axios.post(
    `${PIPEDRIVE_API_BASE}/persons`,
    {
      name: `${firstName} ${lastName}`.trim(),
      email: [{ value: email, primary: true }],
    },
    { params: { api_token: apiKey } }
  );
  return response.data.data.id;
}

/**
 * Create a new deal in Pipedrive linked to a person.
 */
async function createDeal(
  title: string,
  personId: number,
  note: string,
  apiKey: string
): Promise<number> {
  const response = await axios.post(
    `${PIPEDRIVE_API_BASE}/deals`,
    {
      title,
      person_id: personId,
    },
    { params: { api_token: apiKey } }
  );
  const dealId = response.data.data.id;

  // Attach the message as a note on the deal
  if (note) {
    await axios.post(
      `${PIPEDRIVE_API_BASE}/notes`,
      {
        content: note,
        deal_id: dealId,
      },
      { params: { api_token: apiKey } }
    );
  }

  return dealId;
}

export const pipedriveRouter = router({
  submitContact: publicProcedure
    .input(
      z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Valid email is required"),
        companyName: z.string().optional(),
        message: z.string().min(1, "Message is required"),
      })
    )
    .mutation(async ({ input }) => {
      const apiKey = getPipedriveApiKey();
      const { firstName, lastName, email, companyName, message } = input;

      // Find or create person
      let personId = await findPersonByEmail(email, apiKey);
      if (!personId) {
        personId = await createPerson(firstName, lastName, email, apiKey);
      }

      // Create a deal linked to the person, include company name in title if provided
      const dealTitle = companyName
        ? `Website Inquiry - ${firstName} ${lastName} (${companyName})`
        : `Website Inquiry - ${firstName} ${lastName}`;
      const noteContent = companyName
        ? `Company: ${companyName}\n\n${message}`
        : message;
      const dealId = await createDeal(dealTitle, personId, noteContent, apiKey);

      return { success: true, dealId, personId };
    }),
});
