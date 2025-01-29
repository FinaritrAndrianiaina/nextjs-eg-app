/**
 * Bumps the semantic version.
 * @param version - The current version string.
 * @param release - The type of release: 'major', 'minor', 'patch', or 'prerelease'.
 * @param flag - The pre-release flag: 'alpha', 'beta', 'rc', etc.
 * @returns The bumped version string.
 */
export function bumpVersion(
  version: string,
  release: "major" | "minor" | "patch" | "prerelease",
  flag?: string | undefined
): string {
  const [major, minor, patch, preRelease] = version
    .split(/[-.]/)
    .map((part, index) => (index < 3 ? Number(part) : part));

  const versionRegex = /^\d+\.\d+\.\d+(-[a-z]+\.\d+)?$/;
  if (!versionRegex.test(version)) {
    throw new Error("Invalid version format");
  }

  switch (release) {
    case "major":
      return `${+major + 1}.0.0`;
    case "minor":
      return `${major}.${+minor + 1}.0`;
    case "patch":
      return `${major}.${minor}.${+patch + 1}`;
    case "prerelease":
      if (!flag) {
        throw new Error("Flag is required for prerelease");
      }
      let preReleaseIdentifier = 0;
      if (typeof preRelease === "string" && preRelease.startsWith(flag)) {
        const parts = preRelease.split(".");
        preReleaseIdentifier = parts.length > 1 ? Number(parts[1]) + 1 : 1;
      } else {
        preReleaseIdentifier = 1;
      }
      return `${major}.${minor}.${patch}-${flag}.${preReleaseIdentifier}`;
    default:
      throw new Error("Invalid release type");
  }
}

/**
 * Checks if the given version is a prerelease.
 * @param version - The version string to check.
 * @returns True if the version is a prerelease, false otherwise.
 */
export function isPrerelease(version: string): boolean {
  const preReleaseRegex = /^\d+\.\d+\.\d+-[a-z]+\.\d+$/;
  return preReleaseRegex.test(version);
}
