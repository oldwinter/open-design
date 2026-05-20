import { useEffect, useMemo, useRef, useState } from 'react';
import type { Dispatch, FormEvent, SetStateAction } from 'react';
import { useT } from '../i18n';
import type { AppConfig, DesignSystemSummary } from '../types';
import {
  fetchDesignSystems,
  importGitHubDesignSystem,
  importLocalDesignSystem,
} from '../providers/registry';
import { DesignSystemPreviewModal } from './DesignSystemPreviewModal';

// Sibling Settings section that hosts the design-systems registry.
// Lifted out of the previous LibrarySection so each surface (functional
// skills vs. design systems) gets its own dedicated nav entry instead of
// sharing a sub-tab toggle. See specs/current/skills-and-design-templates.md.

interface Props {
  cfg: AppConfig;
  setCfg: Dispatch<SetStateAction<AppConfig>>;
}

function toggleCraftSlug(current: string[], slug: string, enabled: boolean): string[] {
  const next = new Set(current);
  if (enabled) next.add(slug);
  else next.delete(slug);
  return Array.from(next);
}

export function DesignSystemsSection({ cfg, setCfg }: Props) {
  const t = useT();
  const cardRefs = useRef(new Map<string, HTMLDivElement>());
  const [designSystems, setDesignSystems] = useState<DesignSystemSummary[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [previewSystem, setPreviewSystem] = useState<DesignSystemSummary | null>(null);
  const [importPath, setImportPath] = useState('');
  const [importSource, setImportSource] = useState<'local' | 'github'>('local');
  const [packageImportMode, setPackageImportMode] = useState<'normalized' | 'hybrid' | 'verbatim'>('hybrid');
  const [craftApplies, setCraftApplies] = useState<string[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [showOnlyHidden, setShowOnlyHidden] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [importedDesignSystem, setImportedDesignSystem] = useState<DesignSystemSummary | null>(null);
  const [highlightedDesignSystemId, setHighlightedDesignSystemId] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

  useEffect(() => {
    fetchDesignSystems().then(setDesignSystems);
  }, []);

  const disabledDS = useMemo(
    () => new Set(cfg.disabledDesignSystems ?? []),
    [cfg.disabledDesignSystems],
  );
  const hiddenDesignSystemCount = useMemo(
    () => designSystems.filter((system) => disabledDS.has(system.id)).length,
    [designSystems, disabledDS],
  );

  const categories = useMemo(() => {
    const cats = new Set(designSystems.map((d) => d.category));
    return ['All', ...Array.from(cats).sort()];
  }, [designSystems]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return designSystems.filter((d) => {
      if (showOnlyHidden && !disabledDS.has(d.id)) return false;
      if (categoryFilter !== 'All' && d.category !== categoryFilter) return false;
      if (
        q &&
        !d.title.toLowerCase().includes(q) &&
        !d.summary.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [designSystems, categoryFilter, disabledDS, search, showOnlyHidden]);

  const grouped = useMemo(() => {
    const groups = new Map<string, DesignSystemSummary[]>();
    for (const d of filtered) {
      const list = groups.get(d.category) ?? [];
      list.push(d);
      groups.set(d.category, list);
    }
    return groups;
  }, [filtered]);

  useEffect(() => {
    if (!highlightedDesignSystemId) return;
    const raf = window.requestAnimationFrame(() => {
      cardRefs.current.get(highlightedDesignSystemId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
    const timeout = window.setTimeout(() => {
      setHighlightedDesignSystemId((current) =>
        current === highlightedDesignSystemId ? null : current,
      );
    }, 2200);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
    };
  }, [filtered, highlightedDesignSystemId]);

  useEffect(() => {
    if (hiddenDesignSystemCount === 0) setShowOnlyHidden(false);
  }, [hiddenDesignSystemCount]);

  function toggleDSDisabled(id: string, enabled: boolean) {
    setCfg((c) => {
      const set = new Set(c.disabledDesignSystems ?? []);
      if (enabled) set.delete(id);
      else set.add(id);
      return { ...c, disabledDesignSystems: [...set] };
    });
  }

  function clearImportFeedback() {
    setImportError(null);
    setImportMessage(null);
    setImportedDesignSystem(null);
  }

  async function handleLocalImport(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const importTarget = importPath.trim();
    if (!importTarget || importing) return;
    setImporting(true);
    setImportError(null);
    setImportMessage(null);
    setImportedDesignSystem(null);
    const importOptions = {
      importMode: packageImportMode,
      craftApplies,
    };
    const result =
      importSource === 'github'
        ? await importGitHubDesignSystem({ githubUrl: importTarget, ...importOptions })
        : await importLocalDesignSystem({ baseDir: importTarget, ...importOptions });
    setImporting(false);
    if ('error' in result) {
      setImportError(result.error.message);
      return;
    }
    setDesignSystems((current) => {
      const withoutDuplicate = current.filter((system) => system.id !== result.designSystem.id);
      return [...withoutDuplicate, result.designSystem].sort((a, b) => a.title.localeCompare(b.title));
    });
    setPreviewSystem(null);
    setImportPath('');
    setImportedDesignSystem(result.designSystem);
    setImportMessage(`Imported ${result.designSystem.title}`);
  }

  function viewImportedDesignSystem() {
    if (!importedDesignSystem) return;
    setSearch('');
    setCategoryFilter(importedDesignSystem.category);
    setPreviewSystem(null);
    setHighlightedDesignSystemId(importedDesignSystem.id);
  }

  function toggleShowOnlyHidden() {
    setShowOnlyHidden((current) => {
      const next = !current;
      if (next) {
        setSearch('');
        setCategoryFilter('All');
      }
      return next;
    });
  }

  return (
    <section className="settings-section settings-design-systems">
      <div className="library-section-header">
        <h4 className="library-section-title">
          Installed <span className="library-section-count">{designSystems.length}</span>
        </h4>
        <button
          type="button"
          className="primary-ghost library-add-btn"
          aria-expanded={addOpen}
          onClick={() => setAddOpen((v) => !v)}
        >
          <span aria-hidden="true" className="library-add-btn-icon">+</span>
          <span>Add design system</span>
        </button>
      </div>
      {hiddenDesignSystemCount > 0 ? (
        <div className="library-hidden-banner">
          <span>{hiddenDesignSystemCount} hidden from home gallery</span>
          <button
            type="button"
            className="library-hidden-banner-link"
            onClick={toggleShowOnlyHidden}
          >
            {showOnlyHidden ? 'Show all' : 'Show hidden'}
          </button>
        </div>
      ) : null}

      <div className={`accordion-collapsible library-add-panel${addOpen ? ' open' : ''}`}>
        <div className="accordion-collapsible-inner">
          <form className="library-install-form" onSubmit={handleLocalImport}>
            <div className="library-import-controls">
              <div className="library-import-row">
                <span className="library-import-option-label">Source</span>
                <div className="seg-control library-import-source-control">
                  <button
                    type="button"
                    className={importSource === 'local' ? 'active' : ''}
                    onClick={() => {
                      setImportSource('local');
                      clearImportFeedback();
                    }}
                  >
                    Local
                  </button>
                  <button
                    type="button"
                    className={importSource === 'github' ? 'active' : ''}
                    onClick={() => {
                      setImportSource('github');
                      clearImportFeedback();
                    }}
                  >
                    GitHub
                  </button>
                </div>
              </div>
              <div className="library-import-row">
                <span className="library-import-option-label">Structure</span>
                <div className="seg-control library-import-mode-control">
                  <button
                    type="button"
                    className={packageImportMode === 'hybrid' ? 'active' : ''}
                    onClick={() => setPackageImportMode('hybrid')}
                  >
                    Hybrid
                  </button>
                  <button
                    type="button"
                    className={packageImportMode === 'normalized' ? 'active' : ''}
                    onClick={() => setPackageImportMode('normalized')}
                  >
                    Normalized
                  </button>
                  <button
                    type="button"
                    className={packageImportMode === 'verbatim' ? 'active' : ''}
                    onClick={() => setPackageImportMode('verbatim')}
                  >
                    Verbatim
                  </button>
                </div>
              </div>
              <div className="library-import-row">
                <span className="library-import-option-label">Craft</span>
                <div className="library-import-checkboxes">
                  <label className="library-import-checkbox">
                    <input
                      type="checkbox"
                      checked={craftApplies.includes('color')}
                      onChange={(e) =>
                        setCraftApplies((current) =>
                          toggleCraftSlug(current, 'color', e.target.checked),
                        )
                      }
                    />
                    <span>Color</span>
                  </label>
                  <label className="library-import-checkbox">
                    <input
                      type="checkbox"
                      checked={craftApplies.includes('accessibility-baseline')}
                      onChange={(e) =>
                        setCraftApplies((current) =>
                          toggleCraftSlug(current, 'accessibility-baseline', e.target.checked),
                        )
                      }
                    />
                    <span>Accessibility</span>
                  </label>
                </div>
              </div>
              <div className="library-import-row">
                <span className="library-import-option-label">
                  {importSource === 'github' ? 'GitHub URL' : 'Project path'}
                </span>
                <div className="library-install-row">
                  <input
                    type="text"
                    className="library-import-input"
                    placeholder={importSource === 'github' ? 'https://github.com/owner/repo' : '/path/to/project'}
                    value={importPath}
                    onChange={(e) => {
                      setImportPath(e.target.value);
                      clearImportFeedback();
                    }}
                  />
                  <button
                    type="submit"
                    className="library-install-submit"
                    disabled={importing || importPath.trim().length === 0}
                  >
                    {importing
                      ? t('settings.libraryLoading')
                      : importSource === 'github'
                        ? 'Import from GitHub'
                        : 'Import from project'}
                  </button>
                </div>
              </div>
            </div>
            {importError ? <p className="library-install-error">{importError}</p> : null}
            {importMessage ? (
              <p className="library-install-status">
                <span>{importMessage}</span>
                {importedDesignSystem ? (
                  <button
                    type="button"
                    className="library-install-status-link"
                    onClick={viewImportedDesignSystem}
                  >
                    View imported design system
                  </button>
                ) : null}
              </p>
            ) : null}
          </form>
        </div>
      </div>

      <div className="library-toolbar library-toolbar-row">
        <input
          type="search"
          className="library-search"
          placeholder={t('settings.librarySearch')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label className="library-filter-select">
          <select
            aria-label="Category"
            value={categoryFilter}
            data-active={categoryFilter !== 'All' ? 'true' : undefined}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? designSystems.length
                  : designSystems.filter((d) => d.category === cat).length;
              return (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat === 'All' ? 'All categories' : cat} ({count})
                </option>
              );
            })}
          </select>
        </label>
      </div>

      <div className="library-content">
        {filtered.length === 0 ? (
          <p className="library-empty">{t('settings.libraryNoResults')}</p>
        ) : (
          <>
            {Array.from(grouped.entries()).map(([category, items]) => (
              <div key={category} className="library-group">
                {categoryFilter === 'All' ? (
                  <h4 className="library-group-title">
                    {category}{' '}
                    <span className="library-group-count">{items.length}</span>
                  </h4>
                ) : null}
                <div className="ds-grid">
                  {items.map((ds) => (
                    <div
                      key={ds.id}
                      ref={(node) => {
                        if (node) cardRefs.current.set(ds.id, node);
                        else cardRefs.current.delete(ds.id);
                      }}
                      className={`library-ds-card${
                        disabledDS.has(ds.id) ? ' disabled' : ''
                      }${
                        highlightedDesignSystemId === ds.id ? ' highlighted' : ''
                      }`}
                    >
                      <div
                        className="library-ds-card-content"
                        role="button"
                        tabIndex={0}
                        aria-haspopup="dialog"
                        onClick={() => setPreviewSystem(ds)}
                        onKeyDown={(e) => {
                          if (e.key !== 'Enter' && e.key !== ' ') return;
                          e.preventDefault();
                          setPreviewSystem(ds);
                        }}
                      >
                        {ds.swatches && ds.swatches.length > 0 && (
                          <div className="library-ds-swatches">
                            {ds.swatches.slice(0, 4).map((c, i) => (
                              <span
                                key={i}
                                className="library-ds-swatch"
                                style={{ backgroundColor: c }}
                              />
                            ))}
                          </div>
                        )}
                        <div className="library-ds-title">{ds.title}</div>
                        <div className="library-ds-summary">{ds.summary}</div>
                      </div>
                      <div className="library-ds-toggle-cell">
                        <label
                          className="toggle-switch toggle-switch-sm"
                          title="Show in home gallery"
                        >
                          <input
                            type="checkbox"
                            aria-label="Show in home gallery"
                            checked={!disabledDS.has(ds.id)}
                            onChange={(e) =>
                              toggleDSDisabled(ds.id, e.target.checked)
                            }
                          />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {previewSystem ? (
        <DesignSystemPreviewModal
          system={previewSystem}
          onClose={() => setPreviewSystem(null)}
        />
      ) : null}
    </section>
  );
}
