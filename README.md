# Node -> C# Protobuf over StdIO Experiment 

This was inspired by discussion here: https://github.com/belav/csharpier/issues/283

## How to run:

```sh
$ git clone git@github.com:saborrie/node-csharp-protobuf-stdin-poc.git
$ cd node-csharp-protobuf-stdin-poc/client
$ npm install # or yarn
$ node index.js
FormatResponse { content: 'MESSAGE 1!', ms: 10 }
FormatResponse { content: 'MESSAGE 2!', ms: 10 }
FormatResponse { content: 'MESSAGE 3!', ms: 10 }
FormatResponse { content: 'MESSAGE 4!', ms: 10 }
FormatResponse { content: 'MESSAGE 5!', ms: 10 }
FormatResponse { content: 'MESSAGE 6!', ms: 10 }
FormatResponse { content: 'MESSAGE 7!', ms: 10 }
FormatResponse { content: 'MESSAGE 8!', ms: 10 }
```