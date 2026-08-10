const BANNER_DIR = "/assets/images/user/banner";

export type Banner = {
  label: string;
  thumb: string; // Preview tile shown in the picker grid. 
  cover: string; // Wide artwork rendered as the profile banner. 
};

/*
 * Banners are stored on User.bannerKey by key, not by position, so reordering
 * or reskinning this catalogue never remaps a user's existing choice.
 */
export const BANNERS = {
  default: {
    label: "Default",
    thumb: `${BANNER_DIR}/normalSm.png`,
    cover: `${BANNER_DIR}/normal.png`,
  },
  building: {
    label: "Architecture",
    thumb: `${BANNER_DIR}/building.png`,
    cover: `${BANNER_DIR}/buildingComponent.png`,
  },
  write: {
    label: "Writing",
    thumb: `${BANNER_DIR}/write.png`,
    cover: `${BANNER_DIR}/writeComponent.png`,
  },
  scale: {
    label: "Law",
    thumb: `${BANNER_DIR}/scale.png`,
    cover: `${BANNER_DIR}/scaleComponent.png`,
  },
  art: {
    label: "Art",
    thumb: `${BANNER_DIR}/art.jpeg`,
    cover: `${BANNER_DIR}/artComponent.png`,
  },
  book: {
    label: "Literature",
    thumb: `${BANNER_DIR}/book.jpeg`,
    cover: `${BANNER_DIR}/bookComponent.png`,
  },
  stethoscope: {
    label: "Medicine",
    thumb: `${BANNER_DIR}/stethoscope.png`,
    cover: `${BANNER_DIR}/stethoscopeComponent.png`,
  },
  laptop: {
    label: "Technology",
    thumb: `${BANNER_DIR}/laptop.png`,
    cover: `${BANNER_DIR}/laptopComponent.png`,
  },
  lab: {
    label: "Science",
    thumb: `${BANNER_DIR}/lab.png`,
    cover: `${BANNER_DIR}/labComponent.png`,
  },
} as const satisfies Record<string, Banner>;

export type BannerKey = keyof typeof BANNERS;

export const DEFAULT_BANNER_KEY: BannerKey = "default";

// Picker grid order — default first, then the themed banners. 
export const BANNER_LIST = Object.entries(BANNERS).map(([key, banner]) => ({
  key: key as BannerKey,
  ...banner,
}));

/**
 * An own-property check rather than `in` — `in` walks the prototype chain, so
 * keys like "toString" or "constructor" would otherwise pass validation.
 */
export function isBannerKey(value: unknown): value is BannerKey {
  return (
    typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(BANNERS, value)
  );
}

// Unknown or null keys fall back to the default banner. 
export function getBanner(key: string | null | undefined): Banner {
  return isBannerKey(key) ? BANNERS[key] : BANNERS[DEFAULT_BANNER_KEY];
}
