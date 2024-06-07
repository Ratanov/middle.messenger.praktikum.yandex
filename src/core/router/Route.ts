function render(query: string, block: any) {
  const app = document.querySelector(query);
  app?.replaceChildren(block.getContent()!);
}

class Route {
  private _pathname: string;
  private _blockClass: any;
  private _block: null | any;
  private _props: {
    rootQuery: string;
  };

  constructor(pathname: string, view: any, props: { rootQuery: string }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
  }
}

export default Route;
