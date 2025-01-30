"use client";
import { insertArticlesSchema } from "@/modules/articles/types";
import { ZodFormRenderer } from "@/modules/common/forms/zod-form-renderer";

export default function CreateArticlesViews() {
  return (
    <div>
      <ZodFormRenderer
        schema={insertArticlesSchema}
        title="Create Article"
        description="article"
        onSubmit={console.log}
      />
    </div>
  );
}
