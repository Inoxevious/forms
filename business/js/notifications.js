/**
 * Created by HP ELITEBOOK on 3/17/2017.
 */


// Get Instance ID token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
messaging.getToken()
    .then(function(currentToken) {
        if (currentToken) {
            sendTokenToServer(currentToken);
            updateUIForPushEnabled(currentToken);
            console.log('current token')
        } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
            // Show permission UI.
            updateUIForPushPermissionRequired();
            setTokenSentToServer(false);
        }
    })
    .catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
        showToken('Error retrieving Instance ID token. ', err);
        setTokenSentToServer(false);
    });
