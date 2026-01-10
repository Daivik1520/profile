# Virtual Mouse - Enhanced Hand Gesture Control

A sophisticated virtual mouse application that uses computer vision and hand gesture recognition to control your computer cursor with hand movements.

## Features

### 🎯 **Advanced Gesture Recognition**
- **Index Finger**: Move cursor smoothly across the screen
- **Index + Thumb**: Left click with precise distance detection
- **Index + Middle Finger**: Right click functionality
- **Index + Ring Finger**: Scroll up/down based on finger position
- **Index + Pinky**: Drag and drop operations

### 🚀 **Enhanced Performance**
- **Smooth Movement**: Exponential smoothing for natural cursor movement
- **Click Cooldown**: Prevents accidental multiple clicks
- **High Accuracy**: Improved MediaPipe configuration for better hand tracking
- **Real-time Feedback**: Visual indicators showing gesture states

### 🎨 **Visual Interface**
- **Color-coded Landmarks**: Different colors for each finger
- **Distance Indicators**: Real-time display of finger distances
- **Status Overlay**: Shows current gesture states
- **Mirror Mode**: Natural hand movement with flipped camera view

## Installation

1. **Clone or download** this repository
2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. **Run the application**:
   ```bash
   python virtual_mouse.py
   ```

2. **Position your hand** in front of the camera
3. **Use gestures** to control your mouse:
   - Move your index finger to move the cursor
   - Bring index and thumb close together to click
   - Use other finger combinations for advanced functions
4. **Press 'q'** to quit the application

## Controls Summary

| Gesture | Action |
|---------|--------|
| Index Finger Movement | Move Cursor |
| Index + Thumb Close | Left Click |
| Index + Middle Close | Right Click |
| Index + Ring Close | Scroll |
| Index + Pinky Close | Drag |
| Press 'q' | Quit Application |

## Technical Details

### Dependencies
- **OpenCV**: Computer vision and camera handling
- **MediaPipe**: Hand landmark detection and tracking
- **PyAutoGUI**: Mouse and keyboard automation
- **NumPy**: Mathematical operations and array handling

### Configuration
The application includes several configurable parameters:
- `click_threshold`: Distance threshold for click detection (default: 25)
- `move_threshold`: Distance threshold for cursor movement (default: 100)
- `scroll_threshold`: Distance threshold for scroll detection (default: 30)
- `drag_threshold`: Distance threshold for drag detection (default: 40)
- `smoothing_factor`: Movement smoothing intensity (default: 0.7)
- `click_cooldown`: Time between clicks in seconds (default: 0.5)

## Troubleshooting

### Common Issues
1. **Camera not detected**: Ensure your webcam is connected and not being used by other applications
2. **Poor hand detection**: Ensure good lighting and keep your hand clearly visible
3. **Inaccurate gestures**: Adjust the threshold values in the code for your hand size
4. **Laggy movement**: Reduce the smoothing factor or increase camera resolution

### Performance Tips
- Use good lighting for better hand detection
- Keep your hand at a consistent distance from the camera
- Avoid rapid movements for more accurate tracking
- Close other applications that might use the camera

## Future Enhancements

Potential improvements for future versions:
- Multi-hand support
- Customizable gesture mapping
- Voice commands integration
- Keyboard shortcuts support
- Calibration system for different hand sizes
- Recording and playback of gesture sequences

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.
