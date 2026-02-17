/**
 * Black Atom Obsidian Theme — Build Script
 *
 * Assembles theme.css from:
 * 1. Style Settings YAML (variants + UI settings)
 * 2. Generated per-theme CSS files
 * 3. Static UI CSS files
 */

import { config } from "./config.ts";

async function run(cmd: string[]): Promise<void> {
    const command = new Deno.Command(cmd[0], {
        args: cmd.slice(1),
        stdout: "inherit",
        stderr: "inherit",
    });
    const { code } = await command.output();
    if (code !== 0) {
        throw new Error(`Command failed: ${cmd.join(" ")}`);
    }
}

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

async function build(): Promise<void> {
    console.log("Building Black Atom Obsidian theme...");

    // Step 1: Generate per-theme CSS from templates
    console.log("Generating theme tokens...");
    await run(["black-atom-core", "generate"]);

    const parts: string[] = [];

    // Step 2: Variants settings block
    console.log("Assembling settings...");
    const variantsYaml = await Deno.readTextFile(
        `${config.paths.styles}/variants.settings.yaml`,
    );
    parts.push(buildVariantsSettingsBlock(variantsYaml));

    // Step 3: UI settings block (assembled from sidecars)
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

    // Step 4: Generated theme CSS
    console.log("Assembling theme CSS...");
    const themeFiles = (await collectFiles(config.paths.themes, ".css"))
        .filter((f) => !f.includes(".template."));
    for (const file of themeFiles) {
        const content = await Deno.readTextFile(file);
        parts.push(content.trimEnd());
    }

    // Step 5: UI CSS
    const uiCssFiles = (await collectFiles(config.paths.ui, ".css"))
        .filter((f) => !f.endsWith(".settings.yaml"));
    for (const file of uiCssFiles) {
        const content = await Deno.readTextFile(file);
        parts.push(content.trimEnd());
    }

    // Write output
    await Deno.writeTextFile(config.paths.output, parts.join("\n\n") + "\n");
    console.log(`Build complete: ${config.paths.output}`);

    // Format generated files
    console.log("Formatting...");
    await run(["deno", "fmt", "."]);
}

build();
