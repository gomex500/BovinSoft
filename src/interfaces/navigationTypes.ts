import { BovinoModel } from "./IBovino";
import { FincaModel } from "./IFinca";
import { IBovine } from "./Livestock";

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
  CattleDetailBovine: {
    animal: IBovine;
  };
  CattleReproduction: {
    animal: IBovine | FincaModel;
    type: "cattle" | "farm"
  }
  CattleReproductionByFarm: {
    animal: IBovine | FincaModel;
    type: "cattle" | "farm"
  }
  CareHistoryBovine: {
    animal: IBovine | FincaModel;
    type: "cattle" | "farm"
  }
  CareHistoryByFarm: {
    animal: IBovine | FincaModel;
    type: "cattle" | "farm"
  },
  CareCalendarBovine: {
    animal: IBovine | FincaModel;
    type: "cattle" | "farm"
  },
  CareCalendarByFarm: {
    animal: IBovine | FincaModel;
    type: "cattle" | "farm"
  },
};
