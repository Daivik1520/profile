
import cv2 as cv
import mediapipe as mp
import pyautogui as pg


# Initialize the webcam.
cam = cv.VideoCapture(0)


# Initialize MediaPipe hands.
mphands = mp.solutions.hands
hands = mphands.Hands()


clk = 1
keys = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
       ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':'],
       ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '?']]
size = 500 / 500
buttonList = []


# Create button list.
for i in range(len(keys)):
   for j, key in enumerate(keys[i]):
       x = int((j * 60 * size) + 25)
       y = int((i * 60 * size) + 60)
       h = int(x + 50 * size)
       w = int(y + 50 * size)
       buttonList.append([x, y, h, w, key])




def S_keys():
   xs = lambda i: int((i * 60 * size) + 25)
   ys = lambda y: int((y * 60 * size) + 60)
   hws = lambda hw: int(hw + 50 * size)
   buttonList.append([xs(0), ys(len(keys)), hws(xs(3)), hws(ys(len(keys))), 'backspace'])
   buttonList.append([xs(4), ys(len(keys)), hws(xs(6)), hws(ys(len(keys))), 'capslock'])
   buttonList.append([xs(7), ys(len(keys)), hws(xs(9)), hws(ys(len(keys))), 'enter'])
   buttonList.append([xs(1), ys(len(keys) + 1), hws(xs(8)), hws(ys(len(keys) + 1)), ' '])




S_keys()




def drawKey(img, buttonList):
   for x, y, h, w, key in buttonList:
       cv.rectangle(img, (x, y), (h, w), (0, 0, 0), 10)
       cv.putText(img, key, (x + 12, y + 29), cv.FONT_HERSHEY_PLAIN, 2, (0, 0, 255), 3)




def main():
   global clk
   while True:
       success, img = cam.read()
       if not success:
           print("Failed to read from webcam.")
           break


       img = cv.flip(img, 1)
       h, w, c = img.shape


       imgRGB = cv.cvtColor(img, cv.COLOR_BGR2RGB)
       result = hands.process(imgRGB)
       if result.multi_hand_landmarks:
           lmlist = []


           for handsLms in result.multi_hand_landmarks:
               for id, landmark in enumerate(handsLms.landmark):
                   x, y = int(landmark.x * w), int(landmark.y * h)
                   lmlist.append([id, x, y])


           if lmlist:
               try:
                   X = lmlist[12][1]
                   Y = lmlist[12][2]
                   cv.circle(img, (X, Y), 9, (0, 255, 255), cv.FILLED)


                   if (lmlist[8][2] > lmlist[7][2]) and (clk > 0):
                       cv.circle(img, (X, Y), 9, (0, 255, 0), cv.FILLED)
                       for x, y, h, w, key in buttonList:
                           if x < X < h and y < Y < w:
                               pg.press(key)
                       clk = -1
                   elif lmlist[8][2] < lmlist[7][2]:
                       clk = 1
               except IndexError as e:
                   print(f"Landmark list is not complete: {e}")


       drawKey(img, buttonList)
       cv.imshow("webcam", img)


       if cv.waitKey(20) & 0xFF == ord('d'):
           break


   cam.release()
   cv.destroyAllWindows()




if __name__ == "__main__":
   main()

