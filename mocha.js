import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<main id="app"></main>', {
  url: 'http://localhost:3000',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
