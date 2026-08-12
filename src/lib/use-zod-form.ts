import { useCallback, useState } from "react";
import type { z } from "zod";
import { validateForm, getZodErrorMessage } from "./form-validation";

type FieldValues = Record<string, unknown>;

export function useZodForm<T extends z.ZodObject<z.ZodRawShape>>(schema: T) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Set<string>>(() => new Set());

  const getFieldError = useCallback(
    (field: string, value: unknown): string | undefined => {
      const fieldSchema = schema.shape[field as keyof typeof schema.shape];
      if (!fieldSchema) return undefined;
      const result = (fieldSchema as z.ZodTypeAny).safeParse(value);
      if (result.success) return undefined;
      return getZodErrorMessage(result.error);
    },
    [schema],
  );

  const setFieldError = useCallback(
    (field: string, value: unknown) => {
      const message = getFieldError(field, value);
      setErrors((current) => {
        const next = { ...current };
        if (message) next[field] = message;
        else delete next[field];
        return next;
      });
    },
    [getFieldError],
  );

  const markTouched = useCallback((field: string) => {
    setTouched((current) => {
      if (current.has(field)) return current;
      const next = new Set(current);
      next.add(field);
      return next;
    });
  }, []);

  const handleBlur = useCallback(
    (field: string, value: unknown) => {
      markTouched(field);
      setFieldError(field, value);
    },
    [markTouched, setFieldError],
  );

  const handleChange = useCallback(
    (field: string, value: unknown) => {
      if (touched.has(field) || errors[field]) {
        setFieldError(field, value);
      }
    },
    [touched, errors, setFieldError],
  );

  const validateAll = useCallback(
    (values: FieldValues) => {
      const result = validateForm(schema, values);
      if (result.success) {
        setErrors({});
        return { success: true as const, data: result.data };
      }

      setErrors(result.errors);
      setTouched((current) => {
        const next = new Set(current);
        for (const key of Object.keys(result.errors)) next.add(key);
        return next;
      });
      return { success: false as const, errors: result.errors };
    },
    [schema],
  );

  return {
    errors,
    handleBlur,
    handleChange,
    validateAll,
  };
}
