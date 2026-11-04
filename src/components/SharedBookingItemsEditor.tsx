import { useEffect, useMemo, useRef, useState } from "react";
import {
  coerceNum,
  fetchSharedPackersItemCatalog,
  SharedItemsUpdateError,
  updateSharedPackersBookingItems,
  type SharedItemCatalogCategory,
  type SharedItemLine,
  type UpdateSharedItemsResponse,
} from "@/lib/sharedBookingApi";

const MAX_QTY = 99;

function toLines(items: Array<Record<string, unknown>>): SharedItemLine[] {
  const merged = new Map<string, number>();
  for (const item of items) {
    const name = String(item.itemName || item.name || "").trim();
    const qty = Math.round(coerceNum(item.quantity));
    if (!name || qty <= 0) continue;
    merged.set(name, (merged.get(name) ?? 0) + qty);
  }
  return Array.from(merged, ([itemName, quantity]) => ({ itemName, quantity }));
}

function sameLines(a: SharedItemLine[], b: SharedItemLine[]): boolean {
  if (a.length !== b.length) return false;
  const m = new Map(a.map((l) => [l.itemName, l.quantity]));
  return b.every((l) => m.get(l.itemName) === l.quantity);
}

function QtyStepper({
  qty,
  onChange,
  disabled,
}: {
  qty: number;
  onChange: (q: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(qty - 1)}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-lg font-bold text-slate-700 disabled:opacity-40"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-7 text-center text-sm font-semibold text-slate-900">{qty}</span>
      <button
        type="button"
        disabled={disabled || qty >= MAX_QTY}
        onClick={() => onChange(qty + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-lg font-bold text-slate-700 disabled:opacity-40"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default function SharedBookingItemsEditor({
  token,
  items,
  disabled,
  onEditingChange,
  onPreview,
  onSaved,
}: {
  token: string;
  items: Array<Record<string, unknown>>;
  disabled?: boolean;
  onEditingChange: (editing: boolean) => void;
  onPreview: (preview: UpdateSharedItemsResponse | null) => void;
  onSaved: (saved: UpdateSharedItemsResponse) => void;
}) {
  const original = useMemo(() => toLines(items), [items]);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<SharedItemLine[]>(original);
  const [catalog, setCatalog] = useState<SharedItemCatalogCategory[] | null>(null);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(0);
  const [previewing, setPreviewing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [supportPhone, setSupportPhone] = useState<string | null>(null);
  const [switchPrompt, setSwitchPrompt] = useState<string | null>(null);
  const [packingNote, setPackingNote] = useState(false);
  const requestId = useRef(0);

  useEffect(() => {
    if (!editing) setDraft(original);
  }, [original, editing]);

  const dirty = editing && !sameLines(draft, original);

  // Live price preview while editing.
  useEffect(() => {
    if (!editing) return;
    const id = ++requestId.current;
    setMessage(null);
    setSupportPhone(null);
    if (!dirty) {
      setPreviewing(false);
      setPackingNote(false);
      onPreview(null);
      return;
    }
    if (draft.length === 0) {
      setPreviewing(false);
      setPackingNote(false);
      onPreview(null);
      setMessage("Add at least one item.");
      return;
    }
    setPreviewing(true);
    const t = setTimeout(() => {
      updateSharedPackersBookingItems({
        token,
        items: draft,
        dryRun: true,
        acceptStandardPacking: true,
      })
        .then((res) => {
          if (id !== requestId.current) return;
          setPackingNote(res.packingSwitched);
          onPreview(res);
        })
        .catch((e: unknown) => {
          if (id !== requestId.current) return;
          onPreview(null);
          setPackingNote(false);
          setMessage(e instanceof Error ? e.message : "Could not calculate the price.");
          if (e instanceof SharedItemsUpdateError && e.supportPhone) {
            setSupportPhone(e.supportPhone);
          }
        })
        .finally(() => {
          if (id === requestId.current) setPreviewing(false);
        });
    }, 500);
    return () => clearTimeout(t);
    // onPreview is a stable setter from the parent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft, editing, dirty, token]);

  const startEditing = () => {
    setDraft(original);
    setEditing(true);
    onEditingChange(true);
  };

  const cancelEditing = () => {
    requestId.current += 1;
    setEditing(false);
    setPickerOpen(false);
    setDraft(original);
    setMessage(null);
    setSupportPhone(null);
    setSwitchPrompt(null);
    setPackingNote(false);
    setPreviewing(false);
    onPreview(null);
    onEditingChange(false);
  };

  const openPicker = () => {
    setPickerOpen(true);
    if (catalog || catalogError) return;
    fetchSharedPackersItemCatalog(token)
      .then(setCatalog)
      .catch((e: unknown) =>
        setCatalogError(e instanceof Error ? e.message : "Failed to load items"),
      );
  };

  const setQty = (itemName: string, qty: number) => {
    const q = Math.max(0, Math.min(MAX_QTY, qty));
    setDraft((prev) => {
      const exists = prev.some((l) => l.itemName === itemName);
      if (q === 0) return prev.filter((l) => l.itemName !== itemName);
      if (exists) {
        return prev.map((l) => (l.itemName === itemName ? { ...l, quantity: q } : l));
      }
      return [...prev, { itemName, quantity: q }];
    });
  };

  const qtyOf = (itemName: string) =>
    draft.find((l) => l.itemName === itemName)?.quantity ?? 0;

  const save = async (acceptStandardPacking: boolean) => {
    if (!dirty || draft.length === 0) return;
    requestId.current += 1;
    setSaving(true);
    setMessage(null);
    setSupportPhone(null);
    try {
      const res = await updateSharedPackersBookingItems({
        token,
        items: draft,
        acceptStandardPacking,
      });
      setSwitchPrompt(null);
      setEditing(false);
      setPickerOpen(false);
      setPackingNote(false);
      onSaved(res);
      onEditingChange(false);
    } catch (e) {
      if (e instanceof SharedItemsUpdateError && e.code === "part_load_unavailable") {
        setSwitchPrompt(e.message);
      } else {
        setMessage(e instanceof Error ? e.message : "Failed to update items");
        if (e instanceof SharedItemsUpdateError && e.supportPhone) {
          setSupportPhone(e.supportPhone);
        }
      }
    } finally {
      setSaving(false);
    }
  };

  const filtered = useMemo(() => {
    if (!catalog) return [];
    const q = query.trim().toLowerCase();
    if (!q) {
      const main = catalog[activeCategory];
      return main
        ? main.subCategories.map((s) => ({ main: main.name, sub: s.name, items: s.items }))
        : [];
    }
    const out: Array<{ main: string; sub: string; items: Array<{ name: string }> }> = [];
    for (const main of catalog) {
      for (const sub of main.subCategories) {
        const subMatch = sub.name.toLowerCase().includes(q);
        const list = subMatch
          ? sub.items
          : sub.items.filter((i) => i.name.toLowerCase().includes(q));
        if (list.length > 0) out.push({ main: main.name, sub: sub.name, items: list });
      }
    }
    return out;
  }, [catalog, query, activeCategory]);

  if (!editing) {
    return (
      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Inventory / Items
          </h2>
          <button
            type="button"
            disabled={disabled}
            onClick={startEditing}
            className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-50 disabled:opacity-50"
          >
            Edit items
          </button>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          {original.length === 0 ? (
            <p className="text-sm text-slate-500">No items added.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {original.map((l) => (
                <li key={l.itemName} className="flex justify-between gap-3 py-2 text-sm">
                  <span className="text-slate-800">{l.itemName}</span>
                  <span className="font-medium text-slate-600">× {l.quantity}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-6">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
        Edit items
      </h2>
      <div className="rounded-xl border border-blue-200 bg-white p-4 shadow-sm">
        {draft.length === 0 ? (
          <p className="py-2 text-sm text-slate-500">No items. Add items below.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {draft.map((l) => (
              <li key={l.itemName} className="flex items-center justify-between gap-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">{l.itemName}</p>
                  <button
                    type="button"
                    onClick={() => setQty(l.itemName, 0)}
                    className="text-xs font-semibold text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <QtyStepper qty={l.quantity} onChange={(q) => setQty(l.itemName, q)} />
              </li>
            ))}
          </ul>
        )}

        {!pickerOpen ? (
          <button
            type="button"
            onClick={openPicker}
            className="mt-3 w-full rounded-lg border border-dashed border-blue-300 py-2.5 text-sm font-bold text-blue-700 hover:bg-blue-50"
          >
            + Add items
          </button>
        ) : (
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="mb-3 flex items-center gap-2">
              <input
                className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                placeholder="Search items"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setPickerOpen(false)}
                className="shrink-0 rounded-lg px-2 py-2 text-xs font-bold text-slate-600"
              >
                Done
              </button>
            </div>
            {catalogError && <p className="text-sm text-red-600">{catalogError}</p>}
            {!catalog && !catalogError && (
              <p className="text-sm text-slate-500">Loading items…</p>
            )}
            {catalog && !query.trim() && (
              <div className="-mx-1 mb-3 flex gap-2 overflow-x-auto pb-1">
                {catalog.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setActiveCategory(i)}
                    className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold ${
                      i === activeCategory
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 bg-white text-slate-700"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
            {catalog && filtered.length === 0 && (
              <p className="text-sm text-slate-500">No items found.</p>
            )}
            <div className="max-h-80 space-y-3 overflow-y-auto">
              {filtered.map((group) => (
                <div key={`${group.main}/${group.sub}`}>
                  <p className="mb-1 text-xs font-bold text-slate-500">
                    {query.trim() ? `${group.main} · ${group.sub}` : group.sub}
                  </p>
                  <ul className="divide-y divide-slate-100 rounded-lg bg-white">
                    {group.items.map((item) => {
                      const q = qtyOf(item.name);
                      return (
                        <li
                          key={item.name}
                          className="flex items-center justify-between gap-3 px-3 py-2"
                        >
                          <span className="min-w-0 truncate text-sm text-slate-800">
                            {item.name}
                          </span>
                          {q > 0 ? (
                            <QtyStepper qty={q} onChange={(n) => setQty(item.name, n)} />
                          ) : (
                            <button
                              type="button"
                              onClick={() => setQty(item.name, 1)}
                              className="shrink-0 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white"
                            >
                              Add
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {previewing && (
          <p className="mt-3 text-xs font-medium text-blue-700">Updating price…</p>
        )}
        {packingNote && !previewing && (
          <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Part load packing is not available for these items. Standard packing will be used.
          </p>
        )}
        {message && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {message}
            {supportPhone && (
              <>
                {" "}
                <a href={`tel:${supportPhone}`} className="font-bold underline">
                  Call support
                </a>
              </>
            )}
          </p>
        )}

        {switchPrompt && (
          <div className="mt-3 rounded-lg border border-amber-300 bg-amber-50 p-3">
            <p className="text-sm font-bold text-amber-900">Part load no longer available</p>
            <p className="mt-1 text-sm text-amber-900">{switchPrompt}</p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setSwitchPrompt(null)}
                className="flex-1 rounded-lg border border-slate-300 bg-white py-2 text-sm font-semibold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => void save(true)}
                className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-bold text-white disabled:opacity-60"
              >
                Switch to Standard
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={cancelEditing}
            disabled={saving}
            className="flex-1 rounded-lg border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void save(false)}
            disabled={
              saving || previewing || !dirty || draft.length === 0 || !!message || !!switchPrompt
            }
            className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-bold text-white disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </section>
  );
}
