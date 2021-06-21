import test from 'ava'
import { cloneDeep } from './index'

const objA = { foo: 'null' }

test('assert that un cloned objects will be the same', (t) => {
  const objB = objA
  objB.foo = 'bar'
  t.deepEqual(
    objA,
    objB,
    'objA and objB should be equal because they are not cloned'
  )
})

test('however spread operator fixes top level keys', (t) => {
  const objB = { ...objA }
  objB.foo = 'xyz'
  t.notDeepEqual(objA, objB, 'objA and objB')
})

const objC = { foo: 'null', cool: { key: 'beans' } }
test('spread operator does not effect sub objects', (t) => {
  const objD = { ...objC }
  objD.cool.key = 'xyz'
  t.deepEqual(
    objC,
    objD,
    'objC and objD if properly cloned should not be the same'
  )
})

test('object with with cloneDeep', (t) => {
  const objD = cloneDeep<typeof objC, typeof objC>(objC)
  objD.cool.key = '1234'
  // Now these objects should not be equal
  t.notDeepEqual(objC, objD)
})

test('handles arrays', (t) => {
  const arrA = [[null, null, 'foo'], ['biz', 'baz', 'buz'], { cool: 'beans' }]
  const clonedArr = cloneDeep<typeof arrA, typeof arrA>(arrA)
  t.deepEqual(arrA, clonedArr)
  clonedArr.push(['test'])
  t.notDeepEqual(arrA, clonedArr)
})

test('handles objects in arrays', (t) => {
  const arrA: {
    arr: (string | number)[]
    buz: number[][]
    test: null | string[]
  } = { arr: ['1', '2', 3], buz: [[1], [2], [3]], test: null }
  const clonedArr = cloneDeep<typeof arrA>(arrA)
  t.deepEqual(arrA, clonedArr)
  clonedArr.test = ['test']
  t.notDeepEqual(arrA, clonedArr)
})

test('handles Date objects without stripping them', (t) => {
  const datWithObj = { myDate: new Date() }
  const clonedDatWithObj = cloneDeep(datWithObj)
  t.deepEqual(datWithObj, clonedDatWithObj)
})
