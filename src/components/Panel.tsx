import React, { Fragment, memo, useCallback } from 'react';
import { AddonPanel } from 'storybook/internal/components';
import { Button } from 'storybook/internal/components';
import { useChannel } from 'storybook/manager-api';
import { styled } from 'storybook/theming';

import { EVENTS } from '../constants';

interface PanelProps {
  active?: boolean;
}

export const RequestDataButton = styled(Button)({
  marginTop: '1rem',
});

export const Panel: React.FC<PanelProps> = memo(function MyPanel(props: PanelProps) {
  // https://storybook.js.org/docs/react/addons/addons-api#usechannel
  const emit = useChannel({
    [EVENTS.RESULT]: (newResults) => {
      console.log('Received results', newResults);
    },
  });

  const fetchData = useCallback(() => {
    emit(EVENTS.REQUEST);
  }, [emit]);

  return (
    <AddonPanel active={props.active ?? false}>
      <Fragment>
        Addons can gather details about how a story is rendered. This is panel uses a tab pattern. Click the button
        below to fetch data.
        <RequestDataButton onClick={fetchData}>Request data</RequestDataButton>
      </Fragment>
    </AddonPanel>
  );
});
