import React from 'react';
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Row, Col, Alert, Table, Form, FormGroup, FormText, Label, Badge, CardColumns, Progress, Card, CardImg, CardBody, CardDeck, CardTitle, CardLink, CardSubtitle, CardText } from 'reactstrap';

import axios from "axios";

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleChange = (event) => {
    this.elasticSearch(event.target.value)
    this.setState({searchValue: event.target.value, modal: !this.state.modal},()=>{
      console.log(this.refs.modalInnerSearch)
      setTimeout(()=>{this.myTextInput && this.myTextInput.focus()}, 1);
    });
  };

  handleChange2 = (event) => {
    this.setState({searchValue: event.target.value});
    this.elasticSearch(event.target.value)
  };


  elasticSearch = (value) => {

    let url = `http://localhost:8080/api/_search/projects?query=${value}`;

    axios.get(url)
      .then(response => {
        console.log("Elastic Search Data " + JSON.stringify(response.data));
        this.setState({results: response.data});
      });

  };

  technologies = (skills) => (
    <div className="skills-container">
      { skills.map((skill,i) =>
        <Badge key={i} color="secondary" pill>{skill.word}</Badge>
      )}
    </div>
  );

  contributors = (contributors) => {
    if (contributors != null) {
      return (
        <div className="card-participants">
          { contributors.map( (contributor, i) =>
            <span className="dot">
              <p>
                {contributor.account.firstName.charAt(0).toUpperCase()}{contributor.account.lastName.charAt(0).toUpperCase()}
              </p>
              </span>
          )}
        </div>
      )
    } else {
      return (
        <div className="card-participants">
          <span className="dot"><p>0</p></span>
        </div>
      )
    }
  };


  render() {
    return (
      <div>
        <Input type="text" value={this.state.searchValue} onChange={this.handleChange} placeholder="search for a project" className="header-search-bar"/>

        {/*<Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>*/}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="search-modal">
          <Input ref={ref => this.myTextInput = ref} type="text" value={this.state.searchValue} onChange={this.handleChange2} placeholder="search for a project" className="modal-search-bar"/>
          <ModalHeader toggle={this.toggle}>{this.state.results ? this.state.results.length : 0} projects match your search</ModalHeader>
          <ModalBody>
            {this.state.results ?
              <CardColumns className="projects-current-container">
                {
                  this.state.results.map( (project, i) => (
                    <Card key={i}>
                      <CardBody>
                        <h6 className="projects-interest">Interest <Badge color="secondary">{project.interest}</Badge></h6>
                        <CardTitle>{project.name}</CardTitle>
                        <a href={project.repo.uri} target="_blank" className="projects-repo-url">{project.repo ? project.repo.uri : null}</a>
                        {this.technologies(project.technologies)}
                        {this.contributors(project.contributors)}
                        <CardText>{project.description}</CardText>
                        <h6>Contributors <Badge color="secondary">{project.contributors.length}</Badge></h6>
                      </CardBody>
                    </Card>
                  ))
                }
              </CardColumns>
              : null}
          </ModalBody>
          {/*<ModalFooter>*/}
            {/*<Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}*/}
            {/*<Button color="secondary" onClick={this.toggle}>Cancel</Button>*/}
          {/*</ModalFooter>*/}
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
