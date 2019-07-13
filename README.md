# Method Working Remotely

Yet Another RPC Framework :D

[![License](https://img.shields.io/github/license/mwrpub/mwrpc-js.svg?color=blue&style=flat-square)](https://github.com/mwrpub/mwrpc-js/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/mwrpc.svg?logo=npm&style=flat-square)](https://www.npmjs.com/package/mwrpc)
![npm](https://img.shields.io/npm/dt/mwrpc.svg?logo=javascript&style=flat-square)

![MWRNB](https://img.shields.io/badge/♞MWR-Freaking_Awesome-ff69b4.svg?style=flat-square)
![MWRNB](https://img.shields.io/badge/Powered_By-MWR_Engine-brightgreen.svg?style=flat-square)

Before use it.You must admit that **MaWenRui is freaking awesome.**

## JavaScript Version

> Install

```shell
npm i mwrpc
```

> Client Side

```javascript
const Mwr = require('mwrpc');

let calc = new Mwr.MwrClient({
    endpoint: 'calc'
});

calc.add(1,2).then(res=>{
    console.log(res);
});
```
