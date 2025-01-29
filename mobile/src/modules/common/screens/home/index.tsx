import { View } from 'react-native';

import { Text } from '../../components/ui/text';

import { articles } from '~/data/articles';
import { ArticleCard } from '~/modules/articles/components/articles-card';

export default function HomeScreen() {
  return (
    <View className="py-5">
      <Text variant="h2" className="px-5">
        Bonjour, Finaritra!! 👋
      </Text>
      <View className="flex  ">
        {articles.map((article, index) => (
          <ArticleCard key={article.id + ' - ' + index} article={article} />
        ))}
      </View>
    </View>
  );
}
