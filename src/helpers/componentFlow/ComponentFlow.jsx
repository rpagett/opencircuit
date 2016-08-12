import React from 'react';
import { connect } from 'react-redux';

/* Fetches current view from state
   Accepts a list of components and 'next' callbacks

  {
    'slug': {
      component: (component),
      buttonAction: (action),
      buttonText (opt.): Text of 'next/submit' button,
      final (def. false): Is this the last?
    }
  } */

class _ComponentFlow extends React.Component {
  static propTypes = {
    flow: React.PropTypes.object.isRequired,
    currentSlug: React.PropTypes.string,
  }

  dispatchButtonAction() {
    this.props.dispatchAction(this.props.flow[this.props.currentSlug].buttonAction);
  }

  selectComponent() {
    const { flow, currentSlug } = this.props;

    if (flow[currentSlug] && flow[currentSlug].component) {
      return flow[currentSlug].component;
    }

    return null;
  }

  render() {
    const { flow, currentSlug } = this.props;
    const CurrentComponent = this.selectComponent();

    let buttonClasses = 'btn btn-info btn-block';
    if (flow[currentSlug] && flow[currentSlug].final) {
      buttonClasses = 'btn btn-block btn-success';
    }

    return (
      <div className="container-fluid">
        <CurrentComponent { ...this.props }/>

        <div className="row">
          <div className="col-xs-12 col-sm-offset-3 col-sm-6">
            <button className={ buttonClasses } onClick={ this.dispatchButtonAction.bind(this) }>
              { (flow[currentSlug].buttonText ? flow[currentSlug].buttonText : 'Continue') }
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentSlug: state.componentFlow.currentSlug,
    formState: state.form
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchAction: action => dispatch(action)
  }
}

const ComponentFlow = connect(mapStateToProps, mapDispatchToProps)(_ComponentFlow);
export default ComponentFlow;