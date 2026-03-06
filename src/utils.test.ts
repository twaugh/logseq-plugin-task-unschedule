import { describe, it, expect } from 'vitest'
import { hasScheduledInContent, isCompletedTodo } from './utils'

describe('hasScheduledInContent', () => {
  it('returns true for a simple scheduled task', () => {
    expect(hasScheduledInContent('SCHEDULED: <2024-01-15 Mon>')).toBe(true)
  })

  it('returns true for scheduled with time', () => {
    expect(hasScheduledInContent('SCHEDULED: <2024-01-15 Mon 10:00>')).toBe(true)
  })

  it('returns true when SCHEDULED is on a later line', () => {
    expect(hasScheduledInContent('Some task\nSCHEDULED: <2024-01-15 Mon>')).toBe(true)
  })

  it('returns false for no SCHEDULED', () => {
    expect(hasScheduledInContent('Just a regular block')).toBe(false)
  })

  it('returns false for .+ repeater', () => {
    expect(hasScheduledInContent('SCHEDULED: <2024-01-15 Mon .+1w>')).toBe(false)
  })

  it('returns false for ++ repeater', () => {
    expect(hasScheduledInContent('SCHEDULED: <2024-01-15 Mon ++1d>')).toBe(false)
  })

  it('returns false for + repeater', () => {
    expect(hasScheduledInContent('SCHEDULED: <2024-01-15 Mon +1m>')).toBe(false)
  })

  it('returns false for repeater with larger number', () => {
    expect(hasScheduledInContent('SCHEDULED: <2024-01-15 Mon .+2w>')).toBe(false)
  })

  it('handles all time units', () => {
    for (const unit of ['h', 'd', 'w', 'm', 'y']) {
      expect(hasScheduledInContent(`SCHEDULED: <2024-01-15 Mon +1${unit}>`)).toBe(false)
    }
  })

  it('returns true for scheduled with timezone offset (not a repeater)', () => {
    expect(hasScheduledInContent('SCHEDULED: <2024-01-15 Mon 10:00 +0530>')).toBe(true)
  })

  it('returns true for scheduled with negative timezone offset', () => {
    expect(hasScheduledInContent('SCHEDULED: <2024-01-15 Mon 10:00 -0500>')).toBe(true)
  })
})

describe('isCompletedTodo', () => {
  it('returns true for DONE', () => {
    expect(isCompletedTodo('DONE some task')).toBe(true)
  })

  it('returns true for COMPLETED', () => {
    expect(isCompletedTodo('COMPLETED some task')).toBe(true)
  })

  it('returns true for CANCELED', () => {
    expect(isCompletedTodo('CANCELED some task')).toBe(true)
  })

  it('returns true for CANCELLED', () => {
    expect(isCompletedTodo('CANCELLED some task')).toBe(true)
  })

  it('returns true for [x] checkbox', () => {
    expect(isCompletedTodo('[x] some task')).toBe(true)
  })

  it('returns false for TODO', () => {
    expect(isCompletedTodo('TODO some task')).toBe(false)
  })

  it('returns false for empty string', () => {
    expect(isCompletedTodo('')).toBe(false)
  })

  it('returns false for DOING', () => {
    expect(isCompletedTodo('DOING some task')).toBe(false)
  })
})
