// Code for selecting specific cameras in the Indian River Boardroom.  
// The brdrm has two sets of cameras, ST60/Speakertrack and P60.  Since this is using an ST60, 
// there is a total of 3 P60 cameras in the room. 
// Using the Touch 10 of an SX80, the user will select the Camera Postion button during a "in-call" event with webex meeting
// they can then select the following: Audience, Audience & Boardroom Wide, Boardroom Wide, Boardroom Tight and Defualt 
// for Far End Video Compositing with these camera views. 
// These selections are represented in this code as case statements 1,2,3,4 & 5 respectivily.  
// Inorder to get the correct camera active cameraId of the SpeakerTrack,either camera 1 or 2. Get status of the camera activeconnector
//  of the cameraId, this value is passed through the case statement 1 & 2.  The Far End VC api cmd of "Video Input SetMainVideoSource'
// will be used to send these selected camera view to the far participants screen viewing the Indian River Boardroom.  Case 2 is the only 
// selection that will use two camera views in a equal layout (1X1) to the far end participants. All the rest will be single views.  

const xapi = require('xapi');

function log(entry) {
    console.log(entry);
}

var CConnector =0;

log ('BrdRM Far End Side');

// Listen to clicks on buttons: the buttons can either be pressed or release
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
  if (event.Type == "released" && event.WidgetId == "camera_1") {
      console.log ('BoardRoom FE Change');
      switch (event.Value) {
        case '1':  // SpeakerTrack - Audience View
              log ('Changing Layout to Speakertrack Active Connector'); // using the whole string
              xapi.command('Cameras SpeakerTrack Activate');  // needs this to keep SpeakerTrack active
              spktrk_status();  // Not sure how this code is working, but it works!!!  Would love to run this through a sw editor : 0
              if(CConnector == 1) {
                  xapi.command('Video Input SetMainVideoSource', {
                  ConnectorId: ['1']  //This is the Left Camera of the ST60.  
                  });
                }
                if(CConnector == 2) {
                  xapi.command('Video Input SetMainVideoSource', {
                  ConnectorId: ['2']  //This is the Left Camera of the ST60.  
                  });
                }
             break;
        case '2':      // Speakertrack & P60 -  Audience & Boardroom Wide View
             log ('Changing Layout SpTrK Active Conx # & Conx 3'); // using connectorid's
             // logic for Status of Active Connector for SpeakerTrack
                xapi.command('Cameras SpeakerTrack Activate'); // needs this to keep SpeakerTrack active
                xapi.command ('Camera PositionSet',{  // This sets the P60 camera for wide view in the Boardroom.  Found out camera postion nees to be set before selecting it. 
	               CameraId: 3,
  	               Focus: 4232,
      //	       Lens: 'Wide',
      	           Pan: 0,
      	           Tilt: -1200,
        	       Zoom: 7918
	           });
             spktrk_status();
             if(CConnector == 1) {
                  xapi.command('Video Input SetMainVideoSource', {
                  ConnectorId: ['1', '3']  //This is the Left Camera of the ST60.  
                  });
                }
             if(CConnector == 2) {
                  xapi.command('Video Input SetMainVideoSource', {
                  ConnectorId: ['2','3']  //This is the Left Camera of the ST60.  
                  });
                }
            log('Layout set to 1 X 1 Grid');
            console.log ('set to 1 X 1 = Equal');
            break;
        case '3':      // P60 Camera Wide - Boardroom Wide View
             log ('Changing Layout Conx 3'); // using connectorid's 
             xapi.command ('Camera PositionSet',{  // This sets the P60 camera for wide view in the Boardroom.  Found out camera postion nees to be set before selecting it. 
	            CameraId: 3,
  	            Focus: 4232,
      //	    Lens: 'Wide',
      	        Pan: 0,
      	        Tilt: -1200,
        	    Zoom: 7918
	           });
	        xapi.command('video input setmainvideosource', {
               connectorid: ['3'],
             });
            log('Layout set to P60 Wide Only');
            console.log ('set to P60 Wide Only');
            break;
        case '4':      // P60 Camera Tight - Boardroom Tight View
             log ('Changing Layout Conx 3'); // using connectorid's
             xapi.command ('Camera PositionSet',{
	            CameraId: 3,
  	            Focus: 4309,
      //	    Lens: 'Wide',
      	        Pan: -60,
      	        Tilt: -1074,
        	    Zoom: 6333
	           });
             xapi.command('video input setmainvideosource', {
               connectorid: ['3'],
             });
            log('Layout set to P60 Tight Only');
            console.log ('set to P60 Tight Only');
            break;               
       case '5':  // Turn off FE Camera views and setting it to camera 1 on the ST60 - Default View
           log('Changing Layout Conx 1');
           xapi.command('video input setmainvideosource', {
          connectorid: ['1']
          });
           log('Back to Normal');
           console.log ('set to Normal');
           break;
        default:
        }
    return;
  }        
});
// logic to get the status of the current camera active on the ST60/SpeakertTrack, the CConnector value gets passed up in the main case statement. 
function spktrk_status(){
  //    console.log('please.........');
    xapi.status.get('Cameras SpeakerTrack')
   .then((ac) => {
    console.log ('getting this Active Connector =',ac.ActiveConnector); //1 or 2//
//    ac.ActiveConnector == '2';
//     if(ac.ActiveConnector == '0') {
      CConnector = '1';
     console.log (' ActiveConnector =',CConnector); //1 or 2//
     });
 }
// left all the original comments in since I needed to simulate this value to get the rest of the code to work. Should be cleaned up someday
// when I have ST60 to demo/play with. 


// Cleans up buttons, once touched, they will gray back out on the Touch 10, this is not being used, but nice to have if needed. 
function unsetvalue_fr_vc_off () {
  xapi.command ('userinterface extensions widget unsetvalue', {
    widgetId: "fr_vc_off"
    });
}

// Code written by Jerry Gavin for Indian River Board Room June 2020

