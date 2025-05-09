export function getSessionID(): string {
  const cookieName = "session_id";
  const cookies = document.cookie.split("; ").reduce((acc: any, curr) => {
    const [name, value] = curr.split("=");
    acc[name] = value;
    return acc;
  }, {});

  if (cookies[cookieName]) {
    return cookies[cookieName];
  }

  const newId = crypto.randomUUID();
  document.cookie = `${cookieName}=${newId}; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
  return newId;
}
