import sinon from 'sinon';
import { expect } from 'chai';
import { HTTPTransport, METHOD } from './httpTransport';

describe('HttpTransport', () => {
  let transport: HTTPTransport;
  const host = 'https://ya-praktikum.tech/api/v2';

  beforeEach(() => {
    transport = new HTTPTransport('/test');
  });

  it('GET', async () => {
    const requestStub = sinon.stub(transport, 'request').resolves();
    const data = { get1: '1', get2: '2' };

    await transport.get('', { data });

    const expectedUrl = `${host}/test`;

    expect(
      requestStub.calledWithMatch(expectedUrl, { method: METHOD.GET, data }),
    ).to.be.true;
  });

  it('POST', async () => {
    const requestStub = sinon.stub(transport, 'request').resolves();
    const data = { post1: '1', post2: '2' };

    await transport.post('', { data });

    const expectedUrl = `${host}/test`;
    expect(
      requestStub.calledWithMatch(expectedUrl, {
        method: METHOD.POST,
        data,
      }),
    ).to.be.true;
  });

  it('PUT', async () => {
    const requestStub = sinon.stub(transport, 'request').resolves();
    const data = { put1: '1', put2: '2' };

    await transport.put('', { data });

    const expectedUrl = `${host}/test`;
    expect(
      requestStub.calledWithMatch(expectedUrl, {
        method: METHOD.PUT,
        data,
      }),
    ).to.be.true;
  });

  it('PATCH', async () => {
    const requestStub = sinon.stub(transport, 'request').resolves();
    const data = { patch1: '1', patch2: '2' };

    await transport.patch('', { data });

    const expectedUrl = `${host}/test`;
    expect(
      requestStub.calledWithMatch(expectedUrl, {
        method: METHOD.PATCH,
        data,
      }),
    ).to.be.true;
  });

  it('DELETE', async () => {
    const requestStub = sinon.stub(transport, 'request').resolves();
    const data = { delete1: '1', delete2: '2 2' };

    await transport.delete('', { data });

    const expectedUrl = `${host}/test`;

    expect(
      requestStub.calledWithMatch(expectedUrl, {
        method: METHOD.DELETE,
        data,
      }),
    ).to.be.true;
  });
});
