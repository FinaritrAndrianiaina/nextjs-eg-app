"use client";
import { SelectArticles } from "@/modules/articles/types";
import { DataTable } from "@/modules/common/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export default function ArticleListView({
  articles,
}: {
  articles: SelectArticles[];
}) {
  const columns = useMemo<ColumnDef<SelectArticles>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "excerpt",
        header: "Excerpt",
      },
      {
        accessorKey: "publishedDate",
        header: "Published Date",
      },
    ],
    []
  );

  return (
    <div className="p-5">
      <DataTable columns={columns} data={articles} />
    </div>
  );
}
