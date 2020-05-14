import React, { Component } from "react";
import PropTypes from 'prop-types';

function LanguagesNav({selected, onUpdateLanguage }) {
    const languages = ["All", "JavaScipt", "Ruby", "Java", "CSS", "Python"];
    return (
        <ul className="nav-wrapper">
        {languages.map((language) => (
          <li
            key={language}
            className="nav-wrapper__item"
          >
            <button
              className="btn-clr"
              style={
                language === selected ? { color: "red" } : null
              }
              onClick={() => onUpdateLanguage(language)}
            >
              {language}
            </button>
          </li>
        ))}
      </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  updateLanguage(selectedLanguage) {
    this.setState({selectedLanguage});
  }

  render() {
    return (
       <LanguagesNav selected={this.state.selectedLanguage} onUpdateLanguage={this.updateLanguage} />
  );
  }
}

export default Popular;
