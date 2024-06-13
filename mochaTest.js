import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<div id="app"></div>', {
  url: 'http://localhost:3000',
});

// eslint-disable-next-line no-undef
global.window = jsdom.window;
// eslint-disable-next-line no-undef
global.document = jsdom.window.document;
// eslint-disable-next-line no-undef
global.Node = jsdom.window.Node;
// eslint-disable-next-line no-undef
global.MouseEvent = jsdom.window.MouseEvent;
