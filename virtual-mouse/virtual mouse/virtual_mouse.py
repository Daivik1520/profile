import cv2
import mediapipe as mp
import pyautogui
import numpy as np
import time
import subprocess
import os
import speech_recognition as sr
import pyttsx3
from collections import deque
import threading
import tkinter as tk
from tkinter import messagebox
import json

class VirtualMouse:
    def __init__(self):
        # Initialize camera and hand detection
        try:
            # Enable OpenCV optimizations
            cv2.setUseOptimized(True)
            cv2.setNumThreads(2)
        except Exception:
            pass
        self.cap = cv2.VideoCapture(0)
        if not self.cap.isOpened():
            print("Error: Could not open camera. Please check camera permissions.")
            print("On macOS: Go to System Preferences > Security & Privacy > Privacy > Camera")
            print("Make sure Terminal or your Python application has camera access.")
            exit(1)
        
        # Prefer lower resolution for reduced processing latency
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        # Reduce internal buffering where supported to avoid stale frames
        try:
            self.cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
        except Exception:
            pass
        
        # MediaPipe setup
        self.mp_hands = mp.solutions.hands
        # Use lower model complexity for faster inference
        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=1,
            min_detection_confidence=0.7,
            min_tracking_confidence=0.5,
            model_complexity=0
        )
        self.mp_drawing = mp.solutions.drawing_utils
        
        # Screen dimensions
        self.screen_width, self.screen_height = pyautogui.size()
        
        # Mouse control parameters
        self.click_threshold = 25
        self.move_threshold = 100
        self.scroll_threshold = 30
        self.drag_threshold = 40  # legacy single threshold (kept for compatibility)
        # Easier and more stable drag with hysteresis and small debounce
        self.drag_start_threshold = 55  # start dragging when index+pinky distance < 55
        self.drag_end_threshold = 80    # stop dragging when distance > 80
        self.drag_debounce_frames = 3   # require gesture condition for N frames to avoid flicker
        self._drag_on_counter = 0
        self._drag_off_counter = 0
        self.volume_threshold = 35
        self.keyboard_threshold = 30
        
        # Smoothing for mouse movement
        # Lower smoothing for snappier cursor response (tunable)
        self.smoothing_factor = 0.3
        self.prev_x, self.prev_y = 0, 0
        
        # Gesture state tracking
        self.is_clicking = False
        self.is_dragging = False
        self.is_scrolling = False
        self.is_volume_control = False
        self.is_keyboard_mode = False
        self.is_voice_mode = False
        self.last_click_time = 0
        self.click_cooldown = 0.3  # seconds
        
        # Movement smoothing buffer
        # Keep a small movement buffer to avoid over-smoothing
        self.movement_buffer = deque(maxlen=3)
        
        # Voice recognition setup
        try:
            self.recognizer = sr.Recognizer()
            self.microphone = sr.Microphone()
            self.tts_engine = pyttsx3.init()
            self.voice_enabled = True
        except:
            self.voice_enabled = False
            print("Voice features disabled - microphone not available")
        
        # Keyboard shortcuts mapping
        self.keyboard_shortcuts = {
            'copy': 'cmd+c',
            'paste': 'cmd+v',
            'cut': 'cmd+x',
            'undo': 'cmd+z',
            'redo': 'cmd+shift+z',
            'save': 'cmd+s',
            'open': 'cmd+o',
            'new': 'cmd+n',
            'close': 'cmd+w',
            'quit': 'cmd+q',
            'find': 'cmd+f',
            'select_all': 'cmd+a',
            'print': 'cmd+p',
            'zoom_in': 'cmd+plus',
            'zoom_out': 'cmd+minus',
            'fullscreen': 'cmd+ctrl+f',
            'screenshot': 'cmd+shift+3',
            'desktop': 'cmd+f3',
            'mission_control': 'ctrl+up',
            'app_switcher': 'cmd+tab'
        }
        
        # Volume control
        self.volume_step = 5
        self.current_volume = 50
        
        # Colors for visualization
        self.colors = {
            'index': (0, 255, 255),    # Yellow
            'thumb': (255, 0, 0),      # Blue
            'middle': (0, 255, 0),     # Green
            'ring': (255, 0, 255),     # Magenta
            'pinky': (0, 0, 255),      # Red
            'palm': (255, 255, 0),     # Cyan
            'wrist': (128, 128, 128)   # Gray
        }
        
        # Mode indicators
        self.modes = {
            'mouse': True,
            'keyboard': False,
            'volume': False,
            'voice': False,
            'app_launcher': False
        }
        
        # Application launcher
        self.apps = {
            'safari': 'Safari',
            'chrome': 'Google Chrome',
            'finder': 'Finder',
            'terminal': 'Terminal',
            'calculator': 'Calculator',
            'notes': 'Notes',
            'mail': 'Mail',
            'calendar': 'Calendar',
            'photos': 'Photos',
            'music': 'Music'
        }
        
        # Settings
        # Runtime settings, including performance-focused toggles
        self.settings = {
            'sensitivity': 2.0,
            'smoothing': 0.3,
            'click_delay': 0.3,
            'voice_feedback': True,
            'performance_mode': True,
            'show_overlay': False,
            'show_usage': True,
            # Safer defaults to avoid unintended actions
            'apps_enabled': False,
            'voice_commands_enabled': False,
            'shortcuts_enabled': False,
            'app_launcher_hold_seconds': 1.0
        }

        # Minimize PyAutoGUI's built-in pause for faster actions
        try:
            pyautogui.PAUSE = 0
        except Exception:
            pass

        # Frame capture thread to always provide the freshest frame
        self.latest_frame = None
        self.frame_lock = threading.Lock()
        self.running = False
        # Debounce timers
        self.app_launcher_detected_since = None
        
        self.load_settings()
        self.print_controls()

        # Apply performance settings right away
        self.apply_performance_settings()

    def apply_performance_settings(self):
        """Apply performance-mode preferences (overlay, smoothing, voice)."""
        if self.settings.get('performance_mode', False):
            self.settings['show_overlay'] = False
            self.settings['voice_feedback'] = False
            self.smoothing_factor = self.settings.get('smoothing', 0.3)
        else:
            self.smoothing_factor = self.settings.get('smoothing', 0.7)

    def draw_usage_overlay(self, frame):
        """Draw always-visible usage instructions on the UI."""
        try:
            lines = [
                "Controls:",
                "Index finger: Move cursor",
                "Index + Thumb: Left Click",
                "Index + Middle: Right Click",
                "Index + Ring: Scroll",
                "Index + Pinky: Drag",
                "q: Quit  s: Settings  h: Help  r: Reset",
                "o: Overlay  p: Performance  u: Usage",
                "a: Apps ON/OFF  v: Voice ON/OFF  k: Shortcuts ON/OFF",
            ]

            # Panel size and position (top-left)
            x0, y0 = 8, 8
            width, line_h = 420, 22
            height = line_h * (len(lines) + 1)

            # Semi-transparent background
            overlay = frame.copy()
            cv2.rectangle(overlay, (x0, y0), (x0 + width, y0 + height), (0, 0, 0), -1)
            cv2.addWeighted(overlay, 0.5, frame, 0.5, 0, frame)

            # Draw text lines
            for i, text in enumerate(lines):
                y = y0 + 24 + i * line_h
                cv2.putText(frame, text, (x0 + 10, y), cv2.FONT_HERSHEY_SIMPLEX,
                            0.55, (255, 255, 255), 1, cv2.LINE_AA)
        except Exception:
            # Fail silently if drawing fails, to avoid crashing the loop
            pass

    def start_capture_thread(self):
        """Start a background thread that continually grabs the latest camera frame."""
        self.running = True

        def _reader():
            while self.running:
                ret, frame = self.cap.read()
                if not ret:
                    continue
                with self.frame_lock:
                    # Keep only the most recent frame to avoid latency
                    self.latest_frame = frame
        t = threading.Thread(target=_reader, daemon=True)
        t.start()

    def get_latest_frame(self):
        """Return the most recent frame captured by the thread."""
        with self.frame_lock:
            if self.latest_frame is None:
                return None
            # Return a copy to avoid race conditions
            return self.latest_frame.copy()

    def print_controls(self):
        """Print comprehensive control instructions"""
        print("🎯 ENHANCED VIRTUAL MOUSE - FULL DEVICE CONTROL")
        print("=" * 50)
        print("🖱️  BASIC MOUSE CONTROLS:")
        print("   • Index finger: Move cursor")
        print("   • Index + Thumb close: Left click")
        print("   • Index + Middle close: Right click")
        print("   • Index + Ring close: Scroll")
        print("   • Index + Pinky close: Drag")
        print()
        print("⌨️  KEYBOARD SHORTCUTS (Index + Middle + Ring):")
        print("   • Thumb up: Copy (Cmd+C)")
        print("   • Thumb down: Paste (Cmd+V)")
        print("   • Thumb left: Cut (Cmd+X)")
        print("   • Thumb right: Undo (Cmd+Z)")
        print()
        print("🔊 VOLUME CONTROL (Index + Middle + Pinky):")
        print("   • Thumb up: Volume up")
        print("   • Thumb down: Volume down")
        print("   • Thumb left: Mute/Unmute")
        print()
        print("🎤 VOICE COMMANDS (Index + Ring + Pinky):")
        print("   • Say: 'Open Safari', 'Close window', 'Take screenshot'")
        print("   • Say: 'Copy', 'Paste', 'Save', 'Print'")
        print("   • Say: 'Volume up', 'Volume down', 'Mute'")
        print()
        print("🚀 APP LAUNCHER (All fingers extended):")
        print("   • Thumb up: Safari")
        print("   • Thumb down: Finder")
        print("   • Thumb left: Terminal")
        print("   • Thumb right: Calculator")
        print()
        print("⚙️  SYSTEM CONTROLS:")
        print("   • Press 'q' or ESC: Quit application")
        print("   • Press 's': Settings menu")
        print("   • Press 'h': Help/Controls")
        print("   • Press 'r': Reset to mouse mode")
        print("   • Make a fist (hold 2 sec): Emergency quit")
        print("   • Close window: Quit application")
        print("=" * 50)

    def load_settings(self):
        """Load settings from file"""
        try:
            if os.path.exists('virtual_mouse_settings.json'):
                with open('virtual_mouse_settings.json', 'r') as f:
                    saved_settings = json.load(f)
                    self.settings.update(saved_settings)
        except:
            pass

    def save_settings(self):
        """Save settings to file"""
        try:
            with open('virtual_mouse_settings.json', 'w') as f:
                json.dump(self.settings, f, indent=2)
        except:
            pass

    def speak(self, text):
        """Text to speech feedback"""
        if self.voice_enabled and self.settings['voice_feedback']:
            try:
                self.tts_engine.say(text)
                self.tts_engine.runAndWait()
            except:
                pass

    def execute_keyboard_shortcut(self, shortcut_name):
        """Execute keyboard shortcuts"""
        if shortcut_name in self.keyboard_shortcuts:
            shortcut = self.keyboard_shortcuts[shortcut_name]
            try:
                pyautogui.hotkey(*shortcut.split('+'))
                self.speak(f"Executed {shortcut_name}")
                print(f"⌨️  Executed: {shortcut_name} ({shortcut})")
            except Exception as e:
                print(f"Error executing {shortcut_name}: {e}")

    def control_volume(self, action):
        """Control system volume"""
        try:
            if action == 'up':
                subprocess.run(['osascript', '-e', 'set volume output volume (output volume of (get volume settings) + 10)'])
                self.speak("Volume increased")
            elif action == 'down':
                subprocess.run(['osascript', '-e', 'set volume output volume (output volume of (get volume settings) - 10)'])
                self.speak("Volume decreased")
            elif action == 'mute':
                subprocess.run(['osascript', '-e', 'set volume output muted not (output muted of (get volume settings))'])
                self.speak("Volume toggled")
            print(f"🔊 Volume: {action}")
        except Exception as e:
            print(f"Volume control error: {e}")

    def launch_application(self, app_name):
        """Launch applications"""
        if app_name in self.apps:
            app_path = self.apps[app_name]
            try:
                subprocess.run(['open', '-a', app_path])
                self.speak(f"Opening {app_path}")
                print(f"🚀 Launched: {app_path}")
            except Exception as e:
                print(f"Error launching {app_path}: {e}")

    def process_voice_command(self, command):
        """Process voice commands"""
        command = command.lower()
        
        # App launching
        if 'open' in command:
            for app_key, app_name in self.apps.items():
                if app_key in command:
                    self.launch_application(app_key)
                    return
        
        # Keyboard shortcuts
        if 'copy' in command:
            self.execute_keyboard_shortcut('copy')
        elif 'paste' in command:
            self.execute_keyboard_shortcut('paste')
        elif 'cut' in command:
            self.execute_keyboard_shortcut('cut')
        elif 'undo' in command:
            self.execute_keyboard_shortcut('undo')
        elif 'save' in command:
            self.execute_keyboard_shortcut('save')
        elif 'print' in command:
            self.execute_keyboard_shortcut('print')
        elif 'screenshot' in command:
            self.execute_keyboard_shortcut('screenshot')
        
        # Volume control
        elif 'volume up' in command:
            self.control_volume('up')
        elif 'volume down' in command:
            self.control_volume('down')
        elif 'mute' in command:
            self.control_volume('mute')
        
        # Window management
        elif 'close window' in command:
            self.execute_keyboard_shortcut('close')
        elif 'new window' in command:
            self.execute_keyboard_shortcut('new')
        elif 'fullscreen' in command:
            self.execute_keyboard_shortcut('fullscreen')
        elif 'desktop' in command:
            self.execute_keyboard_shortcut('desktop')

    def listen_for_voice(self):
        """Listen for voice commands in a separate thread"""
        if not self.voice_enabled:
            return
        
        try:
            with self.microphone as source:
                self.recognizer.adjust_for_ambient_noise(source)
                audio = self.recognizer.listen(source, timeout=1, phrase_time_limit=3)
                command = self.recognizer.recognize_google(audio)
                self.process_voice_command(command)
        except:
            pass

    def get_landmark_coords(self, landmarks, landmark_id, frame_width, frame_height):
        """Get coordinates of a specific landmark"""
        landmark = landmarks[landmark_id]
        x = int(landmark.x * frame_width)
        y = int(landmark.y * frame_height)
        return x, y

    def calculate_distance(self, x1, y1, x2, y2):
        """Calculate Euclidean distance between two points"""
        return np.sqrt((x2 - x1)**2 + (y2 - y1)**2)

    def smooth_movement(self, x, y):
        """Apply smoothing to mouse movement"""
        if self.prev_x == 0 and self.prev_y == 0:
            self.prev_x, self.prev_y = x, y
            return x, y
        
        # Apply exponential smoothing
        smooth_x = int(self.prev_x * self.smoothing_factor + x * (1 - self.smoothing_factor))
        smooth_y = int(self.prev_y * self.smoothing_factor + y * (1 - self.smoothing_factor))
        
        self.prev_x, self.prev_y = smooth_x, smooth_y
        return smooth_x, smooth_y

    def convert_to_screen_coords(self, x, y, frame_width, frame_height):
        """Convert frame coordinates to screen coordinates"""
        screen_x = int((x / frame_width) * self.screen_width)
        screen_y = int((y / frame_height) * self.screen_height)
        return screen_x, screen_y

    def detect_gestures(self, landmarks, frame_width, frame_height):
        """Detect various hand gestures"""
        # Get landmark coordinates
        index_x, index_y = self.get_landmark_coords(landmarks, 8, frame_width, frame_height)
        thumb_x, thumb_y = self.get_landmark_coords(landmarks, 4, frame_width, frame_height)
        middle_x, middle_y = self.get_landmark_coords(landmarks, 12, frame_width, frame_height)
        ring_x, ring_y = self.get_landmark_coords(landmarks, 16, frame_width, frame_height)
        pinky_x, pinky_y = self.get_landmark_coords(landmarks, 20, frame_width, frame_height)
        wrist_x, wrist_y = self.get_landmark_coords(landmarks, 0, frame_width, frame_height)
        
        # Calculate distances
        index_thumb_dist = self.calculate_distance(index_x, index_y, thumb_x, thumb_y)
        index_middle_dist = self.calculate_distance(index_x, index_y, middle_x, middle_y)
        index_ring_dist = self.calculate_distance(index_x, index_y, ring_x, ring_y)
        index_pinky_dist = self.calculate_distance(index_x, index_y, pinky_x, pinky_y)
        middle_ring_dist = self.calculate_distance(middle_x, middle_y, ring_x, ring_y)
        ring_pinky_dist = self.calculate_distance(ring_x, ring_y, pinky_x, pinky_y)
        middle_pinky_dist = self.calculate_distance(middle_x, middle_y, pinky_x, pinky_y)
        
        # Detect finger states (extended or not)
        thumb_extended = thumb_x > wrist_x  # Thumb is to the right of wrist
        index_extended = index_y < middle_y  # Index is above middle
        middle_extended = middle_y < ring_y  # Middle is above ring
        ring_extended = ring_y < pinky_y  # Ring is above pinky
        pinky_extended = pinky_y < wrist_y  # Pinky is above wrist
        
        # Convert to screen coordinates
        screen_x, screen_y = self.convert_to_screen_coords(index_x, index_y, frame_width, frame_height)
        screen_x, screen_y = self.smooth_movement(screen_x, screen_y)
        
        return {
            'index_pos': (index_x, index_y),
            'thumb_pos': (thumb_x, thumb_y),
            'middle_pos': (middle_x, middle_y),
            'ring_pos': (ring_x, ring_y),
            'pinky_pos': (pinky_x, pinky_y),
            'wrist_pos': (wrist_x, wrist_y),
            'screen_pos': (screen_x, screen_y),
            'distances': {
                'index_thumb': index_thumb_dist,
                'index_middle': index_middle_dist,
                'index_ring': index_ring_dist,
                'index_pinky': index_pinky_dist,
                'middle_ring': middle_ring_dist,
                'ring_pinky': ring_pinky_dist,
                'middle_pinky': middle_pinky_dist
            },
            'finger_states': {
                'thumb': thumb_extended,
                'index': index_extended,
                'middle': middle_extended,
                'ring': ring_extended,
                'pinky': pinky_extended
            }
        }

    def execute_gestures(self, gesture_data):
        """Execute actions based on detected gestures"""
        current_time = time.time()
        distances = gesture_data['distances']
        finger_states = gesture_data['finger_states']
        screen_x, screen_y = gesture_data['screen_pos']
        
        # Detect gesture modes
        keyboard_mode = (distances['index_middle'] < self.keyboard_threshold and 
                        distances['middle_ring'] < self.keyboard_threshold)
        volume_mode = (distances['index_middle'] < self.volume_threshold and 
                      distances['middle_pinky'] < self.volume_threshold)
        voice_mode = (distances['index_ring'] < self.volume_threshold and 
                     distances['ring_pinky'] < self.volume_threshold)
        app_launcher_mode = (finger_states['index'] and finger_states['middle'] and 
                           finger_states['ring'] and finger_states['pinky'])
        
        # Basic mouse mode (default)
        if not any([keyboard_mode, volume_mode, voice_mode, app_launcher_mode]):
            self.modes['mouse'] = True
            self.modes['keyboard'] = False
            self.modes['volume'] = False
            self.modes['voice'] = False
            self.modes['app_launcher'] = False
            
            # Move cursor
            if distances['index_thumb'] > self.move_threshold:
                pyautogui.moveTo(screen_x, screen_y)
            
            # Left click (index + thumb)
            if (distances['index_thumb'] < self.click_threshold and 
                current_time - self.last_click_time > self.click_cooldown):
                pyautogui.click()
                self.last_click_time = current_time
                self.is_clicking = True
                print("🖱️  Left click executed")
            
            # Right click (index + middle)
            elif (distances['index_middle'] < self.click_threshold and 
                  current_time - self.last_click_time > self.click_cooldown):
                pyautogui.rightClick()
                self.last_click_time = current_time
                print("🖱️  Right click executed")
            
            # Scroll (index + ring)
            elif distances['index_ring'] < self.scroll_threshold:
                if not self.is_scrolling:
                    # Determine scroll direction based on finger position
                    if gesture_data['ring_pos'][1] < gesture_data['index_pos'][1]:
                        pyautogui.scroll(1)  # Scroll up
                    else:
                        pyautogui.scroll(-1)  # Scroll down
                    self.is_scrolling = True
                    print("🖱️  Scroll executed")
            
            # Drag (index + pinky) with hysteresis and debounce to make it easier and stable
            drag_dist = distances['index_pinky']
            if not self.is_dragging:
                if drag_dist < self.drag_start_threshold:
                    self._drag_on_counter += 1
                else:
                    self._drag_on_counter = 0
                if self._drag_on_counter >= self.drag_debounce_frames:
                    pyautogui.mouseDown()
                    self.is_dragging = True
                    self._drag_on_counter = 0
                    self._drag_off_counter = 0
                    print("🖱️  Drag started")
            else:
                if drag_dist > self.drag_end_threshold:
                    self._drag_off_counter += 1
                else:
                    self._drag_off_counter = 0
                if self._drag_off_counter >= self.drag_debounce_frames:
                    pyautogui.mouseUp()
                    self.is_dragging = False
                    self._drag_off_counter = 0
                    print("🖱️  Drag ended")

            # Reset non-drag gesture flags (keep drag state independent)
            self.is_clicking = False
            self.is_scrolling = False
        
        # Keyboard shortcuts mode
        elif keyboard_mode and self.settings.get('shortcuts_enabled', True):
            self.modes['keyboard'] = True
            self.modes['mouse'] = False
            
            if current_time - self.last_click_time > self.click_cooldown:
                # Thumb direction determines shortcut
                thumb_pos = gesture_data['thumb_pos']
                wrist_pos = gesture_data['wrist_pos']
                
                if thumb_pos[1] < wrist_pos[1] - 20:  # Thumb up
                    self.execute_keyboard_shortcut('copy')
                elif thumb_pos[1] > wrist_pos[1] + 20:  # Thumb down
                    self.execute_keyboard_shortcut('paste')
                elif thumb_pos[0] < wrist_pos[0] - 20:  # Thumb left
                    self.execute_keyboard_shortcut('cut')
                elif thumb_pos[0] > wrist_pos[0] + 20:  # Thumb right
                    self.execute_keyboard_shortcut('undo')
                
                self.last_click_time = current_time
        
        # Volume control mode
        elif volume_mode:
            self.modes['volume'] = True
            self.modes['mouse'] = False
            
            if current_time - self.last_click_time > self.click_cooldown:
                thumb_pos = gesture_data['thumb_pos']
                wrist_pos = gesture_data['wrist_pos']
                
                if thumb_pos[1] < wrist_pos[1] - 20:  # Thumb up
                    self.control_volume('up')
                elif thumb_pos[1] > wrist_pos[1] + 20:  # Thumb down
                    self.control_volume('down')
                elif thumb_pos[0] < wrist_pos[0] - 20:  # Thumb left
                    self.control_volume('mute')
                
                self.last_click_time = current_time
        
        # Voice command mode
        elif voice_mode and self.settings.get('voice_commands_enabled', False):
            self.modes['voice'] = True
            self.modes['mouse'] = False
            
            if current_time - self.last_click_time > 2.0:  # Longer cooldown for voice
                # Start voice recognition in a separate thread
                if self.voice_enabled:
                    threading.Thread(target=self.listen_for_voice, daemon=True).start()
                self.last_click_time = current_time
        
        # App launcher mode
        elif app_launcher_mode and self.settings.get('apps_enabled', False):
            self.modes['app_launcher'] = True
            self.modes['mouse'] = False

            # Require the gesture to be held for a configurable duration
            if self.app_launcher_detected_since is None:
                self.app_launcher_detected_since = current_time

            hold_ok = (current_time - self.app_launcher_detected_since) >= self.settings.get('app_launcher_hold_seconds', 1.0)
            cooldown_ok = (current_time - self.last_click_time) > self.click_cooldown
            if hold_ok and cooldown_ok:
                thumb_pos = gesture_data['thumb_pos']
                wrist_pos = gesture_data['wrist_pos']

                # Stronger thumb-direction thresholds to reduce false positives
                if thumb_pos[1] < wrist_pos[1] - 40:  # Thumb up
                    self.launch_application('safari')
                elif thumb_pos[1] > wrist_pos[1] + 40:  # Thumb down
                    self.launch_application('finder')
                elif thumb_pos[0] < wrist_pos[0] - 40:  # Thumb left
                    self.launch_application('terminal')
                elif thumb_pos[0] > wrist_pos[0] + 40:  # Thumb right
                    self.launch_application('calculator')

                self.last_click_time = current_time
        else:
            # Reset app launcher debounce when not in app launcher mode
            self.app_launcher_detected_since = None
        
        # Emergency quit gesture: All fingers closed (fist)
        if (not finger_states['index'] and not finger_states['middle'] and 
            not finger_states['ring'] and not finger_states['pinky'] and 
            not finger_states['thumb']):
            if current_time - self.last_click_time > 2.0:  # Hold fist for 2 seconds
                print("🛑 Emergency quit gesture detected!")
                self.speak("Emergency quit activated")
                return 'quit'

    def draw_landmarks_and_info(self, frame, gesture_data):
        """Draw hand landmarks and comprehensive gesture information on frame"""
        frame_height, frame_width = frame.shape[:2]
        
        # Draw landmarks with enhanced visualization
        for pos_name, pos_value in gesture_data.items():
            if pos_name.endswith('_pos') and pos_name != 'screen_pos' and isinstance(pos_value, tuple):
                x, y = pos_value
                color = self.colors.get(pos_name.split('_')[0], (255, 255, 255))
                cv2.circle(frame, (x, y), 10, color, -1)
                cv2.circle(frame, (x, y), 15, color, 2)
                
                # Add finger labels
                finger_name = pos_name.split('_')[0].title()
                cv2.putText(frame, finger_name, (x + 20, y - 10), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
        
        # Draw mode indicators with background
        mode_y = 30
        mode_height = 25
        
        # Current active mode
        active_mode = None
        for mode, active in self.modes.items():
            if active:
                active_mode = mode
                break
        
        if active_mode:
            # Draw mode background
            cv2.rectangle(frame, (10, mode_y - 5), (300, mode_y + mode_height), (0, 0, 0), -1)
            cv2.rectangle(frame, (10, mode_y - 5), (300, mode_y + mode_height), (0, 255, 0), 2)
            
            mode_icons = {
                'mouse': '🖱️  MOUSE MODE',
                'keyboard': '⌨️  KEYBOARD MODE',
                'volume': '🔊 VOLUME MODE',
                'voice': '🎤 VOICE MODE',
                'app_launcher': '🚀 APP LAUNCHER'
            }
            
            cv2.putText(frame, mode_icons.get(active_mode, 'UNKNOWN MODE'), 
                       (15, mode_y + 15), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
        
        # Draw gesture status indicators
        status_y = mode_y + 40
        distances = gesture_data['distances']
        finger_states = gesture_data['finger_states']
        
        # Mouse gestures
        cv2.putText(frame, f"Click: {distances['index_thumb'] < self.click_threshold}", 
                   (10, status_y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
        cv2.putText(frame, f"Drag: {distances['index_pinky'] < self.drag_threshold}", 
                   (10, status_y + 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
        cv2.putText(frame, f"Scroll: {distances['index_ring'] < self.scroll_threshold}", 
                   (10, status_y + 40), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
        
        # Mode activation indicators
        cv2.putText(frame, f"Keyboard: {distances['index_middle'] < self.keyboard_threshold and distances['middle_ring'] < self.keyboard_threshold}", 
                   (10, status_y + 60), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 0), 1)
        cv2.putText(frame, f"Volume: {distances['index_middle'] < self.volume_threshold and distances['middle_pinky'] < self.volume_threshold}", 
                   (10, status_y + 80), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 0), 1)
        cv2.putText(frame, f"Voice: {distances['index_ring'] < self.volume_threshold and distances['ring_pinky'] < self.volume_threshold}", 
                   (10, status_y + 100), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 0), 1)
        cv2.putText(frame, f"Apps: {all(finger_states.values())}", 
                   (10, status_y + 120), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 0), 1)
        
        # Draw finger state indicators
        finger_y = status_y + 150
        cv2.putText(frame, "Finger States:", (10, finger_y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)
        for i, (finger, extended) in enumerate(finger_states.items()):
            color = (0, 255, 0) if extended else (0, 0, 255)
            cv2.putText(frame, f"{finger.title()}: {'Extended' if extended else 'Closed'}", 
                       (10, finger_y + 20 + i * 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)
        
        # Draw distance indicators with lines
        index_pos = gesture_data['index_pos']
        thumb_pos = gesture_data['thumb_pos']
        
        # Draw connection lines
        cv2.line(frame, index_pos, thumb_pos, (255, 255, 255), 2)
        cv2.putText(frame, f"Dist: {distances['index_thumb']:.0f}", 
                   (index_pos[0] + 10, index_pos[1] - 10), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        
        # Draw instructions overlay
        instructions = [
            "Press 'q' to quit",
            "Press 's' for settings",
            "Press 'h' for help"
        ]
        
        for i, instruction in enumerate(instructions):
            cv2.putText(frame, instruction, 
                       (frame_width - 200, frame_height - 60 + i * 20), 
                       cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)

    def show_settings(self):
        """Show settings dialog"""
        root = tk.Tk()
        root.title("Virtual Mouse Settings")
        root.geometry("400x300")
        
        # Sensitivity setting
        tk.Label(root, text="Sensitivity:").pack(pady=5)
        sensitivity_var = tk.DoubleVar(value=self.settings['sensitivity'])
        sensitivity_scale = tk.Scale(root, from_=0.1, to=2.0, resolution=0.1, 
                                   orient=tk.HORIZONTAL, variable=sensitivity_var)
        sensitivity_scale.pack(pady=5)
        
        # Smoothing setting
        tk.Label(root, text="Smoothing:").pack(pady=5)
        smoothing_var = tk.DoubleVar(value=self.settings['smoothing'])
        smoothing_scale = tk.Scale(root, from_=0.1, to=1.0, resolution=0.1, 
                                 orient=tk.HORIZONTAL, variable=smoothing_var)
        smoothing_scale.pack(pady=5)
        
        # Voice feedback setting
        voice_var = tk.BooleanVar(value=self.settings['voice_feedback'])
        voice_check = tk.Checkbutton(root, text="Voice Feedback", variable=voice_var)
        voice_check.pack(pady=5)
        
        def save_settings():
            self.settings['sensitivity'] = sensitivity_var.get()
            self.settings['smoothing'] = smoothing_var.get()
            self.settings['voice_feedback'] = voice_var.get()
            self.smoothing_factor = self.settings['smoothing']
            self.save_settings()
            root.destroy()
            print("Settings saved!")
        
        tk.Button(root, text="Save Settings", command=save_settings).pack(pady=20)
        tk.Button(root, text="Cancel", command=root.destroy).pack(pady=5)
        
        root.mainloop()

    def show_help(self):
        """Show help dialog"""
        help_text = """
🎯 ENHANCED VIRTUAL MOUSE - COMPLETE DEVICE CONTROL

🖱️  BASIC MOUSE CONTROLS:
• Index finger: Move cursor
• Index + Thumb close: Left click
• Index + Middle close: Right click
• Index + Ring close: Scroll
• Index + Pinky close: Drag

⌨️  KEYBOARD SHORTCUTS (Index + Middle + Ring):
• Thumb up: Copy (Cmd+C)
• Thumb down: Paste (Cmd+V)
• Thumb left: Cut (Cmd+X)
• Thumb right: Undo (Cmd+Z)

🔊 VOLUME CONTROL (Index + Middle + Pinky):
• Thumb up: Volume up
• Thumb down: Volume down
• Thumb left: Mute/Unmute

🎤 VOICE COMMANDS (Index + Ring + Pinky):
• Say: 'Open Safari', 'Close window', 'Take screenshot'
• Say: 'Copy', 'Paste', 'Save', 'Print'
• Say: 'Volume up', 'Volume down', 'Mute'

🚀 APP LAUNCHER (All fingers extended):
• Thumb up: Safari
• Thumb down: Finder
• Thumb left: Terminal
• Thumb right: Calculator

⚙️  SYSTEM CONTROLS:
• Press 'q': Quit application
• Press 's': Settings menu
• Press 'h': Help/Controls
        """
        
        root = tk.Tk()
        root.title("Virtual Mouse Help")
        root.geometry("500x600")
        
        text_widget = tk.Text(root, wrap=tk.WORD, padx=10, pady=10)
        text_widget.pack(fill=tk.BOTH, expand=True)
        text_widget.insert(tk.END, help_text)
        text_widget.config(state=tk.DISABLED)
        
        tk.Button(root, text="Close", command=root.destroy).pack(pady=10)
        root.mainloop()

    def run(self):
        """Main application loop with enhanced features"""
        print("🎯 Enhanced Virtual Mouse is running!")
        print("Press 'q' to quit, 's' for settings, 'h' for help")
        print("Performance mode:", "ON" if self.settings.get('performance_mode') else "OFF")
        print("Overlay drawing:", "ON" if self.settings.get('show_overlay') else "OFF")
        
        # Begin capture thread for freshest frames
        self.start_capture_thread()
        
        try:
            while True:
                frame = self.get_latest_frame()
                if frame is None:
                    # Small sleep to avoid busy-waiting before frames arrive
                    time.sleep(0.001)
                    continue
                
                # Flip frame horizontally for mirror effect
                frame = cv2.flip(frame, 1)
                frame_height, frame_width, _ = frame.shape
                
                # Convert BGR to RGB for MediaPipe
                rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                
                # Process hand detection
                results = self.hands.process(rgb_frame)
                
                if results.multi_hand_landmarks:
                    for hand_landmarks in results.multi_hand_landmarks:
                        # Draw hand landmarks
                        if self.settings.get('show_overlay', False):
                            self.mp_drawing.draw_landmarks(
                                frame, hand_landmarks, self.mp_hands.HAND_CONNECTIONS)
                        
                        # Detect gestures
                        gesture_data = self.detect_gestures(
                            hand_landmarks.landmark, frame_width, frame_height)
                        
                        # Execute actions based on gestures
                        result = self.execute_gestures(gesture_data)
                        if result == 'quit':
                            print("🛑 Quit gesture detected!")
                            break
                        
                        # Draw comprehensive information
                        if self.settings.get('show_overlay', False):
                            self.draw_landmarks_and_info(frame, gesture_data)
                
                # Display frame
                if self.settings.get('show_usage', True):
                    self.draw_usage_overlay(frame)
                cv2.imshow('🎯 Enhanced Virtual Mouse - Full Device Control', frame)
                
                # Shorter waitKey to reduce artificial latency
                key = cv2.waitKey(1) & 0xFF
                
                if key == ord('q') or key == 27:  # 'q' or ESC key
                    print("🛑 Quit command received!")
                    break
                elif key == ord('s'):
                    print("⚙️  Opening settings...")
                    self.show_settings()
                elif key == ord('h'):
                    print("❓ Opening help...")
                    self.show_help()
                elif key == ord('r'):
                    print("🔄 Resetting to default mode...")
                    self.modes = {
                        'mouse': True,
                        'keyboard': False,
                        'volume': False,
                        'voice': False,
                        'app_launcher': False
                    }
                elif key == ord('o'):
                    self.settings['show_overlay'] = not self.settings.get('show_overlay', False)
                    print("🎨 Overlay:", "ON" if self.settings['show_overlay'] else "OFF")
                elif key == ord('p'):
                    self.settings['performance_mode'] = not self.settings.get('performance_mode', False)
                    self.apply_performance_settings()
                    print("⚡ Performance mode:", "ON" if self.settings['performance_mode'] else "OFF")
                elif key == ord('u'):
                    self.settings['show_usage'] = not self.settings.get('show_usage', True)
                    print("📋 Usage panel:", "ON" if self.settings['show_usage'] else "OFF")
                elif key == ord('a'):
                    self.settings['apps_enabled'] = not self.settings.get('apps_enabled', False)
                    state = "ON" if self.settings['apps_enabled'] else "OFF"
                    print(f"🚀 App launcher: {state}")
                elif key == ord('v'):
                    self.settings['voice_commands_enabled'] = not self.settings.get('voice_commands_enabled', False)
                    state = "ON" if self.settings['voice_commands_enabled'] else "OFF"
                    print(f"🎤 Voice commands: {state}")
                elif key == ord('k'):
                    self.settings['shortcuts_enabled'] = not self.settings.get('shortcuts_enabled', True)
                    state = "ON" if self.settings['shortcuts_enabled'] else "OFF"
                    print(f"⌨️  Keyboard shortcuts: {state}")
                
                # Check if window was closed
                if cv2.getWindowProperty('🎯 Enhanced Virtual Mouse - Full Device Control', cv2.WND_PROP_VISIBLE) < 1:
                    print("🛑 Window closed by user!")
                    break
                    
        except KeyboardInterrupt:
            print("\n🛑 Keyboard interrupt received - shutting down...")
        except Exception as e:
            print(f"❌ Error in main loop: {e}")
        finally:
            print("🧹 Cleaning up resources...")
            self.cleanup()

    def cleanup(self):
        """Clean up resources"""
        try:
            print("🔄 Releasing camera...")
            self.running = False
            if hasattr(self, 'cap') and self.cap.isOpened():
                self.cap.release()
            
            print("🔄 Closing OpenCV windows...")
            cv2.destroyAllWindows()
            
            # Force close any remaining windows
            cv2.waitKey(1)
            
            print("✅ Virtual Mouse stopped successfully!")
            print("👋 Thank you for using Enhanced Virtual Mouse!")
            
        except Exception as e:
            print(f"⚠️  Warning during cleanup: {e}")
            print("✅ Virtual Mouse stopped (with warnings)")

if __name__ == "__main__":
    virtual_mouse = VirtualMouse()
    virtual_mouse.run()
