/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Reacticon = require('./reacticon');

var defaultBgColor =       '#ffffff';
var defaultPrimaryColor = '#0074d9';

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/application.scss');
require('../../styles/reacticons.scss');

var Hero = React.createClass({
  render: function() {
    return (
      <header className="header">
        <div className="width-wrapper">
          <div className="header__title">
            <h1>Reacticons!</h1>
            <h2>Scalable file icons for ReactJS</h2>
          </div>
          <div className="header__examples">
            <CSSTransitionGroup transitionName="reacticon">
              <Reacticon
                key="1"
                height="100"
                type="text"
                label="doc"
                progress="50%"
                animate />
              <Reacticon
                key="2"
                height="100"
                type="table"
                primaryColor="#2ECC40"
                isProcessing
                animate />
              <Reacticon
                key="3"
                height="100"
                type="image"
                label="png"
                animate />
              <Reacticon
                key="4"
                height="100"
                type="code"
                label="html"
                animate />
              <Reacticon
                key="5"
                height="100"
                type="slides"
                label="ppt"
                primaryColor="#FF4136"
                animate />
            </CSSTransitionGroup>
          </div>
        </div>
      </header>
    );
  }
});

var Main = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      code:         false,
      height:       "100",
      type:         "text",
      label:        "doc",
      bgColor:      defaultBgColor,
      primaryColor: defaultPrimaryColor,
      progress:     false,
      animation:    false,
      processing:   false
     };
  },

  handleCodeToggle: function(event) {
    this.setState({code: !this.state.code});
  },

  handleSizeChange: function(event) {
    this.setState({height: event.target.value});
  },

  handleTypeChange: function(event) {
    this.setState({type: event.target.value});
  },

  handleProcessingToggle: function() {
    this.setState({processing: !this.state.processing});
  },

  handleProgressToggle: function() {
    this.setState({progress: !this.state.progress});
  },

  handleAnimationToggle: function() {
    this.setState({animation: !this.state.animation});
  },

  render: function() {
    return (
      <section className="main">
        <div className="width-wrapper">
          <div className="example">
            <div className="example__result">
              {this.state.code ?
                <code>
                  <pre>{'<Reacticon'}</pre>
                  {(this.state.bgColor !== defaultBgColor) ?
                    <pre>{'  bgColor="' + this.state.bgColor + '"'}</pre>
                  : null}
                  {(this.state.primaryColor !== defaultPrimaryColor) ?
                    <pre>{'  primaryColor="' + this.state.primaryColor + '"'}</pre>
                  : null}
                  {this.state.animation ? <pre>{'  animation'}</pre> : null}
                  {this.state.progress ? <pre>{'  progress="50%"'}</pre> : null}
                  {this.state.processing ? <pre>{'  isProcessing'}</pre> : null}
                  <pre>{'  height="' + this.state.height + '"'}</pre>
                  <pre>{'  type="' + this.state.type + '"'}</pre>
                  <pre>{'  label="' + this.state.label + '" />'}</pre>
                </code>
              :
                <Reacticon
                  height={this.state.height}
                  type={this.state.type}
                  label={this.state.label}
                  bgColor={this.state.bgColor}
                  primaryColor={this.state.primaryColor}
                  animate={this.state.animation ? true : null }
                  progress={this.state.progress ? '50%' : null }
                  isProcessing={this.state.processing ? true : null } />
              }
              <button className="example__code__toggle" onClick={this.handleCodeToggle}>
                {this.state.code ? 'Show example' : 'Show code'}
              </button>
            </div>
            <div className="example__configure">
              <fieldset>
                <label>Size</label>
                <input type="range"
                  defaultValue={this.state.height}
                  min="0"
                  max="1000"
                  onChange={this.handleSizeChange} />
              </fieldset>
              <fieldset>
                <label>Type</label>
                <select value="text" onChange={this.handleTypeChange}>
                  <option value="text" selected>Text</option>
                  <option value="table">Table</option>
                  <option value="image">Image</option>
                  <option value="code">Code</option>
                  <option value="slides">Slides</option>
                </select>
              </fieldset>
              <fieldset>
                <label>Label</label>
                <input type="text" valueLink={this.linkState('label')} />
              </fieldset>
              <fieldset>
                <label>Background color</label>
                <input type="text" valueLink={this.linkState('bgColor')}/>
              </fieldset>
              <fieldset>
                <label>Primary color</label>
                <input type="text" valueLink={this.linkState('primaryColor')} />
              </fieldset>
              <fieldset>
                <label>Animation</label>
                <Toggle toggleOn={this.state.animation} handleToggle={this.handleAnimationToggle} />
              </fieldset>
              <fieldset>
                <label>Progress</label>
                <Toggle toggleOn={this.state.progress} handleToggle={this.handleProgressToggle} />
              </fieldset>
              <fieldset>
                <label>Processing</label>
                <Toggle toggleOn={this.state.processing} handleToggle={this.handleProcessingToggle} />
              </fieldset>
            </div>
          </div>
        </div>
      </section>
    );
  }
});

var Toggle = React.createClass({
  render: function() {
    var cx = React.addons.classSet;
    var toggleClassName = cx({
     'toggle': true,
     'is-on':  this.props.toggleOn
    });

    return (
      <div className={toggleClassName} onClick={this.props.handleToggle}>
        <div className="toggle__wrapper">
          <div className="toggle__handle"/>
        </div>
        <span className="toggle__label">
          {this.props.toggleOn ? "On" : "Off"}
        </span>
      </div>
    );
  }
});

var Instructions = React.createClass({
  render: function() {
    return (
      <section className="instructions">
        <div className="width-wrapper">
          <button href="https://github.com/andrewliebchen/reacticons" className="instructions__cta">Download from Github</button>
          <div className="instructions__or">or</div>
          <code className="instructions__code">$ npm install reacticons</code>
          <p>Package includes JSX templates, Sass partials, and compiled CSS. Just include it in your project and it should be good to go. Have a problem or idea? Feel free to <a href="https://github.com/andrewliebchen/reacticons/issues">open an issue</a>.</p>
        </div>
      </section>
    );
  }
});

var Footer = React.createClass({
  render: function() {
    return (
      <footer className="footer">
        <div className="width-wrapper">
          <small>
            <strong><a href="http://github.com/andrewliebchen/reacticons">Reacticons</a></strong> are under an MIT License, and brought to you by <a href="http://andrewliebchen.com">me</a>.</small>
        </div>
      </footer>
    );
  }
});

var ReacticonsApp = React.createClass({
  render: function() {
    return (
      <div className="wrapper">
        <Hero />
        <Main />
        <Instructions />
        <Footer />
      </div>
    );
  }
});

React.renderComponent(<ReacticonsApp />, document.getElementById('content')); // jshint ignore:line

module.exports = ReacticonsApp;
