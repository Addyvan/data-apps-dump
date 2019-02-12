import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

import { Spinner } from "reactstrap";

const USER_QUERY = gql`
    query GetUser($id: ID) {
        user( id: $id ) {
            id
            createdAt
            updatedAt
            name
            discussions {
                id
                title
            }
            spaces {
                id
                name
            }
            groups {
                id
                name
            }
            followers {
                id
                name
            }
            following {
                id
                name
            }
            likedDiscussions {
                id
                title
            }
            sharedDiscussions {
                id
                title
            }
            savedDiscussions {
                id
                title
            }
            savedGroups {
                id
                name
            }
            savedSpaces {
                id
                name
            }
            adminOfGroup {
                id
                name
            }
            adminOfSpace {
                id
                name
            }
        }
    }
`;

class UserDataProvider extends React.Component {
    render() {
        const { children } = this.props;

        return(
            <Query query={USER_QUERY} variables={{id: this.props.id}}>
                {
                    ({ loading, error, data }) => {
                        if (loading) return (<Spinner color="primary" />);
                        if (error) { console.log(error); return; }

                        if (data) {
                            const childrenWithProps = React.Children.map(children, child =>
                                React.cloneElement(child, { data: data })
                              );
                          
                            return <div>{childrenWithProps}</div>
                        }
                    }
                }
            </Query>
        );
    }
}

UserDataProvider.propTypes = {
    id: PropTypes.string.isRequired
}

export default UserDataProvider;