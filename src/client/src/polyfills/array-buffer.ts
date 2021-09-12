FileReader.prototype.readAsArrayBuffer = function (blob: Blob) {
    if (this.readyState === this.LOADING) throw new Error("InvalidStateError");
    // @ts-ignore
    this._setReadyState(this.LOADING);
    // @ts-ignore
    this._result = null;
    // @ts-ignore
    this._error = null;
    const fr = new FileReader();
    fr.onloadend = () => {
        // @ts-ignore
        const content = atob(fr.result.substr("data:application/octet-stream;base64,".length));
        const buffer = new ArrayBuffer(content.length);
        const view = new Uint8Array(buffer);
        view.set(Array.from(content).map(c => c.charCodeAt(0)));
        // @ts-ignore
        this._result = buffer;
        // @ts-ignore
        this._setReadyState(this.DONE);
    };
    fr.readAsDataURL(blob);
};
//
// Blob.prototype.arrayBuffer = function () {
//     //@ts-ignore
//     return Promise.resolve(this._buffer.buffer || this._buffer);
// };