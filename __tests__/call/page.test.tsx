import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
//import Page from '../../app/call/page'
//import displayText from '../../app/call/page'
import CallGame from '../../app/call/page'
import displayText from '../../app/call/page'
 
/*test('Page', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1, name: 'Climb with me' })).toBeDefined()
})*/


test('CallGame has a heading', () => {
    render(<CallGame />)
    expect(screen.getByRole('heading', { level: 1, name: 'Climb with me' })).toBeDefined()
})

test('displayText returns correct text for each limb', () => {
    expect(displayText('rightHand')).toBe('R')
    expect(displayText('leftHand')).toBe('L')
    expect(displayText('leftFoot')).toBe('left foot')
    expect(displayText('rightFoot')).toBe('right foot')
    expect(displayText('unknown')).toBeUndefined()
})