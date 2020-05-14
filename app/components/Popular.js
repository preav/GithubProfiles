import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from "react-icons/fa";

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "JavaScipt", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="nav-wrapper">
      {languages.map((language) => (
        <li key={language} className="nav-wrapper__item">
          <button
            className="btn-clr"
            style={language === selected ? { color: "maroon" } : null}
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

function ReposGrid({ repos }) {
  return (
    <ul className="repo-wrapper">
      {repos.map((repo, index) => {
        const {
          name,
          owner,
          html_url,
          stargazers_count,
          forks,
          open_issues,
        } = repo;
        const { login, avatar_url } = owner;
        return (
          <li className="repo-item" key={html_url}>
            <div className="repo-item-wrapper">
              <div className="repo-count">#{index + 1}</div>
              <div className="repo-image"><img className="repo-image" src={avatar_url} alt="user avatar"/></div>
              <h4 className="repo-name">{name}</h4>
              <div className="repo-login"><FaUser color="orange"/> {login}</div>
              <div className="repo-stargazers_count">
              <FaStar color="yellow"/> {stargazers_count.toLocaleString()} stars
              </div>
              <div className="repo-forks"><FaCodeBranch color="powderblue"/> {forks.toLocaleString()} forks</div>
              <div className="repo-open_issues"><FaExclamationTriangle color="orange"/> {open_issues.toLocaleString()} open issues</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
      repos: {},
      error: null,
    };

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  updateLanguage(selectedLanguage) {
    this.setState({ selectedLanguage, error: null });

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then((data) => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data,
            },
          }));
        })
        .catch(() => {
          console.warn("Error fetching repos: ", error);
          this.setState({ error: "There was an error fetching the repose" });
        });
    }
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  isLoading() {
    const { selectedLanguage, repos, error } = this.state;
    return !repos[selectedLanguage] && error === null;
  }

  render() {
    const { selectedLanguage, error, repos } = this.state;
    return (
      <Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />
        {this.isLoading() && <div className="repo-loading"> <p> Loading...</p> </div>}
        {error && <p> {error}</p>}
        {repos[selectedLanguage] && (
          <ReposGrid repos={repos[selectedLanguage]} />
        )}
      </Fragment>
    );
  }
}

export default Popular;
