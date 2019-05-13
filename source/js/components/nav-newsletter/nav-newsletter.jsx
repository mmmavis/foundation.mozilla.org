import React from "react";
import ReactGA from "react-ga";
import ReactDOM from "react-dom";
import classNames from "classnames";
import JoinUs from "../join/join.jsx";

export default class NavNewsletter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonActive: false
    };
    this.boundCloseFormClickHandler = this.closeFormClickHandler.bind(this);
  }

  /**
   * Ensure that the parent component is informed
   * about this component being mounted (primarily
   * used in the context of automated testing)
   */
  componentDidMount() {
    if (this.props.whenLoaded) {
      this.props.whenLoaded();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let navWrapper = document.querySelector("#nav-newsletter-form-wrapper");

    // when user has successfully signed up for newletter from the newsletter section on the nav,
    // update the dismiss button so it reads "Back to menu" instead of "No thanks"
    if (
      navWrapper &&
      navWrapper.contains(ReactDOM.findDOMNode(this)) &&
      navWrapper.querySelector(".form-dismiss") &&
      this.state.apiSuccess
    ) {
      navWrapper.querySelector(".form-dismiss").textContent = "Back to menu";
    }
  }

  // For desktop+ version:
  // create click handler to detect clicking event outside of the newsletter section
  closeFormClickHandler(event) {
    // close newsletter section if clicking anywhere outside of the section
    if (
      !this.formContainer.contains(event.target) &&
      event.target !== this.formContainer
    ) {
      this.closeDesktopNewsletter();
    }
  }

  // For desktop+ version:
  // transition section to its close state,
  // remove the global 'closeFormClickHandler' click event handler
  // and unmount the form from DOM
  closeDesktopNewsletter() {
    // this.formContainer.classList.remove("expanded");
    // buttonDesktop.classList.remove("active");
    document.removeEventListener("click", this.boundCloseFormClickHandler);
    document.removeEventListener("scroll", this.boundCloseFormClickHandler);
    // navNewsletter.unmountForm();
    this.setState({ buttonActive: false });
    // isShown = false;
  }

  // For desktop+ version:
  // inject a new sign up form then transition newsletter section to its expanded state
  expandDesktopNewsletter() {
    let primaryNav = document.querySelector(`#primary-nav-container`);
    // navNewsletter.injectForm();
    this.setState({ buttonActive: true });
    this.formContainer.style.top = `${primaryNav.offsetHeight}px`;
    // this.formContainer.classList.add("expanded");
    // buttonDesktop.classList.add("active");
    document.addEventListener("click", this.boundCloseFormClickHandler);
    document.addEventListener("scroll", this.boundCloseFormClickHandler);
    // isShown = true;
  }

  btnClickHandler() {
    console.log(`btnClickHandler`);
    if (this.state.buttonActive) {
      this.closeDesktopNewsletter();
    } else {
      this.expandDesktopNewsletter();
    }
  }

  /**
   * Render the signup CTA.
   */
  render() {
    let btnClass = classNames(`btn btn-secondary btn-newsletter`, {
      active: this.state.buttonActive
    });
    let formWrapperClass = classNames({
      expanded: this.state.buttonActive
    });

    return (
      <div>
        <button
          className={btnClass}
          onClick={() => this.btnClickHandler()}
          ref={e => (this.button = e)}
        >
          Newsletterrr
        </button>
        <div
          id="nav-newsletter-form-wrapper"
          className={formWrapperClass}
          ref={e => (this.formContainer = e)}
        >
          <div className="container dark-theme">
            <div className="row">
              <div className="col-12 mt-4 join-us on-nav">
                <JoinUs
                  apiUrl={this.props.apiUrl}
                  csrfToken={this.props.csrfToken}
                  hidden={this.props.hidden}
                  whenLoaded={this.props.whenLoaded}
                  layout="side-button"
                />
                <div className="text-center mt-3 hidden-lg-up">
                  <button className="btn form-dismiss">No thanks</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NavNewsletter.defaultProps = {};
