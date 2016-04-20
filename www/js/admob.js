/*
	Admob utilities js by Liran Cohen
*/
var admobid = {};

function onDocLoad() {

    if(( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {
        document.addEventListener('deviceready', startAds, false);
    } else {
        // alert
    }
}

function startAds() {
    initAd();
    initApp();
}

function initApp() {
    // display the banner & interstitial at startup
    if (AdMob) {
    	if(AdMob) {
            AdMob.createBanner( {
                adId: admobid.banner,
                position: AdMob.AD_POSITION.BOTTOM_CENTER,
                autoShow: true }
            );
         AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:true} );
         // AdMob.showInterstitial();
        }
    }
}

function initAd(){
    if (AdMob) {
	    var ad_units = {
			ios : {
                banner: 'ca-app-pub-5934662800023467/2055123685',
                interstitial: 'ca-app-pub-5934662800023467/3531856883'
            },
            android : {
                banner: 'ca-app-pub-5934662800023467/6624924088',
                interstitial: 'ca-app-pub-5934662800023467/8101657285'
            }
	    };
        admobid =  isAndroid() ? ad_units.android : ad_units.ios;

        // registerAdEvents();

    } else {
    	//	Only notify when using mobile device
    	if(( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {
        	alert( 'admob plugin not ready' );
        }
    }
}

document.addEventListener('onAdFailLoad', function(e){
    // handle the event
    setTimeout(initApp, 3000);
});

// Optional, in case respond to events
// function registerAdEvents() {
// 	document.addEventListener('onReceiveAd', function(){});
//     document.addEventListener('onFailedToReceiveAd', function(data){});
//     document.addEventListener('onPresentAd', function(){});
//     document.addEventListener('onDismissAd', function(){ });
//     document.addEventListener('onLeaveToAd', function(){ });
//     document.addEventListener('onReceiveInterstitialAd', function(){ });
//     document.addEventListener('onPresentInterstitialAd', function(){ });
//     document.addEventListener('onDismissInterstitialAd', function(){ });
// }