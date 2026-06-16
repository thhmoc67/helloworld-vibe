export interface LocalitySuggestResult {
  locality: string[];
  properties: unknown[];
}

export interface FetchLocalitySuggestParams {
  city: string;
  keyword: string;
  campaign?: "" | "ok";
  signal?: AbortSignal;
}

export interface LocalitySuggestResponse {
  success: boolean;
  data: LocalitySuggestResult;
}
