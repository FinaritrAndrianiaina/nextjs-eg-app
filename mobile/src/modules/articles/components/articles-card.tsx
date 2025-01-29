import { BookmarkIcon } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { Article } from "../types/article";
import ExpoImage from "./ImageComponent";

import { cn } from "~/lib/utils";
import { Button } from "~/modules/common/components/ui/button";
import { Card, CardContent } from "~/modules/common/components/ui/card";
import { Text } from "~/modules/common/components/ui/text";

interface ArticleCardProps {
  article: Partial<Article>;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  // If the article is null or undefined, don't render anything
  if (!article) return null;
  return (
    <Card className="border-0">
      <CardContent className="p-1">
        <View className={cn("relative flex flex-row gap-4 p-5 ")}>
          <ExpoImage
            source={
              article.imageUrl
                ? { uri: article.imageUrl }
                : require("assets/placeholder.png")
            }
            style={styles.image}
          />
          <View className="flex-1">
            <Text>{article.author?.name ?? "Associated Press"}</Text>
            <Text variant="h4" className={cn("line-clamp-3")}>
              {article.title || "Untitled Article"}
            </Text>
            <Text>{article.publishedDate}</Text>
          </View>
          <Button
            size="icon"
            variant="outline"
            className="absolute top-0 right-0"
          >
            <BookmarkIcon color="black" size={24} />
          </Button>
        </View>
      </CardContent>
    </Card>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  featuredImage: {
    width: 400,
    height: 400,
  },
});
