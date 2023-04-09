
// !TODO!: Verify signature correctness
const hash = async (string, algorithm = 'SHA-256') => {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest(algorithm, utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
};

export default hash;