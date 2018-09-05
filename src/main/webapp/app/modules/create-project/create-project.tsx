import './create-project.css';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert, Input, Table, Form, FormGroup, FormText, Label, Button, Container } from 'reactstrap';

import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.

import 'react-datepicker/dist/react-datepicker.css';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface ICreateProjectProp extends StateProps, DispatchProps {}

export class CreateProject extends React.Component<ICreateProjectProp> {

  constructor(props) {
    super(props)
    this.state = {
      tags: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getSession();
  }


  // json() {
  //   this.data = {
  //     "admins": [
  //     {
  //       "account": {
  //         "activated": true,
  //         "email": "string",
  //         "firstName": "string",
  //         "id": 0,
  //         "imageUrl": "string",
  //         "langKey": "string",
  //         "lastName": "string",
  //         "login": "string",
  //         "resetDate": "2018-09-05T14:38:27.331Z"
  //       },
  //       "avatar": "string",
  //       "avatarContentType": "string",
  //       "creates": [
  //         {}
  //       ],
  //       "id": 0,
  //       "makes": [
  //         {
  //           "createdAt": "2018-09-05T14:38:27.331Z",
  //           "id": 0,
  //           "issue": {
  //             "comments": [
  //               {}
  //             ],
  //             "createdBy": {},
  //             "fullDescription": "string",
  //             "id": 0,
  //             "interest": 0,
  //             "projects": [
  //               {}
  //             ],
  //             "rewards": 0,
  //             "summary": "string"
  //           },
  //           "madeBy": {},
  //           "project": {},
  //           "text": "string"
  //         }
  //       ],
  //       "raises": [
  //         {
  //           "comments": [
  //             {
  //               "createdAt": "2018-09-05T14:38:27.331Z",
  //               "id": 0,
  //               "issue": {},
  //               "madeBy": {},
  //               "project": {},
  //               "text": "string"
  //             }
  //           ],
  //           "createdBy": {},
  //           "fullDescription": "string",
  //           "id": 0,
  //           "interest": 0,
  //           "projects": [
  //             {}
  //           ],
  //           "rewards": 0,
  //           "summary": "string"
  //         }
  //       ],
  //       "role": "string",
  //       "skills": [
  //         {
  //           "id": 0,
  //           "word": "string"
  //         }
  //       ]
  //     }
  //   ],
  //     "attachment": "string",
  //     "attachmentContentType": "string",
  //     "comments": [
  //     {
  //       "createdAt": "2018-09-05T14:38:27.331Z",
  //       "id": 0,
  //       "issue": {
  //         "comments": [
  //           {}
  //         ],
  //         "createdBy": {
  //           "account": {
  //             "activated": true,
  //             "email": "string",
  //             "firstName": "string",
  //             "id": 0,
  //             "imageUrl": "string",
  //             "langKey": "string",
  //             "lastName": "string",
  //             "login": "string",
  //             "resetDate": "2018-09-05T14:38:27.331Z"
  //           },
  //           "avatar": "string",
  //           "avatarContentType": "string",
  //           "creates": [
  //             {}
  //           ],
  //           "id": 0,
  //           "makes": [
  //             {}
  //           ],
  //           "raises": [
  //             {}
  //           ],
  //           "role": "string",
  //           "skills": [
  //             {
  //               "id": 0,
  //               "word": "string"
  //             }
  //           ]
  //         },
  //         "fullDescription": "string",
  //         "id": 0,
  //         "interest": 0,
  //         "projects": [
  //           {}
  //         ],
  //         "rewards": 0,
  //         "summary": "string"
  //       },
  //       "madeBy": {
  //         "account": {
  //           "activated": true,
  //           "email": "string",
  //           "firstName": "string",
  //           "id": 0,
  //           "imageUrl": "string",
  //           "langKey": "string",
  //           "lastName": "string",
  //           "login": "string",
  //           "resetDate": "2018-09-05T14:38:27.332Z"
  //         },
  //         "avatar": "string",
  //         "avatarContentType": "string",
  //         "creates": [
  //           {}
  //         ],
  //         "id": 0,
  //         "makes": [
  //           {}
  //         ],
  //         "raises": [
  //           {
  //             "comments": [
  //               {}
  //             ],
  //             "createdBy": {},
  //             "fullDescription": "string",
  //             "id": 0,
  //             "interest": 0,
  //             "projects": [
  //               {}
  //             ],
  //             "rewards": 0,
  //             "summary": "string"
  //           }
  //         ],
  //         "role": "string",
  //         "skills": [
  //           {
  //             "id": 0,
  //             "word": "string"
  //           }
  //         ]
  //       },
  //       "project": {},
  //       "text": "string"
  //     }
  //   ],
  //     "contributors": [
  //     {
  //       "account": {
  //         "activated": true,
  //         "email": "string",
  //         "firstName": "string",
  //         "id": 0,
  //         "imageUrl": "string",
  //         "langKey": "string",
  //         "lastName": "string",
  //         "login": "string",
  //         "resetDate": "2018-09-05T14:38:27.332Z"
  //       },
  //       "avatar": "string",
  //       "avatarContentType": "string",
  //       "creates": [
  //         {}
  //       ],
  //       "id": 0,
  //       "makes": [
  //         {
  //           "createdAt": "2018-09-05T14:38:27.332Z",
  //           "id": 0,
  //           "issue": {
  //             "comments": [
  //               {}
  //             ],
  //             "createdBy": {},
  //             "fullDescription": "string",
  //             "id": 0,
  //             "interest": 0,
  //             "projects": [
  //               {}
  //             ],
  //             "rewards": 0,
  //             "summary": "string"
  //           },
  //           "madeBy": {},
  //           "project": {},
  //           "text": "string"
  //         }
  //       ],
  //       "raises": [
  //         {
  //           "comments": [
  //             {
  //               "createdAt": "2018-09-05T14:38:27.332Z",
  //               "id": 0,
  //               "issue": {},
  //               "madeBy": {},
  //               "project": {},
  //               "text": "string"
  //             }
  //           ],
  //           "createdBy": {},
  //           "fullDescription": "string",
  //           "id": 0,
  //           "interest": 0,
  //           "projects": [
  //             {}
  //           ],
  //           "rewards": 0,
  //           "summary": "string"
  //         }
  //       ],
  //       "role": "string",
  //       "skills": [
  //         {
  //           "id": 0,
  //           "word": "string"
  //         }
  //       ]
  //     }
  //   ],
  //     "createdAt": "2018-09-05T14:38:27.332Z",
  //     "createdBy": {
  //     "account": {
  //       "activated": true,
  //         "email": "string",
  //         "firstName": "string",
  //         "id": 0,
  //         "imageUrl": "string",
  //         "langKey": "string",
  //         "lastName": "string",
  //         "login": "string",
  //         "resetDate": "2018-09-05T14:38:27.332Z"
  //     },
  //     "avatar": "string",
  //       "avatarContentType": "string",
  //       "creates": [
  //       {}
  //     ],
  //       "id": 0,
  //       "makes": [
  //       {
  //         "createdAt": "2018-09-05T14:38:27.332Z",
  //         "id": 0,
  //         "issue": {
  //           "comments": [
  //             {}
  //           ],
  //           "createdBy": {},
  //           "fullDescription": "string",
  //           "id": 0,
  //           "interest": 0,
  //           "projects": [
  //             {}
  //           ],
  //           "rewards": 0,
  //           "summary": "string"
  //         },
  //         "madeBy": {},
  //         "project": {},
  //         "text": "string"
  //       }
  //     ],
  //       "raises": [
  //       {
  //         "comments": [
  //           {
  //             "createdAt": "2018-09-05T14:38:27.332Z",
  //             "id": 0,
  //             "issue": {},
  //             "madeBy": {},
  //             "project": {},
  //             "text": "string"
  //           }
  //         ],
  //         "createdBy": {},
  //         "fullDescription": "string",
  //         "id": 0,
  //         "interest": 0,
  //         "projects": [
  //           {}
  //         ],
  //         "rewards": 0,
  //         "summary": "string"
  //       }
  //     ],
  //       "role": "string",
  //       "skills": [
  //       {
  //         "id": 0,
  //         "word": "string"
  //       }
  //     ]
  //   },
  //     "description": "string",
  //     "dueDate": "2018-09-05T14:38:27.332Z",
  //     "id": 0,
  //     "interest": 0,
  //     "issue": {
  //     "comments": [
  //       {
  //         "createdAt": "2018-09-05T14:38:27.332Z",
  //         "id": 0,
  //         "issue": {},
  //         "madeBy": {
  //           "account": {
  //             "activated": true,
  //             "email": "string",
  //             "firstName": "string",
  //             "id": 0,
  //             "imageUrl": "string",
  //             "langKey": "string",
  //             "lastName": "string",
  //             "login": "string",
  //             "resetDate": "2018-09-05T14:38:27.332Z"
  //           },
  //           "avatar": "string",
  //           "avatarContentType": "string",
  //           "creates": [
  //             {}
  //           ],
  //           "id": 0,
  //           "makes": [
  //             {}
  //           ],
  //           "raises": [
  //             {}
  //           ],
  //           "role": "string",
  //           "skills": [
  //             {
  //               "id": 0,
  //               "word": "string"
  //             }
  //           ]
  //         },
  //         "project": {},
  //         "text": "string"
  //       }
  //     ],
  //       "createdBy": {
  //       "account": {
  //         "activated": true,
  //           "email": "string",
  //           "firstName": "string",
  //           "id": 0,
  //           "imageUrl": "string",
  //           "langKey": "string",
  //           "lastName": "string",
  //           "login": "string",
  //           "resetDate": "2018-09-05T14:38:27.332Z"
  //       },
  //       "avatar": "string",
  //         "avatarContentType": "string",
  //         "creates": [
  //         {}
  //       ],
  //         "id": 0,
  //         "makes": [
  //         {
  //           "createdAt": "2018-09-05T14:38:27.332Z",
  //           "id": 0,
  //           "issue": {},
  //           "madeBy": {},
  //           "project": {},
  //           "text": "string"
  //         }
  //       ],
  //         "raises": [
  //         {}
  //       ],
  //         "role": "string",
  //         "skills": [
  //         {
  //           "id": 0,
  //           "word": "string"
  //         }
  //       ]
  //     },
  //     "fullDescription": "string",
  //       "id": 0,
  //       "interest": 0,
  //       "projects": [
  //       {}
  //     ],
  //       "rewards": 0,
  //       "summary": "string"
  //   },
  //     "issueTrackerUri": "string",
  //     "logo": "string",
  //     "logoContentType": "string",
  //     "name": "string",
  //     "repo": {
  //     "id": 0,
  //       "uri": "string"
  //   },
  //     "status": "DRAFT",
  //     "technologies": [
  //     {
  //       "id": 0,
  //       "word": "string"
  //     }
  //   ]
  //   }
  // }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data.get("projectName"));
  }

  render() {
    const { account } = this.props;
    return (
      <div>
        <Container>
          <h4>Create a Project</h4>

          <hr/>

          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="projectName">Project Name</Label>
              <Input type="projectName" name="projectName" id="projectName" placeholder="your project name" />
            </FormGroup>

            <FormGroup>
              <Label for="sector">Business Sector</Label>
              <Input type="sector" name="sector" id="sector" placeholder="e.g. FXIP" />
            </FormGroup>

            <FormGroup>
              <Label for="projectDescription">Project Description</Label>
              <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>
            <FormGroup>
              <Label for="dateNeeded">Date Needed (Optional)</Label>
            </FormGroup>
            <FormGroup>
              <Label for="technologies">Technologies</Label>
              <Input type="text" name="text" id="exampleText" />
            </FormGroup>

            <FormGroup>
              <Label for="gitRepo">Git Repo</Label>
              <Input type="gitRepo" name="gitRepo" id="gitRepo" placeholder="your git repo url" />
            </FormGroup>

            <FormGroup>
              <Label for="gitRepo">Add User</Label>
              <Input type="gitRepo" name="gitRepo" id="gitRepo" placeholder="add users you want added to the project" />
            </FormGroup>

            <Button type="submit" >Submit</Button>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);

