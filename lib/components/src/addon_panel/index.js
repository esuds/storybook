import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

import { baseFonts, Placeholder } from '../';

const Wrapper = styled('div')(({ theme }) => ({
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  background: theme.mainFill,
  borderRadius: 4,
  border: theme.mainBorder,
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
}));

export const TabBar = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  borderBottom: 'solid 1px #eaeaea',
});

const Content = styled('div')({
  flex: '1 1 0',
  display: 'flex',
  overflow: 'auto',
  height: '100%',
  width: '100%',
});

const TabButton = styled('div')(
  baseFonts,
  {
    fontSize: 11,
    letterSpacing: '1px',
    padding: '10px 15px',
    textTransform: 'uppercase',
    transition: 'opacity 0.3s',
    maxHeight: 60,
    overflow: 'hidden',
    cursor: 'pointer',
    background: 'transparent',
    border: 'none',
  },
  ({ selected }) =>
    selected
      ? {
          opacity: 1,
        }
      : {
          opacity: 0.5,
        }
);

const Panel = styled('div')(
  ({ hidden }) => (hidden ? { display: 'none' } : { display: 'flex', flex: 1 })
);

export const Tab = ({ selected, name, title, onSelect }) => {
  const onClick = e => {
    e.preventDefault();
    onSelect(name);
  };

  return (
    <TabButton type="button" key={name} selected={selected} onClick={onClick} role="tab">
      {typeof title === 'function' ? title() : title}
    </TabButton>
  );
};

Tab.propTypes = {
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const AddonPanel = ({ panels, selectedPanel, onPanelSelect }) => {
  const hasPanels = panels && Object.keys(panels).length;

  return hasPanels ? (
    <Wrapper>
      <TabBar role="tablist">
        {Object.entries(panels).map(([name, data]) => (
          <Tab
            key={name}
            selected={name === selectedPanel}
            name={name}
            title={data.title}
            onSelect={onPanelSelect}
          />
        ))}
      </TabBar>
      <Content>
        {Object.keys(panels)
          .sort()
          .map(name => {
            const panel = panels[name];

            return (
              <Panel key={name} hidden={name !== selectedPanel} role="tabpanel">
                {panel.render()}
              </Panel>
            );
          })}
      </Content>
    </Wrapper>
  ) : (
    <Placeholder>no panels available</Placeholder>
  );
};

AddonPanel.defaultProps = {
  panels: {},
  onPanelSelect: () => {},
  selectedPanel: null,
};

AddonPanel.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  panels: PropTypes.object,
  onPanelSelect: PropTypes.func,
  selectedPanel: PropTypes.string,
};

export default AddonPanel;
