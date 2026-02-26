/**
 * Black Atom Obsidian Theme — Post-Generate Assembly
 *
 * Assembles theme.css from:
 * 1. Style Settings YAML (variants + UI settings)
 * 2. Generated per-theme CSS files
 * 3. Static UI CSS files
 *
 * Called automatically by core's adapters:dev after generation,
 * or manually via `deno task postGenerate`.
 */

import { config } from "./config.ts";

async function collectFiles(
  dir: string,
  ext: string,
): Promise<string[]> {
  const files: string[] = [];
  for await (const entry of Deno.readDir(dir)) {
    if (entry.isFile && entry.name.endsWith(ext)) {
      files.push(`${dir}/${entry.name}`);
    }
  }
  return files.sort();
}

function buildVariantsSettingsBlock(yaml: string): string {
  return `/* @settings\n${yaml}*/\n`;
}

function buildUiSettingsBlock(fragments: string[]): string {
  const { name, id } = config.styleSettingsSections.ui;
  const header = `/* @settings\nname: "${name}"\nid: ${id}\nsettings:\n`;
  const body = fragments.join("\n");
  return `${header}${body}\n*/\n`;
}

async function postGenerate(): Promise<void> {
  console.log("Assembling theme.css...");

  const parts: string[] = [];

  // Variants settings block
  const variantsYaml = await Deno.readTextFile(
    `${config.paths.styles}/variants.settings.yaml`,
  );
  parts.push(buildVariantsSettingsBlock(variantsYaml));

  // UI settings block (assembled from sidecars)
  const settingsFiles = await collectFiles(
    config.paths.ui,
    ".settings.yaml",
  );
  const fragments: string[] = [];
  for (const file of settingsFiles) {
    const content = await Deno.readTextFile(file);
    fragments.push(content.trimEnd());
  }
  if (fragments.length > 0) {
    parts.push(buildUiSettingsBlock(fragments));
  }

  // Generated theme CSS
  const themeFiles = (await collectFiles(config.paths.themes, ".css"))
    .filter((f) => !f.includes(".template."));
  for (const file of themeFiles) {
    const content = await Deno.readTextFile(file);
    parts.push(content.trimEnd());
  }

  // UI CSS
  const uiCssFiles = (await collectFiles(config.paths.ui, ".css"))
    .filter((f) => !f.endsWith(".settings.yaml"));
  for (const file of uiCssFiles) {
    const content = await Deno.readTextFile(file);
    parts.push(content.trimEnd());
  }

  // Write output
  await Deno.writeTextFile(config.paths.output, parts.join("\n\n") + "\n");
  console.log(`Assembly complete: ${config.paths.output}`);
}

postGenerate();
