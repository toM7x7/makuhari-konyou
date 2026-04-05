import { analyticsEventNames, type AnalyticsEventName } from "@makuhari/shared-types";

export function isAnalyticsEventName(value: string): value is AnalyticsEventName {
  return analyticsEventNames.includes(value as AnalyticsEventName);
}

export function createAnalyticsEvent(eventName: AnalyticsEventName, eventJson: Record<string, unknown>) {
  return {
    eventName,
    eventJson,
    createdAt: new Date().toISOString(),
  };
}

export { analyticsEventNames };
