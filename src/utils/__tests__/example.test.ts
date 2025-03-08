import { describe, expect, test } from '@jest/globals'
import { sum } from '../date'

// describe('sum module', () => {
//   test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3)
//   })

//   test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).not.toBe(4)
//   })

//   test('compare object', () => {
//     const obj1:any = { name: 'foo' }
//     obj1.value = '123'
//       expect(obj1).toEqual({ name: 'foo', value:'123'})
//   })
//   test('compare null', () => {
//     const newVar = undefined

//     expect(newVar).not.toBeNull()
//     expect(newVar).toBeDefined()
//     expect(newVar).not.toBeTruthy()
//     expect(newVar).toBeFalsy()
//   })
// })

// number matchers
// describe('number matchers', () => {
//   test('normal number', () => {
//     const value = 3
//     expect(value).toBeGreaterThan(2)
//     expect(value).toBeGreaterThanOrEqual(2)
//   })

//   test('float number', () => {
//     const value = 0.1 + 0.2
//     expect(value).toBeCloseTo(0.3)
//   })
// })

// string, array matchers
// describe('string matchers', () => {
//   test('test string', () => {
//     const value = 'haha123'
//     expect(value).toMatch('haha') // only use for string (similar to includes)
//   })

//   test('test array', () => {
//     const value = [1, 2, 3, 4, 5]
//     expect(value).toContain(2) // can be use for string or array
//   })
// })

// exception matchers

// const throwErrors = () => {
//   throw new Error('Error thrown!')
// }
// describe('exception matchers', () => {
//   test('exception matchers', () => {
//     expect(throwErrors).toThrow('Error thrown!')
//   })
// })
