// navigationTypes.ts
export type RootStackParamList = {
  Home: undefined; // Si no tiene parámetros
  RecommendedActivities: {
    newsItem: {
      day: string;
      weather: string;
      farm: string;
    };
  };
  PostDetail: {
    postId: string;
  };
  Bovinos:{}
};
