import { DbService } from "@/modules/database";
import { eq } from "drizzle-orm";
import { articlesTable } from "../tables/schema";
import { SelectArticles } from "../types";

export class ArticlesService {
  constructor(private readonly db: DbService) {}

  async getArticles(): Promise<SelectArticles[]> {
    return await this.db.select().from(articlesTable).all();
  }

  async getArticleById(id: string): Promise<SelectArticles | undefined> {
    return (
      await this.db.select().from(articlesTable).where(eq(articlesTable.id, id))
    ).at(0);
  }

  async createArticle(article: SelectArticles): Promise<void> {
    await this.db.insert(articlesTable).values(article);
  }

  async updateArticle(
    id: string,
    article: Partial<SelectArticles>
  ): Promise<void> {
    await this.db
      .update(articlesTable)
      .set(article)
      .where(eq(articlesTable.id, id));
  }

  async deleteArticle(id: string): Promise<void> {
    await this.db.delete(articlesTable).where(eq(articlesTable.id, id));
  }
}
