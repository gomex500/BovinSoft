import { BovinoModel } from "./IBovino";

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
  InfoFinca: {};
  PostDetail: {
    postId: string;
  };
  Bovinos:{};
  FormFinca: {};
  FormBovino: {};
  InfoBovino: {
    newsItem: BovinoModel;
  };
  Login: {};
  Signup: {};
  FincasHome: {};
  SelectedType: {};
};
