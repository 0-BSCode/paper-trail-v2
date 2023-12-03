/**
 * Creates a deterministic number (from 0 to `maxIndex`) based on a string argument.
 *
 * @param str The string to hash
 * @param maxIndex The upper bound of the result, inclusive
 */
function hashStringToNumber(str: string, maxIndex: number): number {
  const EMAIL_ASCII_VALUE = Array.from(str).reduce((total, cur) => total + cur.charCodeAt(0), 0);
  const SALT = 7;
  const HASH_VALUE = EMAIL_ASCII_VALUE * 31 * SALT;
  return HASH_VALUE % (maxIndex + 1);
}

/**
 * Returns a deterministic image URL based on a user's email for profile picture placeholders.
 *
 * @param email the email of the user
 */
export default function getAvatarImageUrlByEmail(email: string): string {
  const IMAGE_ID_UPPER_BOUND = 70;
  const HASH_VALUE = hashStringToNumber(email, IMAGE_ID_UPPER_BOUND);
  const GENDER = HASH_VALUE % 2 === 0 ? 'men' : 'women';
  return `https://randomuser.me/api/portraits/${GENDER}/${HASH_VALUE}.jpg`;
}
