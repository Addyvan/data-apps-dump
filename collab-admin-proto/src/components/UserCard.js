import React from "react";
import {
    Card,
    CardTitle
} from "reactstrap";

class UserCard extends React.Component {
    render() {
        return(
            <Card>
                <CardTitle>{this.props.data.user.name}</CardTitle>
            </Card>
        );
    }
}

export default UserCard;