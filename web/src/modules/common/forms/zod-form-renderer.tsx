/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { getDefaultValues, unwrapZodType, zodParseMeta } from "@/lib/zod-utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Select } from "@radix-ui/react-select";
import { ClassValue } from "clsx";
import { JSX, useState } from "react";
import { Path, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import { DatePicker } from "../components/ui/date-picker";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea"; // Import the Textarea component

type FieldRenderer = (key: string, field: any) => JSX.Element;

interface ZodFormRendererProps<T extends z.ZodObject<any>> {
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
  defaultValues?: Partial<z.infer<T>>;
  customRenderers?: Record<string, FieldRenderer>;
  className?: ClassValue;
  title: string;
  isNested?: boolean;
  description: string;
}

const ZodNestedRender: FieldRenderer = (key, field) => {
  const [open, setOpen] = useState(false);
  const handleSubmit = (data: any) => {
    field.onChange(data);
    setOpen(false);
    return data;
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit {key}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogTitle className="hidden">{key}</DialogTitle>

        <ZodFormRenderer
          isNested
          title={key}
          schema={field.schema}
          onSubmit={handleSubmit}
          defaultValues={field.value}
          description={`Edit ${key}`}
        />
      </DialogContent>
    </Dialog>
  );
};
const defaultRenderers: Record<string, FieldRenderer> = {
  ZodString: (key, field) => (
    <FormItem>
      <FormLabel>{key}</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  ),
  ZodNumber: (key, field) => (
    <FormItem>
      <FormLabel>{key}</FormLabel>
      <FormControl>
        <Input
          type="number"
          {...field}
          onChange={(e) => field.onChange(Number(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  ),
  ZodBoolean: (key, field) => (
    <FormItem className="flex flex-row h-fit items-start space-x-3 space-y-0 rounded-md  p-4">
      <FormControl>
        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
      <div className=" leading-none">
        <FormLabel>{key}</FormLabel>
      </div>
    </FormItem>
  ),
  ZodEnum: (key, field) => (
    <FormItem>
      <FormLabel>{key}</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={`Select ${key}`} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {(field.schema as z.ZodEnum<any>).options.map((option: string) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  ),
  ZodDate: (key, field) => (
    <FormItem>
      <FormLabel>{key}</FormLabel>
      <FormControl>
        <DatePicker {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  ),
  ZodObject: ZodNestedRender,
  ZodTextArea: (key, field) => (
    <FormItem>
      <FormLabel>{key}</FormLabel>
      <FormControl>
        <Textarea {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  ),
};

export function ZodFormRenderer<T extends z.ZodObject<any>>({
  schema,
  onSubmit,
  defaultValues,
  className,
  title,
  description,
  isNested = false,
  customRenderers = {},
}: ZodFormRendererProps<T>) {
  const [formData, setFormData] = useState<z.infer<T> | null>(null);

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(schema, defaultValues),
  });

  const handleSubmit = (data: z.infer<T>) => {
    setFormData(data);
    onSubmit(data);
  };

  const renderers = { ...defaultRenderers, ...customRenderers };

  const renderField = (key: string, fieldSchema: z.ZodTypeAny) => {
    const unwrappedZod = unwrapZodType(fieldSchema);
    let zodType = unwrappedZod.constructor.name;
    if (zodType === "ZodBranded") {
      zodType = zodParseMeta(fieldSchema)?.renderComponent;
    }

    console.log("zodType ->", key, zodType);
    const renderer = renderers[zodType] || renderers.ZodString;

    return (
      <FormField
        key={key}
        control={form.control}
        name={key as Path<z.infer<T>>}
        render={({ field }) => renderer(key, { ...field, schema: fieldSchema })}
      />
    );
  };

  return (
    <Form {...form}>
      <div>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Card className={cn({ "border-none shadow-none ": isNested })}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className={cn({ "space-y-8": !className }, className)}>
              {Object.entries(schema.shape).map(([key, value]) =>
                renderField(key, value as z.ZodAny)
              )}
            </CardContent>
            <CardFooter>
              <Button disabled={!form.formState.isValid} type="submit">
                Submit
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
      {formData && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold">Submitted Data:</h2>
          <pre className="mt-2 rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(formData, null, 2)}
            </code>
          </pre>
        </div>
      )}
    </Form>
  );
}
