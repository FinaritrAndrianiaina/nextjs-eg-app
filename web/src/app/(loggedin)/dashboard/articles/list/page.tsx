import container from "@/main";
import ArticleListView from "@/views/articles/article-list";
import { notFound } from "next/navigation";

export default async function Page() {
  const articles = await container.resolve("articles").getArticles();

  if (!articles) {
    notFound();
  }
  return <ArticleListView articles={articles} />;
}
