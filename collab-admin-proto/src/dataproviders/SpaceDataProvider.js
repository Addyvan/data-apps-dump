import React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

import { Spinner } from "reactstrap";

const SPACE_QUERY = gql`
    query GetSpace($id: ID) {
        space(
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
            tags {
            id
            }
            followers {
            id
            }
            groups {
            id
            }
        }
    }
`;

class SpaceDataProvider extends React.Component {
    render() {
        const { children } = this.props;

        return(
            <Query query={SPACE_QUERY} variables={{id: this.props.id}}>
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

SpaceDataProvider.propTypes = {
    id: PropTypes.string.isRequired
}

export default SpaceDataProvider;