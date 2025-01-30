/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

export function getDefaultValues(
  schema: z.ZodTypeAny,
  _defaultValue?: any
): any {
  if (_defaultValue) {
    return _defaultValue;
  }
  if (schema instanceof z.ZodObject) {
    _defaultValue = {};
    const defaultValues: Record<string, any> = {};
    for (const [key, value] of Object.entries(schema.shape)) {
      defaultValues[key] = getDefaultValues(
        value as z.ZodAny,
        _defaultValue[key]
      );
    }
    return { ...defaultValues, ..._defaultValue };
  } else if (schema instanceof z.ZodArray) {
    return _defaultValue ?? [];
  } else if (schema instanceof z.ZodString) {
    return _defaultValue ?? "";
  } else if (schema instanceof z.ZodNumber) {
    return _defaultValue ?? 0;
  } else if (schema instanceof z.ZodBoolean) {
    return _defaultValue !== undefined ? _defaultValue : false;
  } else if (schema instanceof z.ZodEnum) {
    return _defaultValue ?? schema.options[0];
  } else if (schema instanceof z.ZodOptional) {
    return _defaultValue !== undefined ? _defaultValue : undefined;
  } else {
    return _defaultValue ?? undefined;
  }
}

export function unwrapZodType(type: z.ZodTypeAny): z.ZodTypeAny {
  while (
    type instanceof z.ZodOptional ||
    type instanceof z.ZodNullable ||
    type instanceof z.ZodReadonly ||
    type instanceof z.ZodPromise
  ) {
    type = type.unwrap();
  }
  return type;
}

export function zodAddMeta<T extends z.ZodTypeAny>(
  schema: T,
  metadata: Record<string, any>
): T {
  return schema.describe(JSON.stringify(metadata));
}

export function zodParseMeta<T extends z.ZodTypeAny>(
  schema: T
): Record<string, any> | undefined {
  try {
    return schema.description ? JSON.parse(schema.description) : undefined;
  } catch {
    return undefined;
  }
}
