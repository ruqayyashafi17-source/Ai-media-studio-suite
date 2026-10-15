const MASTER_PASSKEY = "OURA2026";

function toggleAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.toggle('hidden');
  }
}

function verifyPasskey() {
  const inputKey = document.getElementById('passkeyInput').value;
  if (inputKey === MASTER_PASSKEY) {
    localStorage.setItem('oura_portal_auth', 'unlocked');
    updateAuthUI(true);
    toggleAuthModal();
    alert("✓ Passkey Authenticated Successfully! System unlocked.");
  } else {
    alert("❌ Incorrect Passkey! Access Denied.");
  }
}

function updateAuthUI(isUnlocked) {
  const badge = document.getElementById('statusBadge');
  const dot = document.getElementById('dotIndicator');
  const label = document.getElementById('statusText');
  const btn = document.getElementById('authBtn');

  if (isUnlocked) {
    if (badge) badge.className = "flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full";
    if (dot) dot.className = "w-2 h-2 rounded-full bg-emerald-500";
    if (label) {
      label.className = "text-xs font-semibold text-emerald-400";
      label.innerText = "System Unlocked";
    }
    if (btn) {
      btn.innerText = "Lock System Access";
      btn.onclick = function() {
        localStorage.removeItem('oura_portal_auth');
        updateAuthUI(false);
      };
    }
  } else {
    if (badge) badge.className = "flex items-center space-x-2 px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full";
    if (dot) dot.className = "w-2 h-2 rounded-full bg-red-500 animate-pulse";
    if (label) {
      label.className = "text-xs font-semibold text-red-400";
      label.innerText = "System Locked";
    }
    if (btn) {
      btn.innerText = "Unlock Portal Access";
      btn.onclick = toggleAuthModal;
    }
  }
}

// Check saved authentication state on load
window.onload = function() {
  const savedAuth = localStorage.getItem('oura_portal_auth');
  if (savedAuth === 'unlocked') {
    updateAuthUI(true);
  }
};
