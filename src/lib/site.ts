export const siteLinks = {
  github: "https://github.com/alessandromalacarne/mido",
  wiki: "https://github.com/alessandromalacarne/mido/wiki",
  releases: "https://github.com/alessandromalacarne/mido/releases",
  latestRelease:
    "https://github.com/alessandromalacarne/mido/releases/tag/v0.5.0",
  changelog:
    "https://github.com/alessandromalacarne/mido/blob/master/CHANGELOG.md",
  license:
    "https://github.com/alessandromalacarne/mido/blob/master/LICENSE",
  crates: "https://crates.io/crates/mido-guard",
  installScript:
    "https://github.com/alessandromalacarne/mido/releases/latest/download/install.sh",
} as const;

export const installCommand = `curl -fsSL ${siteLinks.installScript} | sh`;

export const version = "0.5.0";
