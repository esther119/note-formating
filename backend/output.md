# React rerendeing 

## Problem

- I can only type 1 input at a time after I put some chunk out as a separate inner component.

## Explanation

- In React, when you define a component inside another functional component, that inner component is recreated every time the outer component renders. This means:

### New Component Instance on Each Render

- React treats the inner component as a new instance on every render.

### Loss of Component State

- Any internal state or side effects within the inner component might reset.

### Input Focus Loss

- If an input field is within this redefined component, it can lose focus because React replaces the old component with a new one.