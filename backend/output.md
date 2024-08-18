# Debugging techniques for state discrepancy

### Use ref debugging techniques

```javascript
useEffect(() => {
  console.log("Effect running, cardsData:", cardStore.getState().cardsData);
  cardsDataRef.current = cardStore.getState().cardsData;
  // Rest of your effect logic
}, []);
```

### Why do you use ref?

- **Capturing the latest value**: 
   - The ref (cardsDataRef) allows you to capture and store the most recent value of cardsData at the time the effect runs. This is useful because refs persist across re-renders without causing additional renders themselves.

- **Comparing with future renders**: 
   - By storing the value in a ref, you can compare it with future renders or effects to see if and how the data has changed. This is particularly useful when you suspect that data might be changing rapidly or unexpectedly.

- **Accessing up-to-date values in cleanup functions**: 
   - The cleanup function of a useEffect (the function returned by the effect) closes over the values from the render where it was created. By using a ref, you ensure you're always accessing the most recent value, even in the cleanup function.

### Example usage

- **Render vs. Effect Timing**: 
   - The first console.log runs during the render phase, while the useEffect runs after the component has been painted to the screen (in the commit phase). If there's any code updating the Zustand store between these two phases, you might see a difference.

```javascript
const cardsDataRef = useRef(null);
console.log("Component rendering, cardsData:", cardStore.getState().cardsData);
useEffect(() => {
  console.log("Effect running, cardsData:", cardStore.getState().cardsData);
  cardsDataRef.current = cardStore.getState().cardsData;
  // Rest of your effect logic
}, []);
```

- Note: The component rendering is the loading when the component mounted, and it seems that useEffect data is updated slightly slower than the first mounting.

- **Example testing method to see the difference in rendering**:
```javascript
const renderData = cardStore.getState().cardsData;
console.log("Component rendering, cardsData:", renderData);
useEffect(() => {
  const effectData = cardStore.getState().cardsData;
  console.log("Effect running, cardsData:", effectData);
  console.log("Data changed:", renderData !== effectData);
  cardsDataRef.current = effectData;
  // Rest of your effect logic
}, []);
```