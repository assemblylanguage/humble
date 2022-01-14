/**
 * This file contains the source code for checking which external dependencies
 * are installed on the platform and providing information to the user when
 * dependencies are missing.
 */
/**
 * Checks if a dependency is installed on the host system and available on the
 * system PATH.
 *
 * @param executable the command line name of the executable program.
 * @returns returns true when the dependency is installed and available on the
 * platform, false otherwise.
 */
export declare function isDependencyInstalled(executable: string): boolean;
/**
 * Checks if Mat2 is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export declare function isMat2Installed(): boolean;
/**
 * Gets the version string of Mat2 if it is installed.
 *
 * @returns the version string of the installed Mat2, or null if it is not
 * installed.
 */
export declare function getMat2Version(): string;
/**
 * Checks if FFMPEG is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export declare function isFfmpegInstalled(): boolean;
/**
 * Checks if ImageMagick is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export declare function isImageMagickInstalled(): boolean;
/**
 * Gets the version string of ImageMagick if it is installed.
 *
 * @returns the version string of the installed ImageMagick, or null if it is
 * not installed.
 */
export declare function getImageMagickVersion(): string;
/**
 * Checks if Pngcrush is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export declare function isPngcrushInstalled(): boolean;
/**
 * Gets the version string of Pngcrush if it is installed.
 *
 * @returns the version string of the installed Pngcrush, or null if it is not
 * installed.
 */
export declare function getPngcrushVersion(): string;
/**
 * Checks if Pngquant is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export declare function isPngquantInstalled(): boolean;
/**
 * Gets the version string of Pngquant if it is installed.
 *
 * @returns the version string of the installed Pngquant, or null if it is not
 * installed.
 */
export declare function getPngquantVersion(): string;
/**
 * Checks if Gifsicle is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export declare function isGifsicleInstalled(): boolean;
/**
 * Gets the version string of Gifsicle if it is installed.
 *
 * @returns the version string of the installed Gifsicle, or null if it is not
 * installed.
 */
export declare function getGifsicleVersion(): string;
/**
 * Checks if Img2Webp is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export declare function isImg2WebpInstalled(): boolean;
/**
 * Gets the version string of Img2Web if it is installed.
 *
 * @returns the version string of the installed Img2Web, or null if it is not
 * installed.
 */
export declare function getImg2WebpVersion(): string;
/**
 * Checks if Gif2Webp is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export declare function isGif2WebpInstalled(): boolean;
/**
 * Gets the version string of Gif2Web if it is installed.
 *
 * @returns the version string of the installed Gif2Web, or null if it is not
 * installed.
 */
export declare function getGif2WebpVersion(): string;
/**
 * Checks if Fonttools is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export declare function isFonttoolsInstalled(): boolean;
/**
 * Checks which optional dependencies are installed, and displays messages to
 * the user if these dependencies are missing or available on the platform.
 */
export declare function checkHumbleDependencies(): void;
//# sourceMappingURL=dependencies.d.ts.map