import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import * as SlateReact from 'slate-react';
import { withToggleType } from '../../../../common/plugins/toggle-type/withToggleType';
import { pipe } from '../../../../common/utils/pipe';
import { ELEMENT_H1 } from '../../../heading/defaults';
import { ToolbarLink } from '../../components/ToolbarLink';
import { input, output } from './onMouseDown-without-url.fixture';

it('should render', () => {
  const editor = pipe(input, withToggleType());

  jest.spyOn(SlateReact, 'useSlate').mockReturnValue(editor as any);
  jest.spyOn(window, 'prompt').mockReturnValue('');

  const { getByTestId } = render(<ToolbarLink type={ELEMENT_H1} icon={null} />);

  const element = getByTestId('ToolbarButton');
  fireEvent.mouseDown(element);

  expect(editor.children).toEqual(output.children);
});
