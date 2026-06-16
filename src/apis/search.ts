import { getApiBaseUrl } from "@/src/lib/api";
import type {
  FetchLocalitySuggestParams,
  LocalitySuggestResponse,
} from "@/src/models/search";

const emptyResult: LocalitySuggestResponse = {
  success: false,
  data: { locality: [], properties: [] },
};

export async function fetchLocalitySuggest({
  city,
  keyword,
  campaign = "ok",
  signal,
}: FetchLocalitySuggestParams): Promise<LocalitySuggestResponse> {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    return emptyResult;
  }

  const params = new URLSearchParams({ city, keyword });
  if (campaign) {
    params.set("campaign", campaign);
  }

  try {
    const response = await fetch(
      `${baseUrl}/v3/locality/suggest?${params.toString()}`,
      {
        headers: { Accept: "application/json" },
        signal,
      },
    );

    if (!response.ok) {
      return emptyResult;
    }

    const payload = (await response.json()) as {
      success?: boolean;
      data?: { locality?: string[]; properties?: unknown[] };
    };

    return {
      success: Boolean(payload.success),
      data: {
        locality: payload.data?.locality ?? [],
        properties: payload.data?.properties ?? [],
      },
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    return emptyResult;
  }
}
