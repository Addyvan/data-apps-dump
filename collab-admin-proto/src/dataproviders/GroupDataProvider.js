import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

import { Spinner } from "reactstrap";

const GROUP_QUERY = gql`
    query GetGroup($id: ID) {
        group(
            id: $id
        ) {
            id
            createdAt
            updatedAt
            name
            description
            admin {
            id
            }
            moderators {
            id
            }
            followers {
            id
            }
            discussions {
            id
            }
            spaces {
            id
            }
        }
    }
`;

class GroupDataProvider extends React.Component {
    render() {
        const { children } = this.props;

        return(
            <Query query={GROUP_QUERY} variables={{id: this.props.id}}>
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

GroupDataProvider.propTypes = {
    id: PropTypes.string.isRequired
}

export default GroupDataProvider;