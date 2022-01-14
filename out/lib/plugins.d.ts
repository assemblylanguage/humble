/**
 * Contains all of the base wrapper plugins available by default in Humble,
 * as well as plugin builders for building pipelines of plugins at various
 * stages of the archiving process.
 */
import { Humble } from './humble';
import { HumblePlugin } from './options/humble-options';
/**
 * Builds a pipeline of plugins that will run during the
 * `PreCssInlineRemovals` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
export declare function buildAfterInitialFetchPluginPipeline(humble: Humble): HumblePlugin[];
/**
 * Builds a pipeline of plugins that will run during the
 * `PreCssInlineRemovals` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
export declare function buildPreCssInlineRemovalsPluginPipeline(humble: Humble): HumblePlugin[];
/**
 * Builds a pipeline of plugins that will run during the
 * `PostCssInlineRemovals` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
export declare function buildPostCssInlineRemovalsPluginPipeline(humble: Humble): HumblePlugin[];
/**
 * Builds a pipeline of plugins that will run during the
 * `ResourceModifications` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
export declare function buildResourceModificationsPluginPipeline(humble: Humble): HumblePlugin[];
/**
 * Builds a pipeline of plugins that will run during the
 * `FinalInlineModifications` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
export declare function buildFinalInlineModificationsPluginPipeline(humble: Humble): HumblePlugin[];
/**
 * Builds a pipeline of plugins that will run during the
 * `FinalDocumentCreation` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
export declare function buildFinalDocumentCreationPluginPipeline(humble: Humble): HumblePlugin[];
/**
 * Builds a pipeline of plugins that will run during the
 * `FinalHtmlCreation` stage of the archiving process.
 *
 * @param humble a Humble object.
 */
export declare function buildFinalHtmlCreationPluginPipeline(humble: Humble): HumblePlugin[];
//# sourceMappingURL=plugins.d.ts.map