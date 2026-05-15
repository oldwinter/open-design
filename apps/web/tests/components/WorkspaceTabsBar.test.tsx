// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { WorkspaceTabsBar } from '../../src/components/WorkspaceTabsBar';
import { navigate, type Route } from '../../src/router';
import type { Project } from '../../src/types';

vi.mock('../../src/i18n', () => ({
  useT: () => (key: string) => {
    const labels: Record<string, string> = {
      'app.brand': 'Open Design',
      'common.close': 'Close',
      'common.untitled': 'Untitled',
      'entry.navDesignSystems': 'Design systems',
      'entry.navHome': 'Home',
      'entry.navProjects': 'Projects',
    };
    return labels[key] ?? key;
  },
}));

vi.mock('../../src/router', async () => {
  const actual = await vi.importActual<typeof import('../../src/router')>(
    '../../src/router',
  );
  return {
    ...actual,
    navigate: vi.fn(),
  };
});

const homeRoute: Route = { kind: 'home', view: 'home' };
const projectRoute: Route = {
  kind: 'project',
  projectId: 'project-alpha',
  conversationId: null,
  fileName: null,
};

const project: Project = {
  id: 'project-alpha',
  name: 'Project Alpha',
  skillId: null,
  designSystemId: null,
  createdAt: 1,
  updatedAt: 1,
};

describe('WorkspaceTabsBar navigation semantics', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('keeps Home pinned when in-tab navigation opens a project', async () => {
    const { rerender } = render(
      <WorkspaceTabsBar route={homeRoute} projects={[project]} />,
    );

    expect(screen.getAllByRole('tab')).toHaveLength(1);
    expect(
      within(screen.getByRole('tab', { name: /Home/ })).queryByRole('button', {
        name: 'Close',
      }),
    ).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'New tab' }));

    await waitFor(() => {
      expect(screen.getAllByRole('tab')).toHaveLength(1);
    });
    expect(navigate).toHaveBeenCalledWith(homeRoute);

    rerender(<WorkspaceTabsBar route={projectRoute} projects={[project]} />);

    await waitFor(() => {
      const tabs = screen.getAllByRole('tab');
      const labels = tabs.map((tab) => tab.textContent ?? '');
      expect(tabs).toHaveLength(2);
      expect(labels.filter((label) => label.includes('Home'))).toHaveLength(1);
      expect(labels.some((label) => label.includes('Project Alpha'))).toBe(true);
    });

    expect(
      within(screen.getByRole('tab', { name: /Home/ })).queryByRole('button', {
        name: 'Close',
      }),
    ).toBeNull();
    expect(
      within(screen.getByRole('tab', { name: /Project Alpha/ })).queryByRole('button', {
        name: 'Close',
      }),
    ).not.toBeNull();
  });

  it('collapses restored Home duplicates into one pinned tab', async () => {
    window.localStorage.setItem(
      'open-design:workspace-tabs:v1',
      JSON.stringify({
        activeTabId: 'entry:home:old-two',
        tabs: [
          {
            id: 'entry:home:old-one',
            kind: 'entry',
            view: 'home',
            createdAt: 1,
            lastActiveAt: 1,
          },
          {
            id: 'entry:home:old-two',
            kind: 'entry',
            view: 'home',
            createdAt: 2,
            lastActiveAt: 2,
          },
        ],
      }),
    );

    render(<WorkspaceTabsBar route={homeRoute} projects={[project]} />);

    await waitFor(() => {
      const labels = screen.getAllByRole('tab').map((tab) => tab.textContent ?? '');
      expect(labels.filter((label) => label.includes('Home'))).toHaveLength(1);
    });
  });
});
