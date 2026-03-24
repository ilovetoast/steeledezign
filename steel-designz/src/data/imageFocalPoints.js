/**
 * object-position for portfolio imgs (with object-fit: cover).
 *
 * In dev, vite-imagetools src URLs look like …/@imagetools/<40-char-sha1>.
 * Put positions here keyed by that sha1 (copy from the URL). Production uses
 * /assets/… URLs without that id, so IMAGE_FOCAL_POINTS below covers the same
 * files by Category/filename when the hash isn’t present.
 */
export const IMAGE_FOCAL_BY_IMAGETOOLS_ID = {
  '2975a46dc872bd73fa723d85c1969cc256b46c0a': 'center top',
  '7ba60552493d9a3f7ec7ce98f552c73453ea60a5': 'center top',
  '1cb19eb3633cca7be280bfc71a389e2111849ee7': 'center top',
  '56cb95a1839966d5de2cc14f276f544ea7b0197e': 'center top',
  '060818ef6e129709a67a4d74e9ecd766dd072920': 'center top',
  '11362a9e5805e5e0ebe87bce751b79b4789a5443': 'center top',
  'd97fa06b6037a1e7ba6943e176b76b26aa087b8b': 'center top',
  '779d101b55bf233a918a8efb97de373c5a70ea93': 'center top',
  'c1d1eeea23c6d5f70637eddb6f810e7331d31fc8': 'center top',
  '6874cde1f6df9b20f5dbdfadf9313915ae07eb6b': 'center top',
  'f5078eb6076f31e30519caca67a99fdebba05f5d': 'center top',
  '4bbf133f4164645ed5c0ba63ee0d0c4984239719': 'center top',
  'd5d6e7cd1360d2c61d1b7deb724e96fa65e91532': 'center top',
  'a8989ca0169f0cfc6e434623b7574eaf5deed8a0': 'center top',
  'db0a52fbd23eec5cd4dae4040f10edb3526e6255': 'center top',
  '209e045a6816f3b34baad3d13f1c04a3a59f824e': 'center top',
  '1dab80c19a42b5b976ed779c315081535c1eea10': 'center 30%',
  '525790e26c315c65578af862702370047779194e': 'center top',
  '5d36bb11d55be11ffd0f79844d4b2675ef07c5de': 'center center',
  '74fce5f22eb78523f6d552b7ac664e2683c7dd23': 'center center',
  '7676d29222ded11fddc8c655951c976989f5e872': 'center center',
  'cca420026a4e59c7086341ad0c5a3f0b78cc9eed': 'center top',
  '3a188233e467bca74617fd9ad341c48dda220f96': 'center top',
  '3459bbcb733f4fdd794011bac19c69af2ddd48dc': 'center top',
  '548b646f95e98d16198367cf54e8c8504372a61e': 'center top',
}

/** Used when src has no @imagetools id (e.g. production build). */
export const IMAGE_FOCAL_POINTS = {
  'Wedding/3': 'center 30%',
  'Wedding/4': 'center center',
  'Wedding/5': 'center center',
  'Wedding/6': 'center top',
  'Wedding/7': 'center center',
  'Wedding/8': 'center top',
  'Wedding/9': 'center top',
  'Wedding/image0000001': 'center top',
  'Wedding/IMG_0368': 'center top',
  'Wedding/IMG_0371': 'center top',
  'Beauty/18': 'center top',
  'Beauty/36': 'center top',
  'Beauty/20220928-FIDM-Candiani-0626': 'center top',
  'Beauty/Alanna_086': 'center top',
  'Beauty/Alanna2': 'center top',
  'Beauty/Cory_117': 'center top',
  'Beauty/FIDM Denim 00': 'center top',
  'Beauty/FIDM_2.18.20_Denim3-094': 'center top',
  'Beauty/FIDM_Denim2': 'center top',
  'Beauty/IMG_8883': 'center top',
  'Beauty/JDShoot': 'center top',
  'Beauty/Nick': 'center top',
  'SPFX/chart': 'center top',
  'SPFX/photo (4)': 'center top',
  'Stills/Disney Heros Commercial _ Peter Weber': 'center top',
  'Stills/People Magazine _ Lisa Jane Persky': 'center top',
  'Stills/Reggie Watts Comedy Bang Bang': 'center top',

  'head-shot': 'center top',
  js2: 'top right',
  saraedit: 'right center',
  'MG_3640-e1456544763383': 'center top',
  blue2: 'center 35%',
  balloons: 'center 40%',
}
