import React, { useState } from 'react';
import { Sidebar, SidebarSectionList, SidebarItem } from 'components/tailwind/Sidebar';
import { FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';
import Button from 'components/tailwind/forms/Button';
import algoliasearch from 'algoliasearch/lite';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
// This import doesn't have any styling or JSS attached to it.
import { AlgoliaAutocomplete as Search } from 'components/AlgoliaAutocomplete';
import SearchResult from 'components/tailwind/AlgoliaAutocomplete/SearchResult';
import useMedia from 'react-use/lib/useMedia';
import classnames from 'classnames';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

const getSearchSources = ({ query }) => {
  return [{
    sourceId: 'docs',
    getItemUrl({ item }) {
      return item.slug;
    },
    getItems() {
      return getAlgoliaResults({
        searchClient,
        queries: [{
          indexName: 'docs',
          query,
        }],
      });
    },
    templates: {
      item({ item, components }) {
        return <SearchResult hit={item} components={components} />;
      }
    }
  }];
};

const DocSidebar = () => {
  // TODO: Use resolveConfig to dynaically get this 768px value from the tailwind config.
  const isWide = useMedia(`(min-width: 768px)`);
  const [isOpen, setOpen] = useState(isWide);

  const toggleSliderOpen = () => {
    // It should never be possible to hide the nav on big screens. The feature only makes
    // selse on mobile.
    if (isOpen && !isWide) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <Sidebar>
      <div className="px-3 my-3">
        <div className="mb-1 flex justify-between items-center">
          <span>
            <strong>Documentation</strong>
          </span>
          <span className="inline md:hidden">
            <Button
              onClick={toggleSliderOpen}
              text={isOpen ? 'Hide nav' : 'Show nav'}
              icon={isOpen ? <FaArrowCircleUp /> : <FaArrowCircleDown />}
              color="inset"
            />
          </span>
        </div>

        <div className="md:pr-3">
          <Search
            placeholder="Search"
            getSources={getSearchSources}
          />
        </div>
      </div>

      <nav className={classnames('overflow-y-hidden h-0', { 'h-full': isOpen })}>
        <SidebarSectionList title="Getting started">
          <SidebarItem
            to="/docs/getting-started/getting-started-for-admins/"
            text="Configuring Roadie"
          />

          <SidebarItem to="/docs/getting-started/adding-components/" text="Adding components" />
          <SidebarItem to="/docs/getting-started/user-management/" text="Adding users" />

          <SidebarItem
            to="/docs/getting-started/technical-documentation/"
            text="Using TechDocs"
          />

          <SidebarItem to="/docs/getting-started/openapi-specs/" text="Using OpenAPI specs" />

          <SidebarItem to="/docs/getting-started/updating-the-ui/" text="Updating the UI" />
        </SidebarSectionList>

        <SidebarSectionList title="Integrations">
          {/* Alphabetical ordering */}
          <SidebarItem to="/docs/integrations/bugsnag/" text="Bugsnag" />
          <SidebarItem to="/docs/integrations/circleci/" text="CircleCI" />
          <SidebarItem to="/docs/integrations/github-org/" text="GitHub Teams" />
          <SidebarItem to="/docs/integrations/github-token/" text="GitHub via Token" />
          <SidebarItem to="/docs/integrations/gcp/" text="Google Cloud Platform" />
          <SidebarItem to="/docs/integrations/jira/" text="Jira" />
          <SidebarItem to="/docs/integrations/kubernetes/" text="Kubernetes" />
          <SidebarItem to="/docs/integrations/newrelic/" text="NewRelic" />
          <SidebarItem to="/docs/integrations/opsgenie/" text="Opsgenie" />
          <SidebarItem to="/docs/integrations/pagerduty/" text="PagerDuty" />
          <SidebarItem to="/docs/integrations/prometheus/" text="Prometheus" />
          <SidebarItem to="/docs/integrations/sentry/" text="Sentry" />
          <SidebarItem to="/docs/integrations/snyk/" text="Snyk" />
          <SidebarItem to="/docs/integrations/sonarqube/" text="SonarQube" />
        </SidebarSectionList>

        <SidebarSectionList title="Configuration">
          <SidebarItem to="/docs/configuration/tech-radar/" text="Tech Radar" />
        </SidebarSectionList>

        <SidebarSectionList title="Custom plugins">
          <SidebarItem to="/docs/custom-plugins/configuring" text="Configuring Custom Plugins" />
          <SidebarItem to="/docs/custom-plugins/artifactory" text="Using Private Roadie Repository" />
        </SidebarSectionList>
      </nav>
    </Sidebar>
  );
};

export default DocSidebar;