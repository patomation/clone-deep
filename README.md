# Clone Deep

Another deep clone algorithm for object and arrays

![flavorite](https://raw.githubusercontent.com/patomation/vanilla-starter/master/public/favicon.ico)

### Install

```
npm i @patomation/clone-deep
```

## Usage

```javascript
import {cloneDeep} from '@patomation/clone-deep'

const objA = {foo: 'bar'}
const objB = cloneDeep(objA)

const objB.foo = 'baz'

// Result
objA.foo
// 'bar'
objA.foo
// 'baz'

// NOTE objA will not be changed when making mutations to objB
```

## TypeScript usage

This module supports generic types

```typescript
interface MyObject = {
  foo: string
  bar: string
}

const myObject: MyObject = {foo: 'biz', bar: 'buz'}

const myClonedObject = cloneDeep<MyObject>(myObject)
```

### Test

```
npm run test
```

supports naming convention: moduleName.test.ts
Check out [ava](https://github.com/avajs/ava)
