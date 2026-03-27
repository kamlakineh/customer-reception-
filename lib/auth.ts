import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Hashes a plain text password.
 * @param password The plain text password to hash.
 * @returns The hashed password.
 */
export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync(password, salt);
}

/**
 * Compares a plain text password with a hashed password.
 * @param password The plain text password.
 * @param hash The hashed password.
 * @returns True if the passwords match, false otherwise.
 */
export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

/**
 * Gets the default admin password from environment variables or a fallback.
 * @returns The default admin password.
 */
export function getDefaultAdminPassword(): string {
  return process.env.DEFAULT_ADMIN_PASSWORD || "12345678";
}
