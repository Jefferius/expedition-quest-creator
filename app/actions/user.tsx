import Redux from 'redux'

import {SetProfileMetaAction} from './ActionTypes'
import {UserState} from '../reducers/StateTypes'
import {loadQuestFromURL} from './quest'
import {realtimeUtils} from '../auth'

declare var window: any;


export function setProfileMeta(user: UserState): SetProfileMetaAction {
  return {type: 'SET_PROFILE_META', user};
}

export function loginUser(showPrompt: boolean): ((dispatch: Redux.Dispatch<any>)=>void) {
  return (dispatch: Redux.Dispatch<any>) => {
    realtimeUtils.authorize(function(response:any){
      if (response.error){
        dispatch(setProfileMeta({loggedIn: false}));
      } else {
        window.gapi.client.load('plus','v1', function(){
          var request = window.gapi.client.plus.people.get({
            'userId': 'me',
          });
          request.execute((res: any) => {
            const googleUser = {
              id_token: response.id_token,
              name: res.displayName,
              image: res.image.url,
              email: ((res.emails || [])[0] || {}).value,
            };
            $.post('/auth/google', JSON.stringify(googleUser), (data) => {
              const user = {
                loggedIn: true,
                id: data,
                displayName: googleUser.name,
                image: googleUser.image,
                email: googleUser.email,
              };
              dispatch(setProfileMeta(user));
              loadQuestFromURL(user, dispatch);
            });
          });
        });
      }
    }, showPrompt);
  }
}

export function logoutUser(): ((dispatch: Redux.Dispatch<any>)=>void) {
  return (dispatch: Redux.Dispatch<any>) => {
    window.gapi.auth.setToken(null);
    window.gapi.auth.signOut();

    // Remove document ID, so we get kicked back to home page.
    window.location.hash = '';

    window.location.reload();
  }
}
