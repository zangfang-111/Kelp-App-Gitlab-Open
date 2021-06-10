export interface LightroomRemoveMediaFromCollectionInput {
  mediaId: number
  lrCollectionId: number
}

export interface LrRenditionSyncPayload {
  renditionId?: number
  mediaId: number
  storagePath: string
  fileVersion: string
  fileName: string
  fileFormat: string
  size: number
  width: number
  height: number
  isSmartPreview: boolean
}
export interface LrCatalogSyncPayload {
  id?: number
  name: string
  tags: string[]
  uuid: string
  collection?: LrCollection[]
  collectionSets?: LrCollectionSet[]
}

export interface LrCollectionSet {
  name: string
  localIdentifier: number
  collections: LrCollection[]
}

export interface LrCollection {
  isSmartCollection: boolean
  name: string
  localIdentifier: number
}
export interface JwtUser {
  iss: 'https://sensio.eu.auth0.com/'
  sub: string
  aud: [string]
  iat: number
  exp: number
  azp: string
  scope: string
  permissions: string[]
}
interface KeyValue {
  [key: string]: any
}
export interface LightroomSyncMediaPayload {
  mediaId: number
  lrUuidIdentifier: string
  masterMedia?: {
    lrUuidIdentifier: string
    localIdentifier: number
  }
  gps?: {
    latitude: number
    longitude: number
  }
  currentCollectionId: number
  localIdentifier: number
  catalogId: number
  publishedCollections: { key: number; name: string; localIdentifier: number }[]
  containedCollections: { name: string; localIdentifier: number }[]
  title: string
  headline: string
  caption: string
  isVirtualCopy: boolean
  // formattedMetadata: LightroomFormattedMetadata
  // rawMetadata: LightroomRawMetadata
  // developSettings: LightroomDevelopSettings
}

export interface LightroomFormattedMetadata {
  isoSpeedRating: string
  descriptionWriter: string
  aperture: string
  lens: string
  creatorAddress: string
  iptcCategory: string
  keywordTagsForExport: string
  creatorPhone: string
  city: string
  creator: string
  cameraMake: string
  cameraSerialNumber: string
  focalLength: string
  plusVersion: string
  iptcSubjectCode: string
  copyrightInfoUrl: string
  creatorJobTitle: string
  creatorPostalCode: string
  dateCreated: string
  provider: string
  fileName: string
  exposure: string
  copyrightState: string
  creatorCountry: string
  title: string
  exposureBias: string
  DateTimeOutputDigitized: string
  dateTimeDigitized: string
  rightsUsageTerms: string
  metadataDate: string
  dimensions: string
  stateProvince: string
  intellectualGenre: string
  source: string
  label: string
  iptcOtherCategories: string
  instructions: string
  cameraModel: string
  flash: string
  creatorUrl: string
  creatorEmail: string
  DateTimeOutput: string
  creatorCity: string
  caption: string
  croppedDimensions: string
  creatorStateProvince: string
  shutterSpeed: string
  gps: string
  DateTimeOutputOriginal: string
  scene: string
  country: string
  copyright: string
  keywordTags: string
  artist: string
  headline: string
  fileSize: string
  folderName: string
  fileType: string
  isoCountryCode: string
  location: string
  exposureProgram: string
  jobIdentifier: string
  meteringMode: string
}

export interface Dimensions {
  width: number
  height: number
}

export interface LightroomRawMetadata {
  customMetadata: KeyValue
  isoSpeedRating: number
  isInStackInFolder: boolean
  lastEditTime: number
  lens: string
  masterPhoto: number
  countStackInFolderMembers: number
  aspectRatio: number
  isVideo: boolean
  isVirtualCopy: boolean
  DateTimeOutputDigitizedISO8601: string
  DateTimeOutputOriginalISO8601: string
  fileFormat: string
  durationInSeconds: number
  countVirtualCopies: number
  aperture: number
  copyrightState: string
  cameraSN: string
  DateTimeOutputDigitized: number
  metadataDate: string
  dimensions: Dimensions
  path: string
  root_uuid: string
  isCropped: boolean
  editCount: number
  flash: boolean
  shutterSpeed: number
  stackPositionInFolder: number
  stackInFolderIsCollapsed: boolean
  croppedDimensions: Dimensions
  height: number
  focalLength: number
  gps: {
    longitude: number
    latitude: number
  }
  uuid: string
  DateTimeOutputOriginal: number
  stackInFolderMembers: KeyValue
  pickStatus: number
  keywords: KeyValue
  virtualCopies: KeyValue
  width: number
  fileSize: number
  colorNameForLabel: string
  exposureBias: number
  smartPreviewInfo: KeyValue
  orientation: string
  DateTimeOutputISO8601: string
  DateTimeOutput: number
  captureTime: number
}

export interface LightroomDevelopSettings {
  HueAdjustmentAqua: number
  EnableLensCorrections: boolean
  Sharpness: number
  EnableEffects: boolean
  LuminanceAdjustmentAqua: number
  ColorNoiseReductionDetail: number
  ChromaticAberrationB: number
  SharpenEdgeMasking: number
  ParametricHighlightSplit: number
  LuminanceNoiseReductionContrast: number
  UprightFocalLength35mm: number
  HueAdjustmentOrange: number
  CropAngle: number
  ParametricMidtoneSplit: number
  HueAdjustmentPurple: number
  EnableColorAdjustments: boolean
  WhiteBalance: string
  FillLight: number
  RedEyeInfo: KeyValue
  LuminanceNoiseReductionDetail: number
  PostCropVignetteFeather: number
  ColorNoiseReductionSmoothness: number
  Contrast: number
  DefringeGreenAmount: number
  Dehaze: number
  Defringe: number
  Temperature: number
  ToneCurvePV2012Red: KeyValue
  RetouchInfo: KeyValue
  SaturationAdjustmentPurple: number
  DefringePurpleHueLo: number
  Exposure2012: number
  Tint: number
  HueAdjustmentBlue: number
  ProcessVersion: string
  LuminanceAdjustmentRed: number
  EnableTransform: boolean
  ParametricHighlights: number
  SaturationAdjustmentAqua: number
  EnableGradientBasedCorrections: boolean
  LensManualDistortionAmount: number
  AutoShadows: boolean
  PostCropVignetteMidpoint: number
  AutoLateralCA: number
  EnableSplitToning: boolean
  UprightCenterNormY: number
  SplitToningBalance: number
  DefringeGreenHueHi: number
  Clarity2012: number
  SaturationAdjustmentRed: number
  SaturationAdjustmentYellow: number
  DefringeGreenHueLo: number
  UprightTransformCount: number
  RedHue: number
  Shadows: number
  LuminanceAdjustmentOrange: number
  Exposure: number
  ColorNoiseReduction: number
  ToneCurvePV2012Green: KeyValue
  orientation: string
  EnableDetail: boolean
  ToneCurveName: string
  Saturation: number
  PostCropVignetteAmount: number
  ToneCurve: KeyValue
  CropConstrainToWarp: number
  SaturationAdjustmentBlue: number
  ParametricLights: number
  SaturationAdjustmentGreen: number
  EnableRetouch: boolean
  UprightCenterMode: number
  GrainAmount: number
  GrainFrequency: number
  UprightFourSegmentsCount: number
  LuminanceAdjustmentYellow: number
  VignetteAmount: number
  RedSaturation: number
  HighlightRecovery: number
  EnableGrayscaleMix: boolean
  ChromaticAberrationR: number
  LuminanceAdjustmentMagenta: number
  LuminanceAdjustmentGreen: number
  ToneCurvePV2012: KeyValue
  LensProfileEnable: number
  AutoContrast: boolean
  LuminanceSmoothing: number
  PostCropVignetteHighlightContrast: number
  CropRight: number
  ParametricShadowSplit: number
  AutoBrightness: boolean
  LensProfileSetup: string
  UprightPreview: boolean
  PerspectiveAspect: number
  HueAdjustmentRed: number
  DefringePurpleAmount: number
  ToneCurvePV2012Blue: KeyValue
  UprightCenterNormX: number
  SplitToningShadowHue: number
  EnableCircularGradientBasedCorrections: boolean
  CropLeft: number
  Contrast2012: number
  EnableRedEye: boolean
  Vibrance: number
  PostCropVignetteRoundness: number
  PerspectiveX: number
  GreenHue: number
  Brightness: number
  SplitToningHighlightSaturation: number
  HueAdjustmentYellow: number
  GrainSize: number
  PerspectiveRotate: number
  UprightVersion: number
  SaturationAdjustmentMagenta: number
  ConvertToGrayscale: boolean
  AutoExposure: boolean
  DefringePurpleHueHi: number
  ToneCurveName2012: string
  SplitToningShadowSaturation: number
  LuminanceAdjustmentPurple: number
  ParametricShadows: number
  LuminanceAdjustmentBlue: number
  CropTop: number
  PerspectiveHorizontal: number
  Whites2012: number
  SharpenRadius: number
  ParametricDarks: number
  HueAdjustmentGreen: number
  SplitToningHighlightHue: number
  GreenSaturation: number
  VignetteMidpoint: number
  BlueHue: number
  Blacks2012: number
  CameraProfile: string
  Clarity: number
  HueAdjustmentMagenta: number
  EnablePaintBasedCorrections: boolean
  BlueSaturation: number
  SaturationAdjustmentOrange: number
  SharpenDetail: number
  Highlights2012: number
  ShadowTint: number
  PerspectiveScale: number
  EnableCalibration: boolean
  PerspectiveVertical: number
  PerspectiveUpright: number
  PostCropVignetteStyle: number
  CropBottom: number
  Shadows2012: number
  UprightFocalMode: number
  PerspectiveY: number
}
