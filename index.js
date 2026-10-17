// Secure SHA-256 Hash Verification (Password Code Me Naked Nahi Hoga)
async function hashPasskey(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPasskey() {
  const inputPass = document.getElementById("passkeyInput").value;
  // SHA-256 Hash of 'OURA2026'
  const targetHash = "8f82a939462d1c01e9a2f7c0a911e3b563dbb46e382d6c342f022791e813958e"; 

  const userHash = await hashPasskey(inputPass);

  if (userHash === targetHash) {
    sessionStorage.setItem("oura_auth", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Access Denied: Invalid Security Passkey.");
  }
}
