# no-brn-validator

no-brn-validator is a library for validating norwegian business registration
numbers. It is tested and it is AMD (Asynchronous Module Definition) compatible.

## Installation
```
$ npm install git@github.com:cicerono/no-brn-validator-js.git
```

## Usage

### `isValid(ssn)`
```javascript
import {isValid} from 'no-brn-validator';

isValid("954492109") // => true
isValid("000000000") // => false
```

## Run tests
```
$ npm test
```

----------------------
MIT © Cicero Consulting AS
