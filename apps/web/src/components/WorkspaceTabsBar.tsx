import { useEffect, useMemo, useRef, useState } from 'react';
import { useT } from '../i18n';
import { navigate, type EntryHomeView, type Route } from '../router';
import type { Project } from '../types';
import { Icon, type IconName } from './Icon';

type WorkspaceChromeTab =
  | {
      id: string;
      kind: 'entry';
      view: EntryHomeView;
      createdAt: number;
      lastActiveAt: number;
    }
  | {
      id: string;
      kind: 'project';
      projectId: string;
      conversationId: string | null;
      fileName: string | null;
      createdAt: number;
      lastActiveAt: number;
    }
  | {
      id: string;
      kind: 'marketplace';
      pluginId: string | null;
      createdAt: number;
      lastActiveAt: number;
    };

interface WorkspaceTabsState {
  tabs: WorkspaceChromeTab[];
  activeTabId: string;
}

interface DisplayTab {
  id: string;
  title: string;
  meta: string;
  icon: IconName;
  tab: WorkspaceChromeTab;
}

interface Props {
  route: Route;
  projects: Project[];
}

const STORAGE_KEY = 'open-design:workspace-tabs:v1';
const PINNED_HOME_TAB_ID = 'entry:home';
const MAX_STORED_TABS = 60;
const MAX_VISIBLE_CHROME_TABS = 16;
const MAX_SEARCH_RESULTS = 80;

function nowId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function createEntryTab(view: EntryHomeView, timestamp = Date.now()): WorkspaceChromeTab {
  if (view === 'home') {
    return createPinnedHomeTab(timestamp);
  }
  return {
    id: `entry:${view}:${nowId()}`,
    kind: 'entry',
    view,
    createdAt: timestamp,
    lastActiveAt: timestamp,
  };
}

function createPinnedHomeTab(timestamp = Date.now()): WorkspaceChromeTab {
  return {
    id: PINNED_HOME_TAB_ID,
    kind: 'entry',
    view: 'home',
    createdAt: timestamp,
    lastActiveAt: timestamp,
  };
}

function isPinnedHomeTab(tab: WorkspaceChromeTab): boolean {
  return tab.kind === 'entry' && tab.view === 'home';
}

function isHomeRoute(route: Route): boolean {
  return route.kind === 'home' && route.view === 'home';
}

function tabFromRoute(route: Route, timestamp = Date.now()): WorkspaceChromeTab {
  if (route.kind === 'project') {
    return {
      id: `project:${route.projectId}`,
      kind: 'project',
      projectId: route.projectId,
      conversationId: route.conversationId ?? null,
      fileName: route.fileName,
      createdAt: timestamp,
      lastActiveAt: timestamp,
    };
  }
  if (route.kind === 'marketplace' || route.kind === 'marketplace-detail') {
    const pluginId = route.kind === 'marketplace-detail' ? route.pluginId : null;
    return {
      id: pluginId ? `marketplace:${pluginId}` : 'marketplace',
      kind: 'marketplace',
      pluginId,
      createdAt: timestamp,
      lastActiveAt: timestamp,
    };
  }
  return createEntryTab(route.view, timestamp);
}

function routeForTab(tab: WorkspaceChromeTab): Route {
  if (tab.kind === 'project') {
    return {
      kind: 'project',
      projectId: tab.projectId,
      conversationId: tab.conversationId,
      fileName: tab.fileName,
    };
  }
  if (tab.kind === 'marketplace') {
    return tab.pluginId
      ? { kind: 'marketplace-detail', pluginId: tab.pluginId }
      : { kind: 'marketplace' };
  }
  return { kind: 'home', view: tab.view };
}

function tabMatchesRoute(tab: WorkspaceChromeTab, route: Route): boolean {
  if (route.kind === 'project') {
    return tab.kind === 'project' && tab.projectId === route.projectId;
  }
  if (route.kind === 'marketplace') {
    return tab.kind === 'marketplace' && tab.pluginId === null;
  }
  if (route.kind === 'marketplace-detail') {
    return tab.kind === 'marketplace' && tab.pluginId === route.pluginId;
  }
  return tab.kind === 'entry' && tab.view === route.view;
}

function reviveTab(value: unknown): WorkspaceChromeTab | null {
  if (value === null || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  const id = typeof record.id === 'string' ? record.id : '';
  const createdAt = typeof record.createdAt === 'number' ? record.createdAt : Date.now();
  const lastActiveAt = typeof record.lastActiveAt === 'number' ? record.lastActiveAt : createdAt;
  if (!id) return null;
  if (record.kind === 'entry') {
    const view = record.view;
    if (
      view === 'home'
      || view === 'projects'
      || view === 'tasks'
      || view === 'plugins'
      || view === 'design-systems'
      || view === 'integrations'
    ) {
      return { id, kind: 'entry', view, createdAt, lastActiveAt };
    }
  }
  if (record.kind === 'project' && typeof record.projectId === 'string') {
    return {
      id,
      kind: 'project',
      projectId: record.projectId,
      conversationId: typeof record.conversationId === 'string' ? record.conversationId : null,
      fileName: typeof record.fileName === 'string' ? record.fileName : null,
      createdAt,
      lastActiveAt,
    };
  }
  if (record.kind === 'marketplace') {
    return {
      id,
      kind: 'marketplace',
      pluginId: typeof record.pluginId === 'string' ? record.pluginId : null,
      createdAt,
      lastActiveAt,
    };
  }
  return null;
}

function withPinnedHome(state: WorkspaceTabsState): WorkspaceTabsState {
  const timestamp = Date.now();
  const homeTabs = state.tabs.filter(isPinnedHomeTab);
  const homeTab =
    homeTabs.length > 0
      ? {
          ...createPinnedHomeTab(
            Math.min(...homeTabs.map((tab) => tab.createdAt)),
          ),
          lastActiveAt: Math.max(...homeTabs.map((tab) => tab.lastActiveAt)),
        }
      : createPinnedHomeTab(timestamp);
  const tabs = [
    homeTab,
    ...state.tabs.filter((tab) => !isPinnedHomeTab(tab)),
  ];
  const activeTabId = homeTabs.some((tab) => tab.id === state.activeTabId)
    ? PINNED_HOME_TAB_ID
    : tabs.some((tab) => tab.id === state.activeTabId)
      ? state.activeTabId
      : PINNED_HOME_TAB_ID;
  return { tabs, activeTabId };
}

function capTabs(tabs: WorkspaceChromeTab[], activeTabId: string): WorkspaceChromeTab[] {
  const normalized = withPinnedHome({ tabs, activeTabId });
  if (normalized.tabs.length <= MAX_STORED_TABS) return normalized.tabs;
  const homeTab = normalized.tabs[0]!;
  const nonHomeTabs = normalized.tabs.filter((tab) => !isPinnedHomeTab(tab));
  const active = nonHomeTabs.find((tab) => tab.id === normalized.activeTabId) ?? null;
  const kept = [...nonHomeTabs]
    .filter((tab) => tab.id !== normalized.activeTabId)
    .sort((a, b) => b.lastActiveAt - a.lastActiveAt)
    .slice(0, MAX_STORED_TABS - 1 - (active ? 1 : 0))
    .sort((a, b) => a.createdAt - b.createdAt);
  return active ? [homeTab, ...kept, active] : [homeTab, ...kept];
}

function initialTabsState(route: Route): WorkspaceTabsState {
  const fallback = tabFromRoute(route);
  if (typeof window === 'undefined') {
    return syncStateToRoute({ tabs: [fallback], activeTabId: fallback.id }, route);
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return syncStateToRoute({ tabs: [fallback], activeTabId: fallback.id }, route);
    const parsed = JSON.parse(raw) as unknown;
    if (parsed === null || typeof parsed !== 'object') {
      return syncStateToRoute({ tabs: [fallback], activeTabId: fallback.id }, route);
    }
    const record = parsed as Record<string, unknown>;
    const tabs = Array.isArray(record.tabs)
      ? record.tabs.map(reviveTab).filter((tab): tab is WorkspaceChromeTab => tab !== null)
      : [];
    const activeTabId = typeof record.activeTabId === 'string' ? record.activeTabId : '';
    if (tabs.length === 0) {
      return syncStateToRoute({ tabs: [fallback], activeTabId: fallback.id }, route);
    }
    return syncStateToRoute({ tabs, activeTabId: activeTabId || tabs[0]!.id }, route);
  } catch {
    return syncStateToRoute({ tabs: [fallback], activeTabId: fallback.id }, route);
  }
}

function syncStateToRoute(state: WorkspaceTabsState, route: Route): WorkspaceTabsState {
  const timestamp = Date.now();
  const current = withPinnedHome(state);
  if (isHomeRoute(route)) {
    const nextTabs = current.tabs.map((tab) =>
      isPinnedHomeTab(tab) ? { ...tab, lastActiveAt: timestamp } : tab,
    );
    return { tabs: capTabs(nextTabs, PINNED_HOME_TAB_ID), activeTabId: PINNED_HOME_TAB_ID };
  }

  const currentActive = current.tabs.find((tab) => tab.id === current.activeTabId) ?? null;
  if (currentActive && isPinnedHomeTab(currentActive)) {
    const existing = current.tabs.find((tab) => tabMatchesRoute(tab, route)) ?? null;
    const nextTab = existing
      ? { ...tabFromRoute(route, existing.createdAt), lastActiveAt: timestamp, id: existing.id }
      : tabFromRoute(route, timestamp);
    const nextTabs = existing
      ? current.tabs.map((tab) => (tab.id === existing.id ? nextTab : tab))
      : [...current.tabs, nextTab];
    const capped = capTabs(nextTabs, nextTab.id);
    return {
      tabs: capped,
      activeTabId: capped.some((tab) => tab.id === nextTab.id) ? nextTab.id : PINNED_HOME_TAB_ID,
    };
  }
  if (!currentActive) {
    const existing = current.tabs.find((tab) => tabMatchesRoute(tab, route)) ?? null;
    const nextTab = existing
      ? { ...tabFromRoute(route, existing.createdAt), lastActiveAt: timestamp, id: existing.id }
      : tabFromRoute(route, timestamp);
    const nextTabs = existing
      ? current.tabs.map((tab) => (tab.id === existing.id ? nextTab : tab))
      : [...current.tabs, nextTab];
    const capped = capTabs(nextTabs, nextTab.id);
    return {
      tabs: capped,
      activeTabId: capped.some((tab) => tab.id === nextTab.id) ? nextTab.id : PINNED_HOME_TAB_ID,
    };
  }

  const replacement = {
    ...tabFromRoute(route, currentActive.createdAt),
    id: currentActive.id,
    lastActiveAt: timestamp,
  };
  const nextTabs = current.tabs
    .filter((tab) => tab.id === currentActive.id || !tabMatchesRoute(tab, route))
    .map((tab) => (tab.id === currentActive.id ? replacement : tab));
  const activeTabId = replacement.id;
  const capped = capTabs(nextTabs, activeTabId);
  return {
    tabs: capped,
    activeTabId: capped.some((tab) => tab.id === activeTabId) ? activeTabId : capped[0]?.id ?? '',
  };
}

function visibleChromeTabs(tabs: WorkspaceChromeTab[], activeTabId: string): WorkspaceChromeTab[] {
  if (tabs.length <= MAX_VISIBLE_CHROME_TABS) return tabs;
  const homeTab = tabs.find(isPinnedHomeTab) ?? null;
  const source = homeTab ? tabs.filter((tab) => !isPinnedHomeTab(tab)) : tabs;
  const visibleSlots = homeTab ? MAX_VISIBLE_CHROME_TABS - 1 : MAX_VISIBLE_CHROME_TABS;
  const activeIndex = Math.max(0, source.findIndex((tab) => tab.id === activeTabId));
  const half = Math.floor(visibleSlots / 2);
  const start = Math.max(0, Math.min(activeIndex - half, source.length - visibleSlots));
  const visible = source.slice(start, start + visibleSlots);
  return homeTab ? [homeTab, ...visible] : visible;
}

function normalizeSearch(value: string): string {
  return value.trim().toLocaleLowerCase();
}

export function WorkspaceTabsBar({ route, projects }: Props) {
  const t = useT();
  const [state, setState] = useState<WorkspaceTabsState>(() => initialTabsState(route));
  const [tabsMenuOpen, setTabsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const menuRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const projectById = useMemo(
    () => new Map(projects.map((project) => [project.id, project])),
    [projects],
  );

  const displayTabs = useMemo(
    () => state.tabs.map((tab) => displayTabFor(tab, projectById, t)),
    [state.tabs, projectById, t],
  );
  const displayTabById = useMemo(
    () => new Map(displayTabs.map((tab) => [tab.id, tab])),
    [displayTabs],
  );
  const visibleTabs = useMemo(
    () => visibleChromeTabs(state.tabs, state.activeTabId),
    [state.tabs, state.activeTabId],
  );
  const hiddenTabCount = Math.max(0, state.tabs.length - visibleTabs.length);
  const filteredTabs = useMemo(() => {
    const needle = normalizeSearch(query);
    const source = needle
      ? displayTabs.filter((tab) => {
          const haystack = `${tab.title} ${tab.meta}`.toLocaleLowerCase();
          return haystack.includes(needle);
        })
      : displayTabs;
    return source
      .slice()
      .sort((a, b) => b.tab.lastActiveAt - a.tab.lastActiveAt)
      .slice(0, MAX_SEARCH_RESULTS);
  }, [displayTabs, query]);

  useEffect(() => {
    setState((current) => syncStateToRoute(current, route));
  }, [route]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Best-effort browser chrome state. Navigation itself remains URL-driven.
    }
  }, [state]);

  useEffect(() => {
    if (!tabsMenuOpen) return;
    const frame = window.requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [tabsMenuOpen]);

  useEffect(() => {
    if (!tabsMenuOpen) return;
    function onPointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setTabsMenuOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setTabsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [tabsMenuOpen]);

  function openTab(tab: WorkspaceChromeTab) {
    const tabId = isPinnedHomeTab(tab) ? PINNED_HOME_TAB_ID : tab.id;
    setState((current) => ({
      tabs: withPinnedHome(current).tabs.map((item) =>
        item.id === tabId ? { ...item, lastActiveAt: Date.now() } : item,
      ),
      activeTabId: tabId,
    }));
    setTabsMenuOpen(false);
    navigate(routeForTab(tab));
  }

  function createNewTab() {
    setState((current) => ({
      tabs: withPinnedHome(current).tabs.map((item) =>
        isPinnedHomeTab(item) ? { ...item, lastActiveAt: Date.now() } : item,
      ),
      activeTabId: PINNED_HOME_TAB_ID,
    }));
    setTabsMenuOpen(false);
    navigate({ kind: 'home', view: 'home' });
  }

  function closeTab(tabId: string) {
    let nextRoute: Route | null = null;
    setState((current) => {
      const normalized = withPinnedHome(current);
      const closingIndex = normalized.tabs.findIndex((tab) => tab.id === tabId);
      if (closingIndex < 0) return current;
      const closingTab = normalized.tabs[closingIndex]!;
      if (isPinnedHomeTab(closingTab)) return normalized;
      const nextTabs = normalized.tabs.filter((tab) => tab.id !== tabId);
      if (normalized.activeTabId !== tabId) {
        return { ...normalized, tabs: nextTabs };
      }
      const replacement = nextTabs[Math.min(closingIndex, nextTabs.length - 1)] ?? nextTabs[0]!;
      nextRoute = routeForTab(replacement);
      return { tabs: nextTabs, activeTabId: replacement.id };
    });
    if (nextRoute) navigate(nextRoute);
  }

  return (
    <header className="app-chrome-header workspace-tabs-chrome" aria-label="Workspace tabs">
      <div className="app-chrome-traffic-space workspace-tabs-traffic" aria-hidden />
      <div className="workspace-tabs-strip" role="tablist" aria-label="Open workspaces">
        {visibleTabs.map((tab) => {
          const display = displayTabById.get(tab.id) ?? displayTabFor(tab, projectById, t);
          const active = tab.id === state.activeTabId;
          const closable = !isPinnedHomeTab(tab);
          return (
            <div
              key={tab.id}
              className={`workspace-tab${active ? ' is-active' : ''}${
                closable ? '' : ' workspace-tab--pinned'
              }`}
              role="tab"
              aria-selected={active}
              title={display.title}
            >
              <button
                type="button"
                className="workspace-tab__main"
                onClick={() => openTab(tab)}
                title={display.title}
              >
                <span className="workspace-tab__icon" aria-hidden>
                  <Icon name={display.icon} size={14} />
                </span>
                <span className="workspace-tab__label">{display.title}</span>
              </button>
              {closable ? (
                <button
                  type="button"
                  className="workspace-tab__close"
                  aria-label={t('common.close')}
                  title={t('common.close')}
                  onClick={() => closeTab(tab.id)}
                >
                  <Icon name="close" size={11} />
                </button>
              ) : null}
            </div>
          );
        })}
        {hiddenTabCount > 0 ? (
          <button
            type="button"
            className="workspace-tab workspace-tab--overflow"
            onClick={() => setTabsMenuOpen(true)}
            title="Show hidden tabs"
          >
            {hiddenTabCount} more
          </button>
        ) : null}
        <button
          type="button"
          className="workspace-tabs-new-btn"
          onClick={createNewTab}
          title="New tab"
          aria-label="New tab"
        >
          <Icon name="plus" size={14} />
        </button>
      </div>
      <div className="workspace-tabs-drag" aria-hidden />
      <div className="workspace-tabs-actions" ref={menuRef}>
        <button
          type="button"
          className={`workspace-tabs-icon-btn${tabsMenuOpen ? ' is-active' : ''}`}
          onClick={() => setTabsMenuOpen((open) => !open)}
          title="Search tabs"
          aria-label="Search tabs"
          aria-haspopup="dialog"
          aria-expanded={tabsMenuOpen}
        >
          <Icon name="search" size={15} />
        </button>
        {tabsMenuOpen ? (
          <div className="workspace-tabs-popover" role="dialog" aria-label="Search tabs">
            <div className="workspace-tabs-search">
              <Icon name="search" size={14} />
              <input
                ref={searchInputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tabs"
                aria-label="Search tabs"
              />
            </div>
            <div className="workspace-tabs-popover__section">
              <span>Open tabs</span>
              <span>{state.tabs.length}</span>
            </div>
            <div className="workspace-tabs-list" role="listbox" aria-label="Open tabs">
              {filteredTabs.length > 0 ? (
                filteredTabs.map((display) => {
                  const active = display.id === state.activeTabId;
                  const closable = !isPinnedHomeTab(display.tab);
                  return (
                    <div
                      key={display.id}
                      className={`workspace-tabs-list__item${active ? ' is-active' : ''}${
                        closable ? '' : ' workspace-tabs-list__item--pinned'
                      }`}
                      role="option"
                      aria-selected={active}
                    >
                      <button
                        type="button"
                        className="workspace-tabs-list__main"
                        onClick={() => openTab(display.tab)}
                      >
                        <span className="workspace-tabs-list__icon" aria-hidden>
                          <Icon name={display.icon} size={15} />
                        </span>
                        <span className="workspace-tabs-list__text">
                          <span className="workspace-tabs-list__title">{display.title}</span>
                          <span className="workspace-tabs-list__meta">{display.meta}</span>
                        </span>
                      </button>
                      {closable ? (
                        <button
                          type="button"
                          className="workspace-tabs-list__close"
                          onClick={() => closeTab(display.id)}
                          title={t('common.close')}
                          aria-label={t('common.close')}
                        >
                          <Icon name="close" size={11} />
                        </button>
                      ) : null}
                    </div>
                  );
                })
              ) : (
                <div className="workspace-tabs-empty">No tabs found</div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function displayTabFor(
  tab: WorkspaceChromeTab,
  projectById: Map<string, Project>,
  t: ReturnType<typeof useT>,
): DisplayTab {
  if (tab.kind === 'project') {
    const project = projectById.get(tab.projectId);
    return {
      id: tab.id,
      title: project?.name?.trim() || t('common.untitled'),
      meta: 'Project',
      icon: 'folder',
      tab,
    };
  }
  if (tab.kind === 'marketplace') {
    return {
      id: tab.id,
      title: tab.pluginId ? 'Plugin details' : 'Marketplace',
      meta: 'Plugins',
      icon: 'grid',
      tab,
    };
  }
  const entryTitle: Record<EntryHomeView, string> = {
    home: t('entry.navHome'),
    projects: t('entry.navProjects'),
    tasks: 'Automations',
    plugins: 'Plugins',
    'design-systems': t('entry.navDesignSystems'),
    integrations: 'Integrations',
  };
  const entryIcon: Record<EntryHomeView, IconName> = {
    home: 'home',
    projects: 'folder',
    tasks: 'kanban',
    plugins: 'grid',
    'design-systems': 'palette',
    integrations: 'link',
  };
  return {
    id: tab.id,
    title: entryTitle[tab.view],
    meta: tab.view === 'home' ? 'Start a new project' : 'Workspace',
    icon: entryIcon[tab.view],
    tab,
  };
}
