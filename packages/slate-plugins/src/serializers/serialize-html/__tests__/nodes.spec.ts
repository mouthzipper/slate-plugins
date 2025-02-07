import { ListPlugin } from '../../../elements/list/ListPlugin';
import { ParagraphPlugin } from '../../../elements/paragraph/ParagraphPlugin';
import { BoldPlugin } from '../../../marks/bold/BoldPlugin';
import { ItalicPlugin } from '../../../marks/italic/ItalicPlugin';
import { serializeHTMLFromNodes } from '../serializeHTMLFromNodes';
import { htmlStringToDOMNode } from '../utils/htmlStringToDOMNode';

it('serialize complex example list with paragraphs to html', () => {
  const render = htmlStringToDOMNode(
    serializeHTMLFromNodes([
      ItalicPlugin(),
      BoldPlugin(),
      ParagraphPlugin(),
      ListPlugin(),
    ])([
      {
        type: 'p',
        children: [
          {
            text: 'Some paragraph that contains, ',
          },
          {
            text: 'italicized text',
            italic: true,
          },
          {
            text: ' and ',
          },
          {
            text: 'bolded text',
            bold: true,
          },
          {
            text: ' is first.',
          },
        ],
      },
      {
        type: 'ul',
        children: [
          {
            type: 'li',
            children: [
              {
                type: 'p',
                children: [
                  {
                    text: 'Item one in list',
                  },
                ],
              },
            ],
          },
          {
            type: 'li',
            children: [
              {
                type: 'p',
                children: [
                  {
                    text: 'Item two in list',
                  },
                ],
              },
            ],
          },
        ],
      },
    ])
  );
  expect(render.getElementsByTagName('p').length).toEqual(3);
  expect(render.getElementsByTagName('p')[0].outerHTML).toBe(
    '<p class="slate-p">Some paragraph that contains, <em class="slate-italic">italicized text</em> and <strong class="slate-bold">bolded text</strong> is first.</p>'
  );
  expect(render.getElementsByTagName('ul').length).toEqual(1);
  expect(render.getElementsByTagName('li').length).toEqual(2);
  expect(render.getElementsByTagName('ul')[0].innerHTML).toBe(
    '<li class="slate-li"><p class="slate-p">Item one in list</p></li><li class="slate-li"><p class="slate-p">Item two in list</p></li>'
  );
});

it('serialize complex example with no type on top level node to html', () => {
  const render = serializeHTMLFromNodes([
    ItalicPlugin(),
    BoldPlugin(),
    ParagraphPlugin(),
    ListPlugin(),
  ])([
    {
      children: [
        {
          type: 'p',
          children: [
            {
              text: 'Some paragraph that contains, ',
            },
            {
              text: 'italicized text',
              italic: true,
            },
            {
              text: ' and ',
            },
            {
              text: 'bolded text',
              bold: true,
            },
            {
              text: ' is first.',
            },
          ],
        },
      ],
    },
  ]);
  expect(render).toBe(
    '<div><p class="slate-p">Some paragraph that contains, <em class="slate-italic">italicized text</em> and <strong class="slate-bold">bolded text</strong> is first.</p></div>'
  );
});

it('serialize complex example with multiple no types on top level node to html', () => {
  const render = serializeHTMLFromNodes([
    ItalicPlugin(),
    BoldPlugin(),
    ParagraphPlugin(),
    ListPlugin(),
  ])([
    {
      children: [
        {
          type: 'p',
          children: [
            {
              text: 'Some paragraph that contains, ',
            },
            {
              text: 'italicized text',
              italic: true,
            },
            {
              text: ' and ',
            },
            {
              text: 'bolded text',
              bold: true,
            },
            {
              text: ' is first.',
            },
          ],
        },
      ],
    },
    {
      children: [{ text: 'FOO', bold: true }],
    },
  ]);
  expect(render).toBe(
    '<div><p class="slate-p">Some paragraph that contains, <em class="slate-italic">italicized text</em> and <strong class="slate-bold">bolded text</strong> is first.</p></div><div><strong class="slate-bold">FOO</strong></div>'
  );
});
