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
    step: React.PropTypes.string
  }

  static defaultProps = {
    step: 'root'
  }

  dispatchButtonAction() {
    this.props.dispatchAction(this.props.flow[this.props.step].buttonAction);
  }

  selectComponent() {
    const { flow, step } = this.props;

    if (flow[step] && flow[step].component) {
      return flow[step].component;
    }

    return null;
  }

  render() {
    const { flow, step } = this.props;
    const CurrentComponent = this.selectComponent();

    let buttonClasses = 'btn btn-info btn-block';
    if (flow[step] && flow[step].final) {
      buttonClasses = 'btn btn-block btn-success';
    }

    return (
      <div className="container-fluid">
        <CurrentComponent { ...this.props }/>

        <div className="row">
          <div className="col-xs-12 offset-sm-4 col-sm-6">
            <button className={ buttonClasses } onClick={ this.dispatchButtonAction.bind(this) }>
              { (flow[step].buttonText ? flow[step].buttonText : 'Continue') }
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
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