"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function AdminDashboard() {
  const [updates, setUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const fetchUpdates = async () => {
    try {
      const res = await fetch("/api/admin/updates");
      const data = await res.json();
      setUpdates(data.updates || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates();
  }, []);

  const handleSyncGithub = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/updates/sync-github", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        alert(`Synced successfully! ${data.newUpdatesCount} new updates found.`);
        fetchUpdates();
      } else {
        alert("Failed to sync");
      }
    } catch (e) {
      alert("Error syncing");
    } finally {
      setSyncing(false);
    }
  };

  const handleToggleHide = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/updates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHidden: !currentStatus }),
      });
      if (res.ok) fetchUpdates();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this update?")) return;
    try {
      const res = await fetch(`/api/updates/${id}`, { method: "DELETE" });
      if (res.ok) fetchUpdates();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const res = await fetch(`/api/updates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: editContent }),
      });
      if (res.ok) {
        setEditingId(null);
        fetchUpdates();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8 pt-24">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-display font-bold text-white">Updates Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage your GitHub and LinkedIn updates</p>
          </div>
          <button
            onClick={handleSyncGithub}
            disabled={syncing}
            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            {syncing ? "Syncing..." : "Sync GitHub"}
          </button>
        </div>

        {loading ? (
          <p className="text-white">Loading updates...</p>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-sm">
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Content</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {updates.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-gray-400">
                      No updates found. Try syncing GitHub.
                    </td>
                  </tr>
                ) : (
                  updates.map((update) => (
                    <tr key={update._id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${update.type === 'github' ? 'bg-gray-800 text-gray-200' : 'bg-blue-900/50 text-blue-200'}`}>
                          {update.type}
                        </span>
                      </td>
                      <td className="p-4 max-w-md">
                        {editingId === update._id ? (
                          <div className="flex gap-2">
                            <textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="w-full bg-background border border-white/20 rounded p-2 text-white text-sm"
                            />
                            <button onClick={() => handleSaveEdit(update._id)} className="text-green-400 text-sm">Save</button>
                            <button onClick={() => setEditingId(null)} className="text-gray-400 text-sm">Cancel</button>
                          </div>
                        ) : (
                          <a href={update.url} target="_blank" className="text-white hover:text-primary block truncate">
                            {update.content}
                          </a>
                        )}
                      </td>
                      <td className="p-4 text-gray-400 text-sm">
                        {format(new Date(update.postedAt), "MMM d, yyyy")}
                      </td>
                      <td className="p-4">
                        <span className={`text-xs ${update.isHidden ? 'text-red-400' : 'text-green-400'}`}>
                          {update.isHidden ? 'Hidden' : 'Visible'}
                        </span>
                      </td>
                      <td className="p-4 flex gap-3 justify-end">
                        <button
                          onClick={() => {
                            setEditingId(update._id);
                            setEditContent(update.content);
                          }}
                          className="text-sm text-gray-400 hover:text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleToggleHide(update._id, update.isHidden)}
                          className="text-sm text-gray-400 hover:text-white"
                        >
                          {update.isHidden ? 'Show' : 'Hide'}
                        </button>
                        <button
                          onClick={() => handleDelete(update._id)}
                          className="text-sm text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
