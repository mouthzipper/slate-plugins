import { deserializeHTMLToMarks } from '../../utils/index';

const input = {
  plugins: [{}],
  el: document.createElement('strong'),
  children: [{ text: 'test' }],
};

const output = [{ text: 'test' }];

it('should be', () => {
  expect(deserializeHTMLToMarks(input)).toEqual(output);
});
