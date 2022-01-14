/**
 * This file contains the source code for checking which external dependencies
 * are installed on the platform and providing information to the user when
 * dependencies are missing.
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */

import * as childProcess from 'child_process';
import { SpawnSyncReturns } from 'child_process';
import { logger } from './logger';

/**
 * Checks if a dependency is installed on the host system and available on the
 * system PATH.
 *
 * @param executable the command line name of the executable program.
 * @returns returns true when the dependency is installed and available on the
 * platform, false otherwise.
 */
export function isDependencyInstalled(
  executable: string,
) : boolean {
  switch (process.platform) {
    case 'win32': {
      return childProcess
        .spawnSync('where', [executable])
        .status === 0;
    }

    case 'darwin': {
      return childProcess
        .spawnSync('which', [executable])
        .status === 0;
    }

    case 'linux': {
      return childProcess
        .spawnSync('which', [executable])
        .status === 0;
    }

    case 'freebsd': {
      return childProcess
        .spawnSync('whereis', [executable])
        .status === 0;
    }

    case 'openbsd': {
      return childProcess
        .spawnSync('which', [executable])
        .status === 0;
    }

    // @ts-ignore
    case 'haiku': {
      return childProcess
        .spawnSync('which', [executable])
        .status === 0;
    }

    default: {
      return childProcess
        .spawnSync('which', [executable])
        .status === 0;
    }
  }
}

/**
 * Checks if Mat2 is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export function isMat2Installed() : boolean {
  return isDependencyInstalled('mat2');
}

/**
 * Gets the version string of Mat2 if it is installed.
 *
 * @returns the version string of the installed Mat2, or null if it is not
 * installed.
 */
export function getMat2Version() : string {
  // Running Mat2 with the version flag.
  const mat2Process: SpawnSyncReturns<string> = childProcess.spawnSync(
    'mat2',
    ['-v'],
  );

  // If the Mat2 process was successful, parsing out the version number from
  // the process STDOUT.
  if (mat2Process.status === 0) {
    const mat2VersionString: string = mat2Process
      .stdout
      .toString()
      .trim()
      .split(' ')[1];

    return mat2VersionString;
  }

  return null;
}

/**
 * Checks if FFMPEG is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export function isFfmpegInstalled() : boolean {
  return isDependencyInstalled('ffmpeg');
}

/**
 * Checks if ImageMagick is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export function isImageMagickInstalled() : boolean {
  return isDependencyInstalled('convert');
}

/**
 * Gets the version string of ImageMagick if it is installed.
 *
 * @returns the version string of the installed ImageMagick, or null if it is
 * not installed.
 */
export function getImageMagickVersion() : string {
  // Running ImageMagick with the version flag.
  const imageMagickProcess: SpawnSyncReturns<string> = childProcess.spawnSync(
    'convert',
    ['-version'],
  );

  // If the ImageMagick process was successful, parsing out the version number
  // from the process STDOUT.
  if (imageMagickProcess.status === 0) {
    const imageMagickVersionString: string = imageMagickProcess
      .stdout
      .toString()
      .trim()
      .split('\n')[0]
      .split('Version: ImageMagick ')[1]
      .split(' ')[0]
      .trim();

    return imageMagickVersionString;
  }

  return null;
}

/**
 * Checks if Pngcrush is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export function isPngcrushInstalled() : boolean {
  return isDependencyInstalled('pngcrush');
}

/**
 * Gets the version string of Pngcrush if it is installed.
 *
 * @returns the version string of the installed Pngcrush, or null if it is not
 * installed.
 */
export function getPngcrushVersion() : string {
  // Running Pngcrush with the version flag.
  const pngcrushProcess: SpawnSyncReturns<string> = childProcess.spawnSync(
    'pngcrush',
    ['-version'],
  );

  // If the Pngcrush process was successful, parsing out the version number
  // from the process STDOUT.
  if (pngcrushProcess.status === 0) {
    const pngcrushVersionString: string = pngcrushProcess
      .stdout
      .toString()
      .trim()
      .split('pngcrush')[1]
      .split(',')[0]
      .trim();

    return pngcrushVersionString;
  }

  return null;
}

/**
 * Checks if Pngquant is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export function isPngquantInstalled() : boolean {
  return isDependencyInstalled('pngquant');
}

/**
 * Gets the version string of Pngquant if it is installed.
 *
 * @returns the version string of the installed Pngquant, or null if it is not
 * installed.
 */
export function getPngquantVersion() : string {
  // Running Pngquant with the version flag.
  const pngquantProcess: SpawnSyncReturns<string> = childProcess.spawnSync(
    'pngquant',
    ['-version'],
  );

  // If the Pngquant process was successful, parsing out the version number
  // from the process STDOUT.
  if (pngquantProcess.status === 0) {
    const pngquantVersionString: string = pngquantProcess
      .stdout
      .toString()
      .match(/([0-9][.]){3}/gm)[0];

    return pngquantVersionString;
  }

  return null;
}

/**
 * Checks if Gifsicle is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export function isGifsicleInstalled() : boolean {
  return isDependencyInstalled('gifsicle');
}

/**
 * Gets the version string of Gifsicle if it is installed.
 *
 * @returns the version string of the installed Gifsicle, or null if it is not
 * installed.
 */
export function getGifsicleVersion() : string {
  // Running Gifsicle with the version flag.
  const gifsicleProcess: SpawnSyncReturns<string> = childProcess.spawnSync(
    'gifsicle',
    ['--version'],
  );

  // If the Gifsicle process was successful, parsing out the version number
  // from the process STDOUT.
  if (gifsicleProcess.status === 0) {
    const gifsicleVersionString: string = gifsicleProcess
      .stdout
      .toString()
      .match(/[0-9][.][0-9]{1,2}/gm)[0];

    return gifsicleVersionString;
  }

  return null;
}

/**
 * Checks if Img2Webp is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export function isImg2WebpInstalled() : boolean {
  return isDependencyInstalled('img2webp');
}

/**
 * Gets the version string of Img2Web if it is installed.
 *
 * @returns the version string of the installed Img2Web, or null if it is not
 * installed.
 */
export function getImg2WebpVersion() : string {
  // Running Img2Webp with the version flag.
  const img2WebpProcess: SpawnSyncReturns<string> = childProcess.spawnSync(
    'img2webp',
    ['-version'],
  );

  // If the Img2Webp process was successful, parsing out the version number
  // from the process STDOUT.
  if (img2WebpProcess.status === 0) {
    const img2WebpVersionString: string = img2WebpProcess
      .stdout
      .toString()
      .trim()
      .split('version: ')[1]
      .split('\n')[0];

    return img2WebpVersionString;
  }

  return null;
}

/**
 * Checks if Gif2Webp is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export function isGif2WebpInstalled() : boolean {
  return isDependencyInstalled('gif2webp');
}

/**
 * Gets the version string of Gif2Web if it is installed.
 *
 * @returns the version string of the installed Gif2Web, or null if it is not
 * installed.
 */
export function getGif2WebpVersion() : string {
  // Running Gif2Webp with the version flag.
  const gif2WebpProcess: SpawnSyncReturns<string> = childProcess.spawnSync(
    'gif2webp',
    ['-version'],
  );

  // If the Gif2Webp process was successful, parsing out the version number
  // from the process STDOUT.
  if (gif2WebpProcess.status === 0) {
    const gif2WebpVersionString: string = gif2WebpProcess
      .stdout
      .toString()
      .trim()
      .split('version: ')[1]
      .split('\n')[0];

    return gif2WebpVersionString;
  }

  return null;
}

/**
 * Checks if Fonttools is installed and is found on the PATH.
 *
 * @returns return true if installed, false otherwise.
 */
export function isFonttoolsInstalled() : boolean {
  return isDependencyInstalled('fonttools');
}

/**
 * Checks which optional dependencies are installed, and displays messages to
 * the user if these dependencies are missing or available on the platform.
 */
export function checkHumbleDependencies() : void {
  // Logging info to the console to let the user know the dependency check is
  // in progress.
  logger.log(
    'info',
    'Checking Humble dependencies.',
  );

  // Checking if MAT2 is installed, and logging the status of the dependency.
  if (!isMat2Installed()) {
    logger.log(
      'warn',
      'Mat2 is not installed, skipping Mat2 functions.',
      { depth: 1 },
    );
  } else {
    logger.log(
      'ok',
      'Mat2 is installed, Mat2 functions are available.',
      { depth: 1 },
    );
  }

  // Checking if FFMPEG is installed, and logging the status of the
  // dependency.
  if (!isFfmpegInstalled()) {
    logger.log(
      'warn',
      'FFMPEG is not installed, skipping FFMPEG functions',
      { depth: 1 },
    );
  } else {
    logger.log(
      'ok',
      'FFMPEG is installed, FFMPEG functions are available.',
      { depth: 1 },
    );
  }

  // Checking if ImageMagick is installed, and logging the status of the
  // dependency.
  if (!isImageMagickInstalled()) {
    logger.log(
      'warn',
      'ImageMagick is not installed, skipping ImageMagick functions.',
      { depth: 1 },
    );
  } else {
    logger.log(
      'ok',
      'ImageMagick is installed, ImageMagick functions are available.',
      { depth: 1 },
    );
  }

  // Checking if Pngcrush is installed, and logging the status of the
  // dependency.
  if (!isPngcrushInstalled()) {
    logger.log(
      'warn',
      'Pngcrush is not installed, skipping Pngcrush functions.',
      { depth: 1 },
    );
  } else {
    logger.log(
      'ok',
      'Pngcrush is installed, Pngcrush functions are available.',
      { depth: 1 },
    );
  }

  // Checking if Pngquant is installed, and logging the status of the
  // dependency.
  if (!isPngquantInstalled()) {
    logger.log(
      'warn',
      'Pngquant is not installed, skipping Pngquant functions.',
      { depth: 1 },
    );
  } else {
    logger.log(
      'ok',
      'Pngquant is installed, Pngquant functions are available.',
      { depth: 1 },
    );
  }

  // Checking if Gifsicle is installed, and logging the status of the
  // dependency.
  if (!isGifsicleInstalled()) {
    logger.log(
      'warn',
      'Gifsicle is not installed, skipping Gifsicle functions.',
      { depth: 1 },
    );
  } else {
    logger.log(
      'ok',
      'Gifsicle is installed, Gifsicle functions are available.',
      { depth: 1 },
    );
  }

  // Checking if Img2Webp is installed, and logging the status of the
  // dependency.
  if (!isImg2WebpInstalled()) {
    logger.log(
      'warn',
      'Img2Webp is not installed, skipping Img2Webp functions.',
      { depth: 1 },
    );
  } else {
    logger.log(
      'ok',
      'Img2Webp is installed, Img2Webp functions are available.',
      { depth: 1 },
    );
  }

  // Checking if Gif2Webp is installed, and logging the status of the
  // dependency.
  if (!isGif2WebpInstalled()) {
    logger.log(
      'warn',
      'Gif2Webp is not installed, skipping Gif2Webp functions.',
      { depth: 1 },
    );
  } else {
    logger.log(
      'ok',
      'Gif2Webp is installed, Gif2Webp functions are available.',
      { depth: 1 },
    );
  }
}
