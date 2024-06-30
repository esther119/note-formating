# How to Make Rlly Cute Animation?

## Using Lottie

Lottie is a JSON-based file format used for high-quality animations. It is lightweight and easy to read and write.

### Creating and Controlling Animation

To create and control animation, you can use the `useLottie` hook and specify interactivity.

* Create an animation object: `const lottieObj = useLottie(options);`
* Specify interactivity: `useLottieInteractivity`

### Interaction Methods

You can control animations using the following interaction methods:

* `playSegments`: Play part of the animation
* `goToAndStop`: Go to a specific frame and stop the animation

### Example of Lottie JSON Structure

Here is an example of a Lottie JSON structure:
```json
{
  "v": "5.5.7",
  "fr": 30,
  "ip": 0,
  "op": 60,
  "w": 500,
  "h": 500,
  "nm": "example animation",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 0,
      "ty": 4,
      "nm": "shape layer",
      "sr": 1,
      "ks": {
        "o": {
          "a": 0,
          "k": 100
        },
        "r": {
          "a": 0,
          "k": 0
        },
        "p": {
          "a": 0,
          "k": [250, 250, 0]
        },
        "a": {
          "a": 0,
          "k": [0, 0, 0]
        },
        "s": {
          "a": 0,
          "k": [100, 100, 100]
        }
      },
      "shapes": [
        {
          "ty": "rc",
          "d": 1,
          "s": {
            "a": 0,
            "k": [100, 100]
          },
          "p": {
            "a": 0,
            "k": [0, 0]
          },
          "r": {
            "a": 0,
            "k": 0
          },
          "nm": "rectangle"
        }
      ]
    }
  ]
}
```
### Lottie Properties

Here are some common Lottie properties:

* `v`: Version of the Lottie format
* `fr`: Frame rate of the animation
* `ip`: In-point of the animation (the frame at which the animation starts)
* `op`: Out-point of the animation (the frame at which the animation ends)
* `w`: Width of the animation canvas
* `h`: Height of the animation canvas
* `nm`: Name of the animation
* `ddd`: Indicates if the animation is 3D (1) or 2D (0)
* `assets`: Array of assets used in the animation (e.g., images, precompositions)
* `layers`: Array of layers that make up the animation