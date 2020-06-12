Code for selecting specific cameras in the Indian River Boardroom.  
The BoardRoom has two sets of cameras, ST60/Speakertrack and P60.  Since this is using an ST60, 
there is a total of 3 P60 cameras in the room. These two sets of cameras face each from opposite sides of the room.
Using the Touch 10 of an SX80, the user will select the Camera Postion button during a "in-call" event with webex meeting
They can then select the following: Audience, Audience & Boardroom Wide, Boardroom Wide, Boardroom Tight and Defualt 
for Far End Video Compositing with these camera views. 
These selections are represented in this code as case statements 1,2,3,4 & 5 respectivily.  
Inorder to get the correct camera active cameraId of the SpeakerTrack,either camera 1 or 2. Usage of Get status of the camera activeconnector of the cameraId, this value is passed through the case statement 1 & 2.  
The Far End VC api cmd of "Video Input SetMainVideoSource'will be used to send these selected camera view to the far participants screen viewing the Indian River Boardroom.  Case 2 is the only selection that will use two camera views in a equal layout (1X1) to the far end participants. All the rest will be single views. 
