import React from 'react';

class ProfilePage extends React.Component {
	showMessage = () => {
		// eslint-disable-next-line no-alert
		alert('Followed ' + this.props.user);
	};

	handleClick = () => {
		setTimeout(this.showMessage, 3000);
	};

	render() {
		return <button onClick={this.handleClick}>Follow</button>;
	}
}

export default ProfilePage;

/* import React from 'react';
import { Box, Row, Column } from 'tamia';
import About from './About';
import Subscription from './Subscription';

const Col = ({ children }) => (
	<Column as="aside" width={[null, null, 1 / 2]}>
		{children}
	</Column>
);

const PostFooter = () => (
	<Row>
		<Col>
			<Box mb="l">
				<About />
			</Box>
		</Col>
		<Col>
			<Box mb="l">
				<Subscription />
			</Box>
		</Col>
	</Row>
);

export default PostFooter;
*/
