import { execSync } from 'child_process';

let cachedHWID: string | null | undefined;

function tryExec(command: string): string | null {
  try {
    const out = execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).toString();
    const trimmed = out.trim();
    return trimmed || null;
  } catch (_e) {
    return null;
  }
}

/**
 * Get Hardware ID (HWID) from the system
 * - Supports override via env: HWID or MACHINE_HWID
 * - Tries multiple strategies per OS
 * - Caches result for process lifetime
 */
export const getHWID = (): string | null => {
  if (cachedHWID !== undefined) return cachedHWID;

  // 1) Env override
  const envHWID = process.env.HWID || process.env.MACHINE_HWID || null;
  if (envHWID) {
    cachedHWID = envHWID;
    return cachedHWID;
  }

  let hwid: string | null = null;

  // 2) OS-specific strategies
  try {
    if (process.platform === 'win32') {
      // Newer Windows: use PowerShell CIM
      hwid = tryExec('powershell -NoProfile -Command "(Get-CimInstance Win32_Processor).ProcessorId"');
      if (!hwid) {
        // Fallback to WMIC
        const out = tryExec('wmic cpu get ProcessorId');
        if (out) {
          const lines = out
            .split('\n')
            .map((l) => l.trim())
            .filter((l) => l && !/ProcessorId/i.test(l));
          hwid = lines[0] ?? null;
        }
      }
    } else if (process.platform === 'linux') {
      // Try standard machine-id locations
      hwid = tryExec('cat /etc/machine-id') || tryExec('cat /var/lib/dbus/machine-id');
    } else if (process.platform === 'darwin') {
      const out = tryExec('ioreg -rd1 -c IOPlatformExpertDevice');
      if (out) {
        const match = out.match(/"IOPlatformUUID"\s*=\s*"([^"]+)"/);
        hwid = match ? match[1] : null;
      }
    }
  } catch (_e) {
    console.error('Failed to retrieve HWID:', _e);
  }

  // 3) Normalize and cache
  if (hwid) {
    const normalized = hwid.replace(/[^0-9A-Fa-f-]/g, '').toUpperCase();
    cachedHWID = normalized || null;
  } else {
    cachedHWID = null;
  }
  return cachedHWID;
};
