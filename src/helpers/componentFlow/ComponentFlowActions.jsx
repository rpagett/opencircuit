import { browserHistory } from 'react-router'

//function setSlug(slug) {
//  return {
//    type: 'COMPONENTFLOW_SET_VIEW',
//    slug
//  }
//}

export function setView(slug) {
  return dispatch => {
    browserHistory.push('/units/register/' + slug);
  }
}