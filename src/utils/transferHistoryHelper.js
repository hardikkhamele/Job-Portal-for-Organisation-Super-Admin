const STORAGE_KEY = "technohire_candidate_transfer_history";
const NOTIF_KEY = "technohire_notifications";

export const getTransferHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    let history = data ? JSON.parse(data) : [];

    // Fallback: If empty, backfill from notifications that mention transfer
    if ((!history || history.length === 0)) {
      const notifData = localStorage.getItem(NOTIF_KEY);
      if (notifData) {
        try {
          const notifs = JSON.parse(notifData);
          const transferNotifs = notifs.filter((n) =>
            n.title && n.title.toLowerCase().includes("transferred")
          );
          if (transferNotifs.length > 0) {
            history = transferNotifs.map((n, idx) => {
              // Extract count: e.g., "10 candidate(s) transferred to Rahul Sharma (HR Management)..."
              const countMatch = n.message?.match(/(\d+)\s+candidate/i);
              const count = countMatch ? parseInt(countMatch[1], 10) : 1;

              // Extract recipient and module
              let transferredTo = "Assigned Member";
              let destModule = "HR / Employer";
              const toMatch = n.message?.match(/transferred to ([^(]+)\s*\(([^)]+)\)/i);
              if (toMatch) {
                transferredTo = toMatch[1].trim();
                destModule = toMatch[2].trim();
              }

              return {
                id: n.id || `notif-transfer-${idx}`,
                timestamp: n.time || new Date().toISOString(),
                dateTime: n.time || "Recent",
                count: count,
                range: `Candidates (Total ${count})`,
                transferredTo: transferredTo,
                destModule: destModule,
                transferredBy: "Super Admin",
                status: "Success",
              };
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
          }
        } catch (e) {
          console.error("Error backfilling transfer history:", e);
        }
      }
    }

    return Array.isArray(history) ? history : [];
  } catch (err) {
    console.error("Error reading transfer history:", err);
    return [];
  }
};

export const addTransferRecord = (record) => {
  try {
    const history = getTransferHistory();
    const now = new Date();
    const formattedDateTime =
      now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      ", " +
      now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newRecord = {
      id: Date.now().toString(),
      timestamp: now.toISOString(),
      dateTime: formattedDateTime,
      count: record.count || 0,
      range: record.range || `Top ${record.count || 0} Candidates`,
      transferredTo: record.transferredTo || "N/A",
      destModule: record.destModule || "Management",
      transferredBy: record.transferredBy || "Super Admin",
      status: record.status || "Success",
      candidates: Array.isArray(record.candidates) ? record.candidates : [],
    };

    history.unshift(newRecord);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    window.dispatchEvent(new Event("transferHistoryUpdated"));
    return newRecord;
  } catch (err) {
    console.error("Error adding transfer record:", err);
  }
};

export const clearTransferHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("transferHistoryUpdated"));
};
