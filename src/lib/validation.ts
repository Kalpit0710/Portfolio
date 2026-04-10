export function isValidEmail(email: string) {
  if (email.length > 254 || email.includes(" ")) {
    return false;
  }

  const atIndex = email.indexOf("@");
  const lastAtIndex = email.lastIndexOf("@");

  if (atIndex <= 0 || atIndex !== lastAtIndex) {
    return false;
  }

  const localPart = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (!localPart || !domain || domain.startsWith(".") || domain.endsWith(".")) {
    return false;
  }

  return domain.includes(".");
}
